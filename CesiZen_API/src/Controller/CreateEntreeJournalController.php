<?php

namespace App\Controller;

use App\Entity\ENTREEJOURNAL;
use App\Entity\UTILISATEURS;
use App\Repository\EMOTIONSRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class CreateEntreeJournalController extends AbstractController
{
    public function __invoke(
        Request $request,
        EMOTIONSRepository $emotionsRepository,
        EntityManagerInterface $entityManager
    ): JsonResponse {
        $user = $this->getUser();

        if (!$user instanceof UTILISATEURS) {
            return $this->json([
                'message' => 'Utilisateur non connecté.',
                'data' => null,
            ], 401);
        }

        $data = json_decode($request->getContent(), true);

        if (!is_array($data)) {
            return $this->json([
                'message' => 'Données invalides.',
                'data' => null,
            ], 400);
        }

        $titre = $data['titre'] ?? null;
        $intensite = $data['intensite'] ?? null;
        $dateRessentie = $data['date_ressentie'] ?? null;
        $emotionId = $data['emotion_id'] ?? null;

        if (!$emotionId) {
            return $this->json([
                'message' => 'L’émotion est obligatoire.',
                'data' => null,
            ], 400);
        }

        $emotion = $emotionsRepository->find($emotionId);

        if (!$emotion) {
            return $this->json([
                'message' => 'Émotion introuvable.',
                'data' => null,
            ], 404);
        }

        if ($intensite !== null && $intensite !== '' && !is_numeric($intensite)) {
            return $this->json([
                'message' => 'L’intensité doit être un nombre.',
                'data' => null,
            ], 400);
        }

        try {
            $dateRessentieObject = $dateRessentie
                ? new \DateTimeImmutable($dateRessentie)
                : new \DateTimeImmutable();
        } catch (\Exception) {
            return $this->json([
                'message' => 'La date ressentie est invalide.',
                'data' => null,
            ], 400);
        }

        $entree = new ENTREEJOURNAL();

        $entree->setUtilisateur($user);
        $entree->setEmotion($emotion);
        $entree->setTitre($titre);
        $entree->setIntensite($intensite !== null && $intensite !== '' ? (int) $intensite : null);
        $entree->setDateRessentie($dateRessentieObject);
        $entree->setCreatedAt(new \DateTimeImmutable());
        $entree->setUpdatedAt(new \DateTimeImmutable());

        $entityManager->persist($entree);
        $entityManager->flush();

        $typeEmotion = $emotion->getTypeEmotion();

        return $this->json([
            'message' => 'Entrée de journal créée avec succès.',
            'data' => [
                'id' => $entree->getId(),
                'titre' => $entree->getTitre(),
                'intensite' => $entree->getIntensite(),
                'date_ressentie' => $entree->getDateRessentie()?->format('Y-m-d H:i:s'),
                'created_at' => $entree->getCreatedAt()?->format('Y-m-d H:i:s'),
                'updated_at' => $entree->getUpdatedAt()?->format('Y-m-d H:i:s'),

                'emotion' => [
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
                ],
            ],
        ], 201);
    }
}
