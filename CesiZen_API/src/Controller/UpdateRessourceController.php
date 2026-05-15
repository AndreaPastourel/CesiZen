<?php

namespace App\Controller;

use App\Entity\RESSOURCES;
use App\Entity\UTILISATEURS;
use App\Repository\CATEGORIESRESSOURCESRepository;
use App\Repository\RESSOURCESRepository;
use App\Repository\TYPESRESSOURCESRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\String\Slugger\SluggerInterface;

class UpdateRessourceController extends AbstractController
{
    public function __construct(
        private RESSOURCESRepository $ressourcesRepository,
        private EntityManagerInterface $entityManager
    ) {
    }

    public function __invoke(
        int $id,
        Request $request,
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

        $titre = $request->request->get('titre');
        $slug = $request->request->get('slug');
        $resume = $request->request->get('resume');
        $contenuTexte = $request->request->get('contenu_texte');
        $categorieId = $request->request->get('categorie_id');
        $typeId = $request->request->get('type_id');

        if ($titre !== null && $titre !== '') {
            $ressource->setTitre($titre);
        }

        if ($slug !== null && $slug !== '') {
            $ressource->setSlug($slug);
        }

        if ($resume !== null && $resume !== '') {
            $ressource->setResume($resume);
        }

        if ($contenuTexte !== null) {
            $ressource->setContenuTexte($contenuTexte);
        }

        if ($categorieId !== null && $categorieId !== '') {
            $categorie = $categoriesRepository->find($categorieId);

            if (!$categorie) {
                return $this->json([
                    'message' => 'Catégorie introuvable.',
                    'data' => null,
                ], 404);
            }

            $ressource->setCategorie($categorie);
        }

        if ($typeId !== null && $typeId !== '') {
            $type = $typesRepository->find($typeId);

            if (!$type) {
                return $this->json([
                    'message' => 'Type de ressource introuvable.',
                    'data' => null,
                ], 404);
            }

            $ressource->setType($type);
        }

        if ($request->request->has('est_actif')) {
            $estActif = filter_var(
                $request->request->get('est_actif'),
                FILTER_VALIDATE_BOOLEAN,
                FILTER_NULL_ON_FAILURE
            );

            if ($estActif === null) {
                return $this->json([
                    'message' => 'Le champ est_actif doit être un booléen.',
                    'data' => null,
                ], 400);
            }

            $ressource->setEstActif($estActif);

            if ($estActif) {
                $ressource->setDatePublication(new \DateTimeImmutable());
            } else {
                $ressource->setDatePublication(null);
            }
        }

        $ressource->setLargeurPx($this->convertToNullableInt($request->request->get('largeur_px')));
        $ressource->setHauteurPx($this->convertToNullableInt($request->request->get('hauteur_px')));
        $ressource->setDureeSeconde($this->convertToNullableInt($request->request->get('duree_seconde')));

        $fichier = $request->files->get('fichier');

        if ($fichier) {
            $nomOriginal = pathinfo($fichier->getClientOriginalName(), PATHINFO_FILENAME);
            $nomSecurise = $slugger->slug($nomOriginal)->lower();

            $extension = $fichier->getClientOriginalExtension();

            if (!$extension) {
                $extension = 'bin';
            }

            $nomFichier = $nomSecurise . '-' . uniqid() . '.' . $extension;

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

        $ressource->setUpdatedAt(new \DateTimeImmutable());

        $this->entityManager->flush();

        return $this->json([
            'message' => 'Ressource modifiée avec succès.',
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
            ],
        ], 200);
    }

    private function convertToNullableInt(mixed $value): ?int
    {
        if ($value === null || $value === '') {
            return null;
        }

        return (int) $value;
    }
}