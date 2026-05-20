<?php

namespace App\Controller;

use App\Entity\ENTREEJOURNAL;
use App\Entity\UTILISATEURS;
use App\Repository\ENTREEJOURNALRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class EntreeJournalByIdController extends AbstractController
{
    public function __construct(
        private ENTREEJOURNALRepository $entreeJournalRepository
    ) {
    }

    #[Route('/api/entree-journal/{id}', name: 'api_entree_journal_by_id', methods: ['GET'])]
    public function show(int $id): JsonResponse
    {
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

        return $this->json([
            'message' => 'Entrée de journal récupérée avec succès.',
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
