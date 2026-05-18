<?php

namespace App\Controller;

use App\Entity\UTILISATEURS;
use App\Repository\UTILISATEURSRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class UtilisateursListController extends AbstractController
{
    public function __construct(
        private UTILISATEURSRepository $utilisateursRepository
    ) {
    }

    #[Route('/api/utilisateurs', name: 'api_utilisateurs_list', methods: ['GET'])]
    public function list(): JsonResponse
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

        $utilisateurs = $this->utilisateursRepository->findAll();

        $data = array_map(function (UTILISATEURS $utilisateur) {
            return [
                'id' => $utilisateur->getId(),
                'nom' => $utilisateur->getNom(),
                'prenom' => $utilisateur->getPrenom(),
                'pseudo' => $utilisateur->getPseudo(),
                'email' => $utilisateur->getEmail(),
                'telephone' => $utilisateur->getTelephone(),
                'photo_profil' => $utilisateur->getPhotoProfil(),
                'est_actif' => $utilisateur->isEstActif(),
                'email_verifie' => $utilisateur->isEmailVerifie(),
                'role' => [
                    'id' => $utilisateur->getRoleEntity()?->getId(),
                    'code' => $utilisateur->getRoleEntity()?->getCode(),
                    'libelle' => $utilisateur->getRoleEntity()?->getLibelle(),
                    'description' => $utilisateur->getRoleEntity()?->getDescription(),
                ],
                'created_at' => $utilisateur->getCreatedAt()?->format('Y-m-d H:i:s'),
                'updated_at' => $utilisateur->getUpdatedAt()?->format('Y-m-d H:i:s'),
            ];
        }, $utilisateurs);

        return $this->json([
            'message' => 'Liste des utilisateurs récupérée avec succès.',
            'data' => $data,
        ], 200);
    }
}