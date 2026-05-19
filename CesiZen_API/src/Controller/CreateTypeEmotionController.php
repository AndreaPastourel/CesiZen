<?php

namespace App\Controller;

use App\Entity\TYPESEMOTION;
use App\Entity\UTILISATEURS;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class CreateTypeEmotionController extends AbstractController
{
    public function __invoke(
        Request $request,
        EntityManagerInterface $entityManager
    ): JsonResponse {
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

        $data = json_decode($request->getContent(), true);

        if (!is_array($data)) {
            return $this->json([
                'message' => 'Données invalides.',
                'data' => null,
            ], 400);
        }

        $nom = $data['nom'] ?? null;
        $couleur = $data['couleur'] ?? null;
        $description = $data['description'] ?? null;

        if (!$nom) {
            return $this->json([
                'message' => 'Le nom du type d’émotion est obligatoire.',
                'data' => null,
            ], 400);
        }

        $typeEmotion = new TYPESEMOTION();
        $typeEmotion->setNom($nom);
        $typeEmotion->setCouleur($couleur);
        $typeEmotion->setDescription($description);
        $typeEmotion->setCreatedAt(new \DateTimeImmutable());
        $typeEmotion->setUpdatedAt(new \DateTimeImmutable());

        $entityManager->persist($typeEmotion);
        $entityManager->flush();

        return $this->json([
            'message' => 'Type d’émotion créé avec succès.',
            'data' => [
                'id' => $typeEmotion->getId(),
                'nom' => $typeEmotion->getNom(),
                'couleur' => $typeEmotion->getCouleur(),
                'description' => $typeEmotion->getDescription(),
                'created_at' => $typeEmotion->getCreatedAt()?->format('Y-m-d H:i:s'),
                'updated_at' => $typeEmotion->getUpdatedAt()?->format('Y-m-d H:i:s'),
            ],
        ], 201);
    }
}

