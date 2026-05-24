<?php

namespace App\Controller;

use App\Repository\TYPESRESSOURCESRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;

class TypeRessourceByIdController extends AbstractController
{
    public function __construct(
        private TYPESRESSOURCESRepository $typesRessourcesRepository
    ) {
    }

    public function __invoke(int $id): JsonResponse
    {
        $type = $this->typesRessourcesRepository->find($id);

        if (!$type) {
            return $this->json([
                'message' => 'Type de ressource introuvable.',
                'data' => null,
            ], 404);
        }

        return $this->json([
            'message' => 'Type de ressource récupéré avec succès.',
            'data' => [
                'id' => $type->getId(),
                'code' => $type->getCode(),
                'libelle' => $type->getLibelle(),
                'couleur' => $type->getCouleur(),
                'description' => $type->getDescription(),
                'created_at' => $type->getCreatedAt()?->format('Y-m-d H:i:s'),
                'updated_at' => $type->getUpdatedAt()?->format('Y-m-d H:i:s'),
            ],
        ], 200);
    }
}

