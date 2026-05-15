<?php

namespace App\Controller;

use App\Entity\RESSOURCES;
use App\Repository\RESSOURCESRepository;
use Symfony\Component\HttpFoundation\JsonResponse;

class RessourceBySlugController
{
    public function __construct(
        private RESSOURCESRepository $ressourcesRepository
    ) {
    }

    public function __invoke(string $slug): JsonResponse
    {
        $ressource = $this->ressourcesRepository->findOneBy([
            'slug' => $slug
        ]);

        if (!$ressource) {
            return new JsonResponse([
                'message' => 'Ressource introuvable.',
                'data' => null
            ], 404);
        }

        return new JsonResponse([
            'message' => 'Ressource récupérée avec succès.',
            'data' => $this->formatRessource($ressource)
        ], 200);
    }

    private function formatRessource(RESSOURCES $ressource): array
    {
        $auteur = $ressource->getAuteur();
        $categorie = $ressource->getCategorie();
        $type = $ressource->getType();

        return [
            'id' => $ressource->getId(),
            'titre' => $ressource->getTitre(),
            'slug' => $ressource->getSlug(),
            'resume' => $ressource->getResume(),
            'contenu_texte' => $ressource->getContenuTexte(),
            'chemin_media' => $ressource->getCheminMedia(),
            'nom_fichier' => $ressource->getNomFichier(),
            'taille_fichier_ko' => $ressource->getTailleFichierKo(),
            'duree_seconde' => $ressource->getDureeSeconde(),
            'largeur_px' => $ressource->getLargeurPx(),
            'hauteur_px' => $ressource->getHauteurPx(),
            'est_actif' => $ressource->isEstActif(),
            'date_publication' => $ressource->getDatePublication()?->format('Y-m-d H:i:s'),
            'created_at' => $ressource->getCreatedAt()?->format('Y-m-d H:i:s'),
            'updated_at' => $ressource->getUpdatedAt()?->format('Y-m-d H:i:s'),

            'auteur' => $auteur ? [
                'id' => $auteur->getId(),
                'nom' => $auteur->getNom(),
                'prenom' => $auteur->getPrenom(),
                'pseudo' => $auteur->getPseudo(),
                'email' => $auteur->getEmail(),
            ] : null,

            'categorie' => $categorie ? [
                'id' => $categorie->getId(),
                'nom' => $categorie->getNom(),
                'couleur' => $categorie->getCouleur(),
                'description' => $categorie->getDescription(),
            ] : null,

            'type' => $type ? [
                'id' => $type->getId(),
                'code' => $type->getCode(),
                'libelle' => $type->getLibelle(),
                'couleur' => $type->getCouleur(),
                'description' => $type->getDescription(),
            ] : null,
        ];
    }
}