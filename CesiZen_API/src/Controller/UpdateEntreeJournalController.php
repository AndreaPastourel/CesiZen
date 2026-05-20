<?php

namespace App\Controller;

use App\Entity\ENTREEJOURNAL;
use App\Entity\UTILISATEURS;
use App\Repository\EMOTIONSRepository;
use App\Repository\ENTREEJOURNALRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

class UpdateEntreeJournalController extends AbstractController
{
    public function __construct(
        private ENTREEJOURNALRepository $entreeJournalRepository,
        private EntityManagerInterface $entityManager
    ) {
    }

    #[Route('/api/entree-journal/{id}', name: 'api_entree_journal_update', methods: ['PATCH'])]
    public function update(
        int $id,
        Request $request,
        EMOTIONSRepository $emotionsRepository
    ): JsonResponse {
        $user = $this->getUser();

        if (!$user instanceof UTILISATEURS) {
            return $this->json([
                'message' => 'Utilisateur non connecté.',
                'data' => null,
            ], 401);
        }

        $entree = $this->entreeJournalRepository->find($id);

        if (!$entree) {
            return $this->json([
                'message' => 'Entrée de journal introuvable.',
                'data' => null,
            ], 404);
        }

        if ($entree->getUtilisateur()?->getId() !== $user->getId()) {
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

        if (array_key_exists('titre', $data)) {
            $entree->setTitre($data['titre']);
        }

        if (array_key_exists('intensite', $data)) {
            if ($data['intensite'] === null || $data['intensite'] === '') {
                return $this->json([
                    'message' => 'L’intensité est obligatoire.',
                    'data' => null,
                ], 400);
            }

            if (!is_numeric($data['intensite'])) {
                return $this->json([
                    'message' => 'L’intensité doit être un nombre.',
                    'data' => null,
                ], 400);
            }

            $entree->setIntensite((int) $data['intensite']);
        }

        if (array_key_exists('date_ressentie', $data)) {
            try {
                $dateRessentie = $data['date_ressentie']
                    ? new \DateTimeImmutable($data['date_ressentie'])
                    : new \DateTimeImmutable();

                $entree->setDateRessentie($dateRessentie);
            } catch (\Exception) {
                return $this->json([
                    'message' => 'La date ressentie est invalide.',
                    'data' => null,
                ], 400);
            }
        }

        if (array_key_exists('emotion_id', $data) || array_key_exists('emotion', $data)) {
            $emotionId = $data['emotion_id'] ?? $data['emotion'] ?? null;

            if (!$emotionId) {
                return $this->json([
                    'message' => 'L’émotion est obligatoire.',
                    'data' => null,
                ], 400);
            }

            $emotion = $emotionsRepository->find((int) $emotionId);

            if (!$emotion) {
                return $this->json([
                    'message' => 'Émotion introuvable.',
                    'data' => null,
                ], 404);
            }

            $entree->setEmotion($emotion);
        }

        $entree->setUpdatedAt(new \DateTimeImmutable());

        $this->entityManager->flush();

        return $this->json([
            'message' => 'Entrée de journal modifiée avec succès.',
            'data' => $this->formatEntreeJournal($entree),
        ], 200);
    }

    private function formatEntreeJournal(ENTREEJOURNAL $entree): array
    {
        $emotion = $entree->getEmotion();
        $typeEmotion = $emotion?->getTypeEmotion();

        return [
            'id' => $entree->getId(),
            'titre' => $entree->getTitre(),
            'intensite' => $entree->getIntensite(),
            'date_ressentie' => $entree->getDateRessentie()?->format('Y-m-d H:i:s'),
            'created_at' => $entree->getCreatedAt()?->format('Y-m-d H:i:s'),
            'updated_at' => $entree->getUpdatedAt()?->format('Y-m-d H:i:s'),

            'emotion' => $emotion ? [
                'id' => $emotion->getId(),
                'nom' => $emotion->getNom(),
                'icone' => $emotion->getIcone(),
                'couleur' => $emotion->getCouleur(),
                'description' => $emotion->getDescription(),
                'intensite_min' => $emotion->getIntensiteMin(),
                'intensite_max' => $emotion->getIntensiteMax(),

                'type_emotion' => $typeEmotion ? [
                    'id' => $typeEmotion->getId(),
                    'nom' => $typeEmotion->getNom(),
                    'couleur' => $typeEmotion->getCouleur(),
                    'description' => $typeEmotion->getDescription(),
                ] : null,
            ] : null,
        ];
    }
}