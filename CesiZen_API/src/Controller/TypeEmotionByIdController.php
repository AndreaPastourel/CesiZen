<?php

namespace App\Controller;

use App\Repository\TYPESEMOTIONRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;

class TypeEmotionByIdController extends AbstractController
{
    public function __construct(
        private TYPESEMOTIONRepository $typesEmotionRepository
    ) {
    }

    public function __invoke(int $id): JsonResponse
    {
        $typeEmotion = $this->typesEmotionRepository->find($id);

        if (!$typeEmotion) {
            return $this->json([
                'message' => 'Type d’émotion introuvable.',
                'data' => null,
            ], 404);
        }

        return $this->json([
            'message' => 'Type d’émotion récupéré avec succès.',
            'data' => [
                'id' => $typeEmotion->getId(),
                'nom' => $typeEmotion->getNom(),
                'couleur' => $typeEmotion->getCouleur(),
                'description' => $typeEmotion->getDescription(),
                'created_at' => $typeEmotion->getCreatedAt()?->format('Y-m-d H:i:s'),
                'updated_at' => $typeEmotion->getUpdatedAt()?->format('Y-m-d H:i:s'),
            ],
        ], 200);
    }
}