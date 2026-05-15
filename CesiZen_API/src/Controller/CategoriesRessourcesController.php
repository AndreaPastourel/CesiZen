<?php

namespace App\Controller;

use App\Entity\CATEGORIESRESSOURCES;
use App\Repository\CATEGORIESRESSOURCESRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class CategoriesRessourcesController
{
    public function __construct(
        private CATEGORIESRESSOURCESRepository $categoriesRepository
    ) {
    }

    #[Route('/api/categories-ressources', name: 'api_categories_ressources_list_custom', methods: ['GET'])]
    public function list(): JsonResponse
    {
        $categories = $this->categoriesRepository->findAll();

        $data = array_map(
            fn (CATEGORIESRESSOURCES $categorie) => $this->formatCategorie($categorie),
            $categories
        );

        return new JsonResponse([
            'message' => 'Liste des catégories récupérée avec succès.',
            'data' => $data,
        ], 200);
    }

    private function formatCategorie(CATEGORIESRESSOURCES $categorie): array
    {
        return [
            'id' => $categorie->getId(),
            'nom' => $categorie->getNom(),
            'couleur' => $categorie->getCouleur(),
            'description' => $categorie->getDescription(),
            'created_at' => $categorie->getCreatedAt()?->format('Y-m-d H:i:s'),
            'updated_at' => $categorie->getUpdatedAt()?->format('Y-m-d H:i:s'),
        ];
    }
}