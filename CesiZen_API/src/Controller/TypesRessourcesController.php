<?php

namespace App\Controller;

use App\Entity\TYPESRESSOURCES;
use App\Repository\TYPESRESSOURCESRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;

class TypesRessourcesController extends AbstractController
{
    public function __construct(
        private TYPESRESSOURCESRepository $typesRessourcesRepository
    ) {
    }

    public function __invoke(): JsonResponse
    {
        $types = $this->typesRessourcesRepository->findAll();

        $data = array_map(function (TYPESRESSOURCES $type) {
            return [
                'id' => $type->getId(),
                'code' => $type->getCode(),
                'libelle' => $type->getLibelle(),
                'couleur' => $type->getCouleur(),
                'description' => $type->getDescription(),
                'created_at' => $type->getCreatedAt()?->format('Y-m-d H:i:s'),
                'updated_at' => $type->getUpdatedAt()?->format('Y-m-d H:i:s'),
            ];
        }, $types);

        return $this->json([
            'message' => 'Liste des types de ressources récupérée avec succès.',
            'data' => $data,
        ], 200);
    }
}