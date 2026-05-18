<?php

namespace App\Controller;

use App\Entity\EMOTIONS;
use App\Repository\EMOTIONSRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class EmotionsController extends AbstractController
{
    public function __construct(
        private EMOTIONSRepository $emotionsRepository
    ) {
    }

    #[Route('/api/emotions', name: 'api_emotions_list', methods: ['GET'])]
    public function list(): JsonResponse
    {
        $emotions = $this->emotionsRepository->findAll();

        $data = array_map(function (EMOTIONS $emotion) {
            $typeEmotion = $emotion->getTypeEmotion();

            return [
                'id' => $emotion->getId(),
                'nom' => $emotion->getNom(),
                'icone' => $emotion->getIcone(),
                'couleur' => $emotion->getCouleur(),
                'description' => $emotion->getDescription(),
                'intensite_min' => $emotion->getIntensiteMin(),
                'intensite_max' => $emotion->getIntensiteMax(),
                'created_at' => $emotion->getCreatedAt()?->format('Y-m-d H:i:s'),
                'updated_at' => $emotion->getUpdatedAt()?->format('Y-m-d H:i:s'),

                'type_emotion' => $typeEmotion ? [
                    'id' => $typeEmotion->getId(),
                    'nom' => $typeEmotion->getNom(),
                    'couleur' => $typeEmotion->getCouleur(),
                    'description' => $typeEmotion->getDescription(),
                ] : null,
            ];
        }, $emotions);

        return $this->json([
            'message' => 'Liste des émotions récupérée avec succès.',
            'data' => $data,
        ], 200);
    }
}