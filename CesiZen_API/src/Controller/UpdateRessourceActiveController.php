<?php

namespace App\Controller;

use App\Entity\RESSOURCES;
use App\Entity\UTILISATEURS;
use App\Repository\RESSOURCESRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class UpdateRessourceActiveController extends AbstractController
{
    public function __construct(
        private RESSOURCESRepository $ressourcesRepository,
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

        $ressource = $this->ressourcesRepository->find($id);

        if (!$ressource) {
            return $this->json([
                'message' => 'Ressource introuvable.',
                'data' => null,
            ], 404);
        }

        $data = json_decode($request->getContent(), true);

        if (!is_array($data) || !array_key_exists('est_actif', $data)) {
            return $this->json([
                'message' => 'Le champ est_actif est obligatoire.',
                'data' => null,
            ], 400);
        }

        $estActif = filter_var($data['est_actif'], FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);

        if ($estActif === null) {
            return $this->json([
                'message' => 'Le champ est_actif doit être un booléen.',
                'data' => null,
            ], 400);
        }

        $ressource->setEstActif($estActif);
        $ressource->setUpdatedAt(new \DateTimeImmutable());

        if ($estActif) {
            $ressource->setDatePublication(new \DateTimeImmutable());
        } else {
            $ressource->setDatePublication(null);
        }

        $this->entityManager->flush();

        return $this->json([
            'message' => $estActif
                ? 'La ressource a été activée avec succès.'
                : 'La ressource a été désactivée avec succès.',
            'data' => [
                'id' => $ressource->getId(),
                'titre' => $ressource->getTitre(),
                'slug' => $ressource->getSlug(),
                'est_actif' => $ressource->isEstActif(),
                'date_publication' => $ressource->getDatePublication()?->format('Y-m-d H:i:s'),
                'updated_at' => $ressource->getUpdatedAt()?->format('Y-m-d H:i:s'),
            ],
        ], 200);
    }
}