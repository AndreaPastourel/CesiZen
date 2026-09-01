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
}