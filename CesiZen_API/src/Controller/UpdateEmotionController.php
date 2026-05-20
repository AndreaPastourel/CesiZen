<?php

namespace App\Controller;

use App\Entity\EMOTIONS;
use App\Entity\UTILISATEURS;
use App\Repository\EMOTIONSRepository;
use App\Repository\TYPESEMOTIONRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\String\Slugger\SluggerInterface;

class UpdateEmotionController extends AbstractController
{
    public function __construct(
        private EMOTIONSRepository $emotionsRepository,
        private EntityManagerInterface $entityManager
    ) {
    }

    public function __invoke(
        int $id,
        Request $request,
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

        $emotion = $this->emotionsRepository->find($id);

        if (!$emotion) {
            return $this->json([
                'message' => 'Émotion introuvable.',
                'data' => null,
            ], 404);
        }

        $nom = $request->request->get('nom');
        $couleur = $request->request->get('couleur');
        $description = $request->request->get('description');
        $intensiteMin = $request->request->get('intensite_min');
        $intensiteMax = $request->request->get('intensite_max');
        $typeEmotionId = $request->request->get('type_emotion_id');

        if ($nom !== null && trim($nom) !== '') {
            $emotion->setNom($nom);
        }

        if ($couleur !== null) {
            $emotion->setCouleur($couleur);
        }

        if ($description !== null) {
            $emotion->setDescription($description);
        }

        if ($intensiteMin !== null && $intensiteMin !== '') {
            if (!is_numeric($intensiteMin)) {
                return $this->json([
                    'message' => 'L’intensité minimum doit être un nombre.',
                    'data' => null,
                ], 400);
            }

            $emotion->setIntensiteMin((int) $intensiteMin);
        }

        if ($intensiteMax !== null && $intensiteMax !== '') {
            if (!is_numeric($intensiteMax)) {
                return $this->json([
                    'message' => 'L’intensité maximum doit être un nombre.',
                    'data' => null,
                ], 400);
            }

            $emotion->setIntensiteMax((int) $intensiteMax);
        }

        if (
            $emotion->getIntensiteMin() !== null &&
            $emotion->getIntensiteMax() !== null &&
            $emotion->getIntensiteMin() > $emotion->getIntensiteMax()
        ) {
            return $this->json([
                'message' => 'L’intensité minimum ne peut pas être supérieure à l’intensité maximum.',
                'data' => null,
            ], 400);
        }

        if ($typeEmotionId !== null && $typeEmotionId !== '') {
            $typeEmotion = $typesEmotionRepository->find($typeEmotionId);

            if (!$typeEmotion) {
                return $this->json([
                    'message' => 'Type d’émotion introuvable.',
                    'data' => null,
                ], 404);
            }

            $emotion->setTypeEmotion($typeEmotion);
        }

        $icone = $request->files->get('icone');

        if ($icone) {
            $nomOriginal = pathinfo($icone->getClientOriginalName(), PATHINFO_FILENAME);
            $nomSecurise = $slugger->slug($nomOriginal)->lower();

            $extension = strtolower($icone->getClientOriginalExtension());

            if (!$extension) {
                $extension = 'bin';
            }

            $extensionsAutorisees = ['png', 'jpg', 'jpeg', 'svg', 'webp'];

            if (!in_array($extension, $extensionsAutorisees, true)) {
                return $this->json([
                    'message' => 'Le format de l’icône n’est pas autorisé.',
                    'data' => null,
                ], 400);
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

        $emotion->setUpdatedAt(new \DateTimeImmutable());

        $this->entityManager->flush();

        $typeEmotion = $emotion->getTypeEmotion();

        return $this->json([
            'message' => 'Émotion modifiée avec succès.',
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
                'type_emotion' => $typeEmotion ? [
                    'id' => $typeEmotion->getId(),
                    'nom' => $typeEmotion->getNom(),
                    'couleur' => $typeEmotion->getCouleur(),
                    'description' => $typeEmotion->getDescription(),
                ] : null,
            ],
        ], 200);
    }
}
