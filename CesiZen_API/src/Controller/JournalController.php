<?php

namespace App\Controller;

use App\Entity\ENTREEJOURNAL;
use App\Entity\UTILISATEURS;
use App\Repository\ENTREEJOURNALRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class JournalController extends AbstractController
{
    public function __construct(
        private ENTREEJOURNALRepository $entreeJournalRepository
    ) {
    }

    #[Route('/api/journal', name: 'api_journal_list', methods: ['GET'])]
    public function list(): JsonResponse
    {
        $user = $this->getUser();

        if (!$user instanceof UTILISATEURS) {
            return $this->json([
                'message' => 'Utilisateur non connecté.',
                'data' => null,
            ], 401);
        }

        $entrees = $this->entreeJournalRepository->findBy(
            ['utilisateur' => $user],
            ['date_ressentie' => 'DESC']
        );

        $data = array_map(function (ENTREEJOURNAL $entree) {
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
        }, $entrees);

        return $this->json([
            'message' => 'Entrées du journal récupérées avec succès.',
            'data' => $data,
        ], 200);
    }
}

