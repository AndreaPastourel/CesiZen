<?php

namespace App\Controller;

use App\Entity\UTILISATEURS;
use App\Repository\ROLESRepository;
use App\Repository\UTILISATEURSRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

final class AuthController extends AbstractController
{
   #[Route('/api/register', name: 'api_register', methods: ['POST'])]
    public function register(
        Request $request,
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $passwordHasher,
        UTILISATEURSRepository $uTILISATEURSRepository,
        ROLESRepository $rOLESRepository
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);
        
        // Validation des données
        $validationError = $this->validateRegistrationData($data, $uTILISATEURSRepository);
        if ($validationError) {
            return $validationError;
        }

        // Récupération du rôle utilisateur
        $role_user = $rOLESRepository->findOneBy(['code' => 'ROLE_USER']);
        if (!$role_user) {
            return $this->json(['message' => 'Le role Utilisateur est introuvable'], 500);
        }

        // Création et enregistrement de l'utilisateur
        $utilisateur = $this->createUtilisateur($data, $role_user, $passwordHasher);
        $entityManager->persist($utilisateur);
        $entityManager->flush();

        return $this->json(['message' => 'Utilisateur créé avec succès.'], 201);
    }

    private function validateRegistrationData(array $data, UTILISATEURSRepository $repository): ?JsonResponse
    {
        // Vérification des champs obligatoires
        if ( empty($data['email']) || empty($data['motDePasse']) || empty($data['pseudo'])) {
            return $this->json(['message' => 'Champs obligatoires manquant'], 400);
        }

        // Vérification des doublons
        if ($repository->findOneBy(['email' => $data['email']]) !== null) {
            return $this->json(['message' => 'Cet email est déjà utilisé'], 409);
        }

        if ($repository->findOneBy(['pseudo' => $data['pseudo']]) !== null) {
            return $this->json(['message' => 'Ce pseudo est déjà utilisé'], 409);
        }

        return null;
    }

    private function createUtilisateur(array $data, $role_user, UserPasswordHasherInterface $passwordHasher): UTILISATEURS
    {
        $utilisateur = new UTILISATEURS();
        if (!empty($data['nom'])) {
        $utilisateur->setNom($data['nom']);
    }

    if (!empty($data['prenom'])) {
        $utilisateur->setPrenom($data['prenom']);
    }

    if (!empty($data['telephone'])) {
        $utilisateur->setTelephone($data['telephone']);
    }

    if (!empty($data['photoProfil'])) {
        $utilisateur->setPhotoProfil($data['photoProfil']);
    }
           
        $utilisateur->setPseudo($data['pseudo']);
        $utilisateur->setEmail($data['email'] ?? null);
        $utilisateur->setRoleEntity($role_user);
        $hashedPassword = $passwordHasher->hashPassword($utilisateur, $data['motDePasse']);
        $utilisateur->setMotDePasse($hashedPassword);

        return $utilisateur;
    }

    public function index(): Response
    {
        return $this->render('auth/index.html.twig', [
            'controller_name' => 'AuthController',
        ]);
    }


#[Route('/api/me', name: 'api_me', methods: ['GET'])]
public function me(): JsonResponse
{
    $user = $this->getUser();

    if (!$user instanceof UTILISATEURS) {
        return $this->json([
            'message' => 'Utilisateur non connecté',
            'data' => null,
        ], 401);
    }

    return $this->json([
        'message' => 'Utilisateur récupéré avec succès.',
        'data' => [
            'id' => $user->getId(),
            'nom' => $user->getNom(),
            'prenom' => $user->getPrenom(),
            'pseudo' => $user->getPseudo(),
            'email' => $user->getEmail(),
            'telephone' => $user->getTelephone(),
            'photo_profil' => $user->getPhotoProfil(),
            'est_actif' => $user->isEstActif(),
            'email_verifie' => $user->isEmailVerifie(),
            'role' => $user->getRoleEntity()?->getCode(),
        ],
    ], 200);
}



#[Route('/api/me', name: 'api_me_update', methods: ['PATCH'])]
public function updateMe(
    Request $request,
    EntityManagerInterface $entityManager
): JsonResponse {
    $user = $this->getUser();

    if (!$user instanceof UTILISATEURS) {
        return $this->json([
            'message' => 'Utilisateur non connecté',
            'data' => null,
        ], 401);
    }

    $data = json_decode($request->getContent(), true);

    if (!$data) {
        return $this->json([
            'message' => 'Aucune donnée envoyée.',
            'data' => null,
        ], 400);
    }

    if (array_key_exists('nom', $data)) {
        $user->setNom($data['nom']);
    }

    if (array_key_exists('prenom', $data)) {
        $user->setPrenom($data['prenom']);
    }

    if (array_key_exists('pseudo', $data)) {
        $user->setPseudo($data['pseudo']);
    }

    if (array_key_exists('telephone', $data)) {
        $user->setTelephone($data['telephone']);
    }

    if (array_key_exists('photo_profil', $data)) {
        $user->setPhotoProfil($data['photo_profil']);
    }

    $user->setUpdatedAt(new \DateTimeImmutable());

    $entityManager->flush();

    return $this->json([
        'message' => 'Profil mis à jour avec succès.',
        'data' => [
            'id' => $user->getId(),
            'nom' => $user->getNom(),
            'prenom' => $user->getPrenom(),
            'pseudo' => $user->getPseudo(),
            'email' => $user->getEmail(),
            'telephone' => $user->getTelephone(),
            'photo_profil' => $user->getPhotoProfil(),
            'est_actif' => $user->isEstActif(),
            'email_verifie' => $user->isEmailVerifie(),
            'role' => $user->getRoleEntity()?->getCode(),
        ],
    ], 200);
}


#[Route('/api/me/password', name: 'api_me_update_password', methods: ['PATCH'])]
public function updatePassword(
    Request $request,
    UserPasswordHasherInterface $passwordHasher,
    EntityManagerInterface $entityManager
): JsonResponse {
    $user = $this->getUser();
    $status = 200;
    $message = 'Mot de passe modifié avec succès.';
    $dataResponse = null;

    if (!$user instanceof UTILISATEURS) {
        $status = 401;
        $message = 'Utilisateur non connecté.';
    } else {
        $data = json_decode($request->getContent(), true);

        $currentPassword = $data['ancien_motDePasse'] ?? null;
        $newPassword = $data['nouveau_motDePasse'] ?? null;
       

        if (!$currentPassword || !$newPassword ) {
            $status = 400;
            $message = 'Tous les champs sont obligatoires.';
        } elseif (!$passwordHasher->isPasswordValid($user, $currentPassword)) {
            $status = 400;
            $message = 'Le mot de passe actuel est incorrect.';
       
        } elseif (strlen($newPassword) < 8) {
            $status = 400;
            $message = 'Le nouveau mot de passe doit contenir au moins 8 caractères.';
        } elseif ($passwordHasher->isPasswordValid($user, $newPassword)) {
            $status = 400;
            $message = 'Le nouveau mot de passe doit être différent de l’ancien.';
        } else {
            $hashedPassword = $passwordHasher->hashPassword($user, $newPassword);
            $user->setMotDePasse($hashedPassword);
            $user->setUpdatedAt(new \DateTimeImmutable());
            $entityManager->flush();
        }
    }

    return $this->json([
        'message' => $message,
        'data' => $dataResponse,
    ], $status);
}

#[Route('/api/logout', name: 'api_logout', methods: ['POST'])]
public function logout(): JsonResponse
{
    $response = $this->json([
        'message' => 'Déconnexion réussie.',
        'data' => null,
    ]);

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

}

