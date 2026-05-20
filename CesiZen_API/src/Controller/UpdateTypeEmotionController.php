<?php

namespace App\Controller;

use App\Entity\UTILISATEURS;
use App\Repository\TYPESEMOTIONRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class UpdateTypeEmotionController extends AbstractController
{
    public function __construct(
        private TYPESEMOTIONRepository $typesEmotionRepository,
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

        $typeEmotion = $this->typesEmotionRepository->find($id);

        if (!$typeEmotion) {
            return $this->json([
                'message' => 'Type d’émotion introuvable.',
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

        if (array_key_exists('nom', $data)) {
            if (trim($data['nom']) === '') {
                return $this->json([
                    'message' => 'Le nom du type d’émotion ne peut pas être vide.',
                    'data' => null,
                ], 400);
            }

            $typeEmotion->setNom($data['nom']);
        }

        if (array_key_exists('couleur', $data)) {
            $typeEmotion->setCouleur($data['couleur']);
        }

        if (array_key_exists('description', $data)) {
            $typeEmotion->setDescription($data['description']);
        }

        $typeEmotion->setUpdatedAt(new \DateTimeImmutable());

        $this->entityManager->flush();

        return $this->json([
            'message' => 'Type d’émotion modifié avec succès.',
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