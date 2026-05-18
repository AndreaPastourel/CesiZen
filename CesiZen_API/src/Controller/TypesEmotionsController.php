<?php

namespace App\Controller;

use App\Entity\TYPESEMOTION;
use App\Repository\TYPESEMOTIONRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;

class TypesEmotionsController extends AbstractController
{
    public function __construct(
        private TYPESEMOTIONRepository $typesEmotionRepository
    ) {
    }

    public function __invoke(): JsonResponse
    {
        $typesEmotions = $this->typesEmotionRepository->findAll();

        $data = array_map(function (TYPESEMOTION $typeEmotion) {
            return [
                'id' => $typeEmotion->getId(),
                'nom' => $typeEmotion->getNom(),
                'couleur' => $typeEmotion->getCouleur(),
                'description' => $typeEmotion->getDescription(),
                'created_at' => $typeEmotion->getCreatedAt()?->format('Y-m-d H:i:s'),
                'updated_at' => $typeEmotion->getUpdatedAt()?->format('Y-m-d H:i:s'),
            ];
        }, $typesEmotions);

        return $this->json([
            'message' => 'Liste des types d’émotions récupérée avec succès.',
            'data' => $data,
        ], 200);
    }
}