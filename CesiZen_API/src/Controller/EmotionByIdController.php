<?php

namespace App\Controller;

use App\Entity\EMOTIONS;
use App\Repository\EMOTIONSRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;

class EmotionByIdController extends AbstractController
{
    public function __construct(
        private EMOTIONSRepository $emotionsRepository
    ) {
    }

    public function __invoke(int $id): JsonResponse
    {
        $emotion = $this->emotionsRepository->find($id);

        if (!$emotion) {
            return $this->json([
                'message' => 'Émotion introuvable.',
                'data' => null,
            ], 404);
        }

        $typeEmotion = $emotion->getTypeEmotion();

        return $this->json([
            'message' => 'Émotion récupérée avec succès.',
            'data' => [
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
            ],
        ], 200);
    }
}