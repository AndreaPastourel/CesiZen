<?php

namespace App\Controller;

use App\Entity\TYPESRESSOURCES;
use App\Repository\TYPESRESSOURCESRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class TypesRessourcesController
{
    public function __construct(
        private TYPESRESSOURCESRepository $typesRepository
    ) {
    }

    #[Route('/api/types-ressources', name: 'api_types_ressources_list_custom', methods: ['GET'])]
    public function list(): JsonResponse
    {
        $types = $this->typesRepository->findAll();

        $data = array_map(
            fn (TYPESRESSOURCES $type) => $this->formatType($type),
            $types
        );

        return new JsonResponse([
            'message' => 'Liste des types de ressources récupérée avec succès.',
            'data' => $data,
        ], 200);
    }

    private function formatType(TYPESRESSOURCES $type): array
    {
        return [
            'id' => $type->getId(),
            'code' => $type->getCode(),
            'libelle' => $type->getLibelle(),
            'couleur' => $type->getCouleur(),
            'description' => $type->getDescription(),
            'created_at' => $type->getCreatedAt()?->format('Y-m-d H:i:s'),
            'updated_at' => $type->getUpdatedAt()?->format('Y-m-d H:i:s'),
        ];
    }
}