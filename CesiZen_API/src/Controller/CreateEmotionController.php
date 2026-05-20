<?php

namespace App\Controller;

use App\Entity\EMOTIONS;
use App\Entity\UTILISATEURS;
use App\Repository\TYPESEMOTIONRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\String\Slugger\SluggerInterface;

class CreateEmotionController extends AbstractController
{
    public function __invoke(
        Request $request,
        EntityManagerInterface $entityManager,
        TYPESEMOTIONRepository $typesEmotionRepository,
        SluggerInterface $slugger
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

        $nom = $request->request->get('nom');
        $couleur = $request->request->get('couleur');
        $description = $request->request->get('description');
        $intensiteMin = $request->request->get('intensite_min');
        $intensiteMax = $request->request->get('intensite_max');
        $typeEmotionId = $request->request->get('type_emotion_id');

        if (!$nom || !$intensiteMin || !$intensiteMax || !$typeEmotionId) {
            return $this->json([
                'message' => 'Les champs nom, intensité minimum, intensité maximum et type d’émotion sont obligatoires.',
                'data' => null,
            ], 400);
        }

        $typeEmotion = $typesEmotionRepository->find($typeEmotionId);

        if (!$typeEmotion) {
            return $this->json([
                'message' => 'Type d’émotion introuvable.',
                'data' => null,
            ], 404);
        }

        $emotion = new EMOTIONS();

        $emotion->setNom($nom);
        $emotion->setCouleur($couleur);
        $emotion->setDescription($description);
        $emotion->setIntensiteMin((int) $intensiteMin);
        $emotion->setIntensiteMax((int) $intensiteMax);
        $emotion->setTypeEmotion($typeEmotion);
        $emotion->setCreatedAt(new \DateTimeImmutable());
        $emotion->setUpdatedAt(new \DateTimeImmutable());

        $icone = $request->files->get('icone');

        if ($icone) {
            $nomOriginal = pathinfo($icone->getClientOriginalName(), PATHINFO_FILENAME);
            $nomSecurise = $slugger->slug($nomOriginal)->lower();

            $extension = $icone->getClientOriginalExtension();

            if (!$extension) {
                $extension = 'bin';
            }

            $nomFichier = $nomSecurise . '-' . uniqid() . '.' . $extension;

            $uploadDirectory = $this->getParameter('kernel.project_dir') . '/public/uploads/emotions';

            if (!is_dir($uploadDirectory)) {
                mkdir($uploadDirectory, 0777, true);
            }

            try {
                $icone->move($uploadDirectory, $nomFichier);
            } catch (FileException) {
                return $this->json([
                    'message' => 'Erreur lors de l’envoi de l’icône.',
                    'data' => null,
                ], 500);
            }

            $emotion->setIcone('/uploads/emotions/' . $nomFichier);
        }

        $entityManager->persist($emotion);
        $entityManager->flush();

        return $this->json([
            'message' => 'Émotion créée avec succès.',
            'data' => [
                'id' => $emotion->getId(),
                'nom' => $emotion->getNom(),
                'icone' => $emotion->getIcone(),
                'couleur' => $emotion->getCouleur(),
                'description' => $emotion->getDescription(),
                'intensite_min' => $emotion->getIntensiteMin(),
                'intensite_max' => $emotion->getIntensiteMax(),
                'created_at' => $emotion->getCreatedAt()?->format('Y-m-d H:i:s'),
                'updated_at' => $emotion->getUpdatedAt()?->format('Y-m-d H:i:s'),
                'type_emotion' => [
                    'id' => $typeEmotion->getId(),
                    'nom' => $typeEmotion->getNom(),
                    'couleur' => $typeEmotion->getCouleur(),
                    'description' => $typeEmotion->getDescription(),
                ],
            ],
        ], 201);
    }
}
