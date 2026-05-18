<?php

namespace App\Controller;

use App\Entity\UTILISATEURS;
use App\Repository\ROLESRepository;
use App\Repository\UTILISATEURSRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

class UpdateUtilisateurRoleController extends AbstractController
{
    public function __construct(
        private UTILISATEURSRepository $utilisateursRepository,
        private ROLESRepository $rolesRepository,
        private EntityManagerInterface $entityManager
    ) {
    }

    #[Route('/api/utilisateur/{id}/role', name: 'api_utilisateur_update_role', methods: ['PATCH'])]
    public function updateRole(int $id, Request $request): JsonResponse
    {
        $admin = $this->getUser();

        if (!$admin instanceof UTILISATEURS) {
            return $this->json([
                'message' => 'Utilisateur non connecté.',
                'data' => null,
            ], 401);
        }

        if (!in_array('ROLE_ADMIN', $admin->getRoles(), true)) {
            return $this->json([
                'message' => 'Accès refusé.',
                'data' => null,
            ], 403);
        }

        $utilisateur = $this->utilisateursRepository->find($id);

        if (!$utilisateur) {
            return $this->json([
                'message' => 'Utilisateur introuvable.',
                'data' => null,
            ], 404);
        }

        $data = json_decode($request->getContent(), true);
        $roleCode = $data['role'] ?? null;

        if (!$roleCode) {
            return $this->json([
                'message' => 'Le champ role est obligatoire.',
                'data' => null,
            ], 400);
        }

        if (!in_array($roleCode, ['ROLE_USER', 'ROLE_ADMIN'], true)) {
            return $this->json([
                'message' => 'Le rôle demandé est invalide.',
                'data' => null,
            ], 400);
        }

        $role = $this->rolesRepository->findOneBy([
            'code' => $roleCode,
        ]);

        if (!$role) {
            return $this->json([
                'message' => 'Rôle introuvable.',
                'data' => null,
            ], 404);
        }

        $utilisateur->setRoleEntity($role);
        $utilisateur->setUpdatedAt(new \DateTimeImmutable());

        $this->entityManager->flush();

        return $this->json([
            'message' => 'Rôle utilisateur modifié avec succès.',
            'data' => [
                'id' => $utilisateur->getId(),
                'pseudo' => $utilisateur->getPseudo(),
                'email' => $utilisateur->getEmail(),
                'est_actif' => $utilisateur->isEstActif(),
                'role' => [
                    'id' => $role->getId(),
                    'code' => $role->getCode(),
                    'libelle' => $role->getLibelle(),
                    'description' => $role->getDescription(),
                ],
            ],
        ], 200);
    }
}