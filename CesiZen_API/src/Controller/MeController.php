<?php

namespace App\Controller;

use App\Entity\UTILISATEURS;
use App\Service\PersonalDataExportService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\HeaderUtils;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\Serializer\SerializerInterface;
use App\Repository\ENTREEJOURNALRepository;
use App\Repository\REINITIALISATIONSMDPRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\RefreshToken;
use Gesdinet\JWTRefreshTokenBundle\Model\RefreshTokenManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[Route('/api/me', name: 'api_me_')]
#[IsGranted('ROLE_USER')]
final class MeController extends AbstractController
{
    public function __construct(
        private readonly PersonalDataExportService $personalDataExportService,
        private readonly SerializerInterface $serializer
    ) {
    }

    #[Route('/export', name: 'export', methods: ['GET'])]
    public function export(): Response
    {
        $user = $this->getUser();

        
        if (!$user instanceof UTILISATEURS) {
            return $this->json([
                'message' => 'Utilisateur non authentifié.',
                'data' => null,
            ], Response::HTTP_UNAUTHORIZED);
        }

        $exportData = $this->personalDataExportService->buildExport($user);

       
        $json = $this->serializer->serialize($exportData, 'json', [
            'json_encode_options' => JSON_PRETTY_PRINT
                | JSON_UNESCAPED_UNICODE
                | JSON_UNESCAPED_SLASHES,
        ]);

        $filename = sprintf(
            'cesizen-donnees-personnelles-%s.json',
            (new \DateTimeImmutable())->format('Y-m-d')
        );

        return new Response($json, Response::HTTP_OK, [
            'Content-Type' => 'application/json; charset=UTF-8',

            'Content-Disposition' => HeaderUtils::makeDisposition(
                HeaderUtils::DISPOSITION_ATTACHMENT,
                $filename
            ),

            'Cache-Control' => 'private, no-store, max-age=0',
            'Pragma' => 'no-cache',
            'X-Content-Type-Options' => 'nosniff',
        ]);
    }

    #[Route('', name: 'delete', methods: ['DELETE'])]

public function deleteAccount(
    Request $request,
    UserPasswordHasherInterface $passwordHasher,
    EntityManagerInterface $entityManager,
    ENTREEJOURNALRepository $entreeJournalRepository,
    REINITIALISATIONSMDPRepository $reinitialisationRepository,
    RefreshTokenManagerInterface $refreshTokenManager,
    LoggerInterface $logger
): JsonResponse {
    $user = $this->getUser();

    if (!$user instanceof UTILISATEURS) {
        return $this->json([
            'message' => 'Utilisateur non authentifié.',
            'data' => null,
        ], Response::HTTP_UNAUTHORIZED);
    }

    $data = json_decode($request->getContent(), true) ?? [];
    $password = $data['motDePasse'] ?? null;

   
    if (!is_string($password) || $password === '') {
        return $this->json([
            'message' => 'Le mot de passe actuel est obligatoire.',
            'data' => null,
        ], Response::HTTP_BAD_REQUEST);
    }

    if (!$passwordHasher->isPasswordValid($user, $password)) {
        return $this->json([
            'message' => 'Le mot de passe actuel est incorrect.',
            'data' => null,
        ], Response::HTTP_FORBIDDEN);
    }

    $userId = $user->getId();
    $photoProfil = $user->getPhotoProfil();
    $connection = $entityManager->getConnection();

    $connection->beginTransaction();

    try {
      

        $refreshTokens = $entityManager
            ->getRepository(RefreshToken::class)
            ->findBy([
                'username' => $user->getUserIdentifier(),
            ]);

        foreach ($refreshTokens as $refreshToken) {
            $refreshTokenManager->delete($refreshToken, false);
            }

        $entrees = $entreeJournalRepository->findBy([
            'utilisateur' => $user,
        ]);

        foreach ($entrees as $entree) {
            $entityManager->remove($entree);
        }

        $reinitialisations = $reinitialisationRepository->findBy([
            'utilisateur' => $user,
        ]);

        foreach ($reinitialisations as $reinitialisation) {
            $entityManager->remove($reinitialisation);
        }

        $anonymousIdentifier = sprintf(
            '%d-%s',
            $userId,
            bin2hex(random_bytes(8))
        );

        $user->setNom(null);
        $user->setPrenom(null);
        $user->setTelephone(null);
        $user->setPhotoProfil(null);
        $user->setPseudo('utilisateur-supprime-' . $anonymousIdentifier);
        $user->setEmail(
            'deleted-' . $anonymousIdentifier . '@anonymized.invalid'
        );
        $user->setEstActif(false);
        $user->setEmailVerifie(false);
        $user->setDateDerniereConnexion(null);
        $user->setDateAlerteInactivite(null);
        $user->setUpdatedAt(new \DateTimeImmutable());


        $randomPassword = bin2hex(random_bytes(32));

        $user->setMotDePasse(
            $passwordHasher->hashPassword($user, $randomPassword)
        );

        $entityManager->flush();
        $connection->commit();
    } catch (\Throwable $exception) {
        if ($connection->isTransactionActive()) {
            $connection->rollBack();
        }

        $logger->error('Échec de la suppression d’un compte utilisateur.', [
            'user_id' => $userId,
            'exception' => $exception,
        ]);

        return $this->json([
            'message' => 'La suppression du compte a échoué.',
            'data' => null,
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    $this->deleteProfilePhoto($photoProfil, $logger);

    $response = $this->json([
        'message' => 'Le compte et les données personnelles ont été supprimés.',
        'data' => null,
    ], Response::HTTP_OK);

   
    $response->headers->clearCookie(
        'AUTH_TOKEN',
        '/',
        null,
        false,
        true,
        'lax'
    );

    return $response;
}

private function deleteProfilePhoto(
        ?string $photoProfil,
        LoggerInterface $logger
    ): void {
        
        if (
            $photoProfil === null
            || !str_starts_with($photoProfil, '/uploads/profils/')
        ) {
            return;
        }

        $filename = basename($photoProfil);

        $absolutePath = sprintf(
            '%s/public/uploads/profils/%s',
            $this->getParameter('kernel.project_dir'),
            $filename
        );

        if (is_file($absolutePath) && !unlink($absolutePath)) {
            $logger->warning(
                'Impossible de supprimer la photo de profil pendant l’anonymisation.',
                ['path' => $absolutePath]
            );
        }
    }

}