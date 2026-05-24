<?php

namespace App\Controller;

use App\Entity\TYPESRESSOURCES;
use App\Entity\UTILISATEURS;
use App\Repository\TYPESRESSOURCESRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class CreateTypeRessourceController extends AbstractController
{
    public function __invoke(
        Request $request,
        EntityManagerInterface $entityManager,
        TYPESRESSOURCESRepository $typesRessourcesRepository
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

        $code = $data['code'] ?? null;
        $libelle = $data['libelle'] ?? null;
        $couleur = $data['couleur'] ?? null;
        $description = $data['description'] ?? null;

        if (!$code || !$libelle) {
            return $this->json([
                'message' => 'Les champs code et libellé sont obligatoires.',
                'data' => null,
            ], 400);
        }

        if ($typesRessourcesRepository->findOneBy(['code' => $code])) {
            return $this->json([
                'message' => 'Ce code est déjà utilisé.',
                'data' => null,
            ], 409);
        }

        $type = new TYPESRESSOURCES();

        $type->setCode($code);
        $type->setLibelle($libelle);
        $type->setCouleur($couleur);
        $type->setDescription($description);
        $type->setCreatedAt(new \DateTimeImmutable());
        $type->setUpdatedAt(new \DateTimeImmutable());

        $entityManager->persist($type);
        $entityManager->flush();

        return $this->json([
            'message' => 'Type de ressource créé avec succès.',
            'data' => [
                'id' => $type->getId(),
                'code' => $type->getCode(),
                'libelle' => $type->getLibelle(),
                'couleur' => $type->getCouleur(),
                'description' => $type->getDescription(),
                'created_at' => $type->getCreatedAt()?->format('Y-m-d H:i:s'),
                'updated_at' => $type->getUpdatedAt()?->format('Y-m-d H:i:s'),
            ],
        ], 201);
    }
}
