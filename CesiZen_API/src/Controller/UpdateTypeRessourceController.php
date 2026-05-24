<?php

namespace App\Controller;

use App\Entity\UTILISATEURS;
use App\Repository\TYPESRESSOURCESRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class UpdateTypeRessourceController extends AbstractController
{
    public function __construct(
        private TYPESRESSOURCESRepository $typesRessourcesRepository,
        private EntityManagerInterface $entityManager
    ) {
    }

    public function __invoke(int $id, Request $request): JsonResponse
    {
        $user = $this->getUser();

        if (!$user instanceof UTILISATEURS) {
            return $this->json([
                'message' => 'Utilisateur non connecté.',
                'data' => null,
            ], 401);
        }

        if (!in_array('ROLE_ADMIN', $user->getRoles(), true)) {
            return $this->json([
                'message' => 'Accès refusé.',
                'data' => null,
            ], 403);
        }

        $type = $this->typesRessourcesRepository->find($id);

        if (!$type) {
            return $this->json([
                'message' => 'Type de ressource introuvable.',
                'data' => null,
            ], 404);
        }

        $data = json_decode($request->getContent(), true);

        if (!is_array($data)) {
            return $this->json([
                'message' => 'Données invalides.',
                'data' => null,
            ], 400);
        }

        if (array_key_exists('code', $data)) {
            if (trim($data['code']) === '') {
                return $this->json([
                    'message' => 'Le code ne peut pas être vide.',
                    'data' => null,
                ], 400);
            }

            $existingType = $this->typesRessourcesRepository->findOneBy([
                'code' => $data['code'],
            ]);

            if ($existingType && $existingType->getId() !== $type->getId()) {
                return $this->json([
                    'message' => 'Ce code est déjà utilisé.',
                    'data' => null,
                ], 409);
            }

            $type->setCode($data['code']);
        }

        if (array_key_exists('libelle', $data)) {
            if (trim($data['libelle']) === '') {
                return $this->json([
                    'message' => 'Le libellé ne peut pas être vide.',
                    'data' => null,
                ], 400);
            }

            $type->setLibelle($data['libelle']);
        }

        if (array_key_exists('couleur', $data)) {
            $type->setCouleur($data['couleur']);
        }

        if (array_key_exists('description', $data)) {
            $type->setDescription($data['description']);
        }

        $type->setUpdatedAt(new \DateTimeImmutable());

        $this->entityManager->flush();

        return $this->json([
            'message' => 'Type de ressource modifié avec succès.',
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
