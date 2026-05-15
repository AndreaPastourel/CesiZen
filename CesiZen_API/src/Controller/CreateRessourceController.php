<?php

namespace App\Controller;

use App\Entity\RESSOURCES;
use App\Entity\UTILISATEURS;
use App\Repository\CATEGORIESRESSOURCESRepository;
use App\Repository\TYPESRESSOURCESRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\String\Slugger\SluggerInterface;

class CreateRessourceController extends AbstractController
{
    #[Route('/api/ressource', name: 'api_ressources_create_custom', methods: ['POST'])]
    public function create(
        Request $request,
        EntityManagerInterface $entityManager,
        CATEGORIESRESSOURCESRepository $categoriesRepository,
        TYPESRESSOURCESRepository $typesRepository,
        SluggerInterface $slugger
    ): JsonResponse {
        $user = $this->getUser();

        if (!$user instanceof UTILISATEURS) {
            return $this->json([
                'message' => 'Utilisateur non connecté.',
                'data' => null,
            ], 401);
        }

        $titre = $request->request->get('titre');
        $slug = $request->request->get('slug');
        $resume = $request->request->get('resume');
        $contenuTexte = $request->request->get('contenu_texte');
        $categorieId = $request->request->get('categorie_id');
        $typeId = $request->request->get('type_id');

        $estActif = filter_var(
            $request->request->get('est_actif', true),
            FILTER_VALIDATE_BOOLEAN
        );

        if (!$titre || !$slug || !$resume || !$categorieId || !$typeId) {
            return $this->json([
                'message' => 'Les champs titre, slug, résumé, catégorie et type sont obligatoires.',
                'data' => null,
            ], 400);
        }

        $categorie = $categoriesRepository->find($categorieId);

        if (!$categorie) {
            return $this->json([
                'message' => 'Catégorie introuvable.',
                'data' => null,
            ], 404);
        }

        $type = $typesRepository->find($typeId);

        if (!$type) {
            return $this->json([
                'message' => 'Type de ressource introuvable.',
                'data' => null,
            ], 404);
        }

        $ressource = new RESSOURCES();

        $ressource->setTitre($titre);
        $ressource->setSlug($slug);
        $ressource->setResume($resume);
        $ressource->setContenuTexte($contenuTexte);
        $ressource->setCategorie($categorie);
        $ressource->setType($type);
        $ressource->setAuteur($user);
        $ressource->setEstActif($estActif);
        $ressource->setCreatedAt(new \DateTimeImmutable());
        $ressource->setUpdatedAt(new \DateTimeImmutable());

        if ($estActif) {
            $ressource->setDatePublication(new \DateTimeImmutable());
        }

        $largeurPx = $request->request->get('largeur_px');
        $hauteurPx = $request->request->get('hauteur_px');
        $dureeSeconde = $request->request->get('duree_seconde');

        $ressource->setLargeurPx($this->convertToNullableInt($largeurPx));
        $ressource->setHauteurPx($this->convertToNullableInt($hauteurPx));
        $ressource->setDureeSeconde($this->convertToNullableInt($dureeSeconde));

        $fichier = $request->files->get('fichier');

        if ($fichier) {
            $nomOriginal = pathinfo($fichier->getClientOriginalName(), PATHINFO_FILENAME);
            $nomSecurise = $slugger->slug($nomOriginal)->lower();

            $extension = $fichier->getClientOriginalExtension();

            if (!$extension) {
                $extension = 'bin';
            }

            $nomFichier = $nomSecurise . '-' . uniqid() . '.' . $extension;

            // Important : récupérer la taille AVANT le move()
            $tailleFichierKo = (int) ceil($fichier->getSize() / 1024);

            $uploadDirectory = $this->getParameter('kernel.project_dir') . '/public/uploads/ressources';

            if (!is_dir($uploadDirectory)) {
                mkdir($uploadDirectory, 0777, true);
            }

            try {
                $fichier->move($uploadDirectory, $nomFichier);
            } catch (FileException) {
                return $this->json([
                    'message' => 'Erreur lors de l’envoi du fichier.',
                    'data' => null,
                ], 500);
            }

            $ressource->setNomFichier($nomFichier);
            $ressource->setCheminMedia('/uploads/ressources/' . $nomFichier);
            $ressource->setTailleFichierKo($tailleFichierKo);
        }

        $entityManager->persist($ressource);
        $entityManager->flush();

        return $this->json([
            'message' => 'Ressource créée avec succès.',
            'data' => [
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

                'auteur' => [
                    'id' => $user->getId(),
                    'nom' => $user->getNom(),
                    'prenom' => $user->getPrenom(),
                    'pseudo' => $user->getPseudo(),
                    'email' => $user->getEmail(),
                ],

                'categorie' => [
                    'id' => $categorie->getId(),
                    'nom' => $categorie->getNom(),
                    'couleur' => $categorie->getCouleur(),
                    'description' => $categorie->getDescription(),
                ],

                'type' => [
                    'id' => $type->getId(),
                    'code' => $type->getCode(),
                    'libelle' => $type->getLibelle(),
                    'couleur' => $type->getCouleur(),
                    'description' => $type->getDescription(),
                ],
            ],
        ], 201);
    }

    private function convertToNullableInt(mixed $value): ?int
    {
        if ($value === null || $value === '') {
            return null;
        }

        return (int) $value;
    }
}