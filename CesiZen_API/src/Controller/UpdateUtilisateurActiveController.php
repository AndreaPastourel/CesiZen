<?php

namespace App\Controller;

use App\Entity\UTILISATEURS;
use App\Repository\UTILISATEURSRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

class UpdateUtilisateurActiveController extends AbstractController
{
    public function __construct(
        private UTILISATEURSRepository $utilisateursRepository,
        private EntityManagerInterface $entityManager
    ) {
    }

    #[Route('/api/utilisateur/{id}/active', name: 'api_utilisateur_update_active', methods: ['PATCH'])]
    public function updateActive(int $id, Request $request): JsonResponse
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

        if (!is_array($data) || !array_key_exists('est_actif', $data)) {
            return $this->json([
                'message' => 'Le champ est_actif est obligatoire.',
                'data' => null,
            ], 400);
        }

        $estActif = filter_var($data['est_actif'], FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);

        if ($estActif === null) {
            return $this->json([
                'message' => 'Le champ est_actif doit être un booléen.',
                'data' => null,
            ], 400);
        }

        $utilisateur->setEstActif($estActif);
        $utilisateur->setUpdatedAt(new \DateTimeImmutable());

        $this->entityManager->flush();

        return $this->json([
            'message' => $estActif
                ? 'Utilisateur activé avec succès.'
                : 'Utilisateur désactivé avec succès.',
            'data' => [
                'id' => $utilisateur->getId(),
                'pseudo' => $utilisateur->getPseudo(),
                'email' => $utilisateur->getEmail(),
                'est_actif' => $utilisateur->isEstActif(),
                'role' => [
                    'id' => $utilisateur->getRoleEntity()?->getId(),
                    'code' => $utilisateur->getRoleEntity()?->getCode(),
                    'libelle' => $utilisateur->getRoleEntity()?->getLibelle(),
                ],
            ],
        ], 200);
    }
}