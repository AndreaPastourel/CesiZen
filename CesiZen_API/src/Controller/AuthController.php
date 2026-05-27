<?php

namespace App\Controller;

use App\Entity\UTILISATEURS;
use App\Repository\ROLESRepository;
use App\Repository\UTILISATEURSRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\String\Slugger\SluggerInterface;

final class AuthController extends AbstractController
{
    #[Route('/api/register', name: 'api_register', methods: ['POST'])]
    public function register(
        Request $request,
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $passwordHasher,
        UTILISATEURSRepository $uTILISATEURSRepository,
        ROLESRepository $rOLESRepository,
        SluggerInterface $slugger
    ): JsonResponse {
        /*
         * Si le front envoie un FormData, les champs texte sont dans $request->request.
         * Si le front envoie du JSON classique, on récupère les données avec json_decode.
         */
        $data = $request->request->all();

        if (empty($data)) {
            $data = json_decode($request->getContent(), true) ?? [];
        }

        // Validation des données
        $validationError = $this->validateRegistrationData($data, $uTILISATEURSRepository);

        if ($validationError) {
            return $validationError;
        }

        // Récupération du rôle utilisateur
        $roleUser = $rOLESRepository->findOneBy([
            'code' => 'ROLE_USER',
        ]);

        if (!$roleUser) {
            return $this->json([
                'message' => 'Le rôle utilisateur est introuvable.',
                'data' => null,
            ], 500);
        }

        // Création de l'utilisateur
        $utilisateur = $this->createUtilisateur($data, $roleUser, $passwordHasher);

        $photoProfil = $request->files->get('photo_profil');

        if ($photoProfil) {
            $nomOriginal = pathinfo($photoProfil->getClientOriginalName(), PATHINFO_FILENAME);
            $nomSecurise = $slugger->slug($nomOriginal)->lower();

            $extension = strtolower($photoProfil->getClientOriginalExtension());

            if (!$extension) {
                $extension = 'bin';
            }

            $extensionsAutorisees = ['png', 'jpg', 'jpeg', 'webp'];

            if (!in_array($extension, $extensionsAutorisees, true)) {
                return $this->json([
                    'message' => 'Le format de l’image n’est pas autorisé.',
                    'data' => null,
                ], 400);
            }

            $nomFichier = $nomSecurise . '-' . uniqid() . '.' . $extension;

            $uploadDirectory = $this->getParameter('kernel.project_dir') . '/public/uploads/profils';

            if (!is_dir($uploadDirectory)) {
                mkdir($uploadDirectory, 0777, true);
            }

            try {
                $photoProfil->move($uploadDirectory, $nomFichier);
            } catch (FileException) {
                return $this->json([
                    'message' => 'Erreur lors de l’envoi de l’image de profil.',
                    'data' => null,
                ], 500);
            }

            $utilisateur->setPhotoProfil('/uploads/profils/' . $nomFichier);
        }

        $entityManager->persist($utilisateur);
        $entityManager->flush();

        return $this->json([
            'message' => 'Utilisateur créé avec succès.',
            'data' => [
                'id' => $utilisateur->getId(),
                'nom' => $utilisateur->getNom(),
                'prenom' => $utilisateur->getPrenom(),
                'pseudo' => $utilisateur->getPseudo(),
                'email' => $utilisateur->getEmail(),
                'telephone' => $utilisateur->getTelephone(),
                'photo_profil' => $utilisateur->getPhotoProfil(),
                'est_actif' => $utilisateur->isEstActif(),
                'email_verifie' => $utilisateur->isEmailVerifie(),
                'role' => $utilisateur->getRoleEntity()?->getCode(),
            ],
        ], 201);
    }

    private function validateRegistrationData(array $data, UTILISATEURSRepository $repository): ?JsonResponse
    {
        // Vérification des champs obligatoires
        if (empty($data['email']) || empty($data['motDePasse']) || empty($data['pseudo'])) {
            return $this->json([
                'message' => 'Champs obligatoires manquant',
                'data' => null,
            ], 400);
        }

        // Vérification de l'email déjà utilisé
        if ($repository->findOneBy(['email' => $data['email']]) !== null) {
            return $this->json([
                'message' => 'Cet email est déjà utilisé',
                'data' => null,
            ], 409);
        }

        // Vérification du pseudo déjà utilisé
        if ($repository->findOneBy(['pseudo' => $data['pseudo']]) !== null) {
            return $this->json([
                'message' => 'Ce pseudo est déjà utilisé',
                'data' => null,
            ], 409);
        }

        return null;
    }

    private function createUtilisateur(
        array $data,
        $roleUser,
        UserPasswordHasherInterface $passwordHasher
    ): UTILISATEURS {
        $utilisateur = new UTILISATEURS();

        if (!empty($data['nom'])) {
            $utilisateur->setNom($data['nom']);
        }

        if (!empty($data['prenom'])) {
            $utilisateur->setPrenom($data['prenom']);
        }

        if (!empty($data['telephone'])) {
            $utilisateur->setTelephone($data['telephone']);
        }

        
        if (!empty($data['photo_profil'])) {
            $utilisateur->setPhotoProfil($data['photo_profil']);
        } elseif (!empty($data['photoProfil'])) {
            $utilisateur->setPhotoProfil($data['photoProfil']);
        }

        $utilisateur->setPseudo($data['pseudo']);
        $utilisateur->setEmail($data['email']);
        $utilisateur->setRoleEntity($roleUser);

        $hashedPassword = $passwordHasher->hashPassword(
            $utilisateur,
            $data['motDePasse']
        );

        $utilisateur->setMotDePasse($hashedPassword);

        return $utilisateur;
    }

    public function index(): Response
    {
        return $this->render('auth/index.html.twig', [
            'controller_name' => 'AuthController',
        ]);
    }

    #[Route('/api/me', name: 'api_me', methods: ['GET'])]
    public function me(): JsonResponse
    {
        $user = $this->getUser();

        if (!$user instanceof UTILISATEURS) {
            return $this->json([
                'message' => 'Utilisateur non connecté',
                'data' => null,
            ], 401);
        }

        $role = $user->getRoleEntity();

        return $this->json([
            'message' => 'Utilisateur récupéré avec succès.',
            'data' => [
                'id' => $user->getId(),
                'nom' => $user->getNom(),
                'prenom' => $user->getPrenom(),
                'pseudo' => $user->getPseudo(),
                'email' => $user->getEmail(),
                'telephone' => $user->getTelephone(),
                'photo_profil' => $user->getPhotoProfil(),
                'est_actif' => $user->isEstActif(),
                'email_verifie' => $user->isEmailVerifie(),
                'date_derniere_connexion' => $user->getDateDerniereConnexion()?->format('Y-m-d H:i:s'),
                'role' => $role ? [
                    'id' => $role->getId(),
                    'code' => $role->getCode(),
                    'libelle' => $role->getLibelle(),
                    'description' => $role->getDescription(),
                ] : null,
            ],
        ], 200);
    }

   #[Route('/api/me/update', name: 'api_me_update', methods: ['POST'])]
public function updateMe(
    Request $request,
    EntityManagerInterface $entityManager,
    SluggerInterface $slugger
): JsonResponse {
    $user = $this->getUser();

    if (!$user instanceof UTILISATEURS) {
        return $this->json([
            'message' => 'Utilisateur non connecté',
            'data' => null,
        ], 401);
    }

    /*
     * Si le front envoie du FormData, les champs texte sont ici.
     * Si le front envoie du JSON, on utilise json_decode.
     */
    $data = $request->request->all();

    if (empty($data)) {
        $data = json_decode($request->getContent(), true) ?? [];
    }

    if (empty($data) && !$request->files->get('photo_profil')) {
        return $this->json([
            'message' => 'Aucune donnée envoyée.',
            'data' => null,
        ], 400);
    }

    if (array_key_exists('nom', $data)) {
        $user->setNom($data['nom']);
    }

    if (array_key_exists('prenom', $data)) {
        $user->setPrenom($data['prenom']);
    }

    if (array_key_exists('pseudo', $data)) {
        $user->setPseudo($data['pseudo']);
    }

    if (array_key_exists('telephone', $data)) {
        $user->setTelephone($data['telephone']);
    }

    /*
     * Gestion de l'image envoyée en FormData.
     * Le champ côté front doit s'appeler : photo_profil
     */
    $photoProfil = $request->files->get('photo_profil');

    if ($photoProfil) {
        $nomOriginal = pathinfo($photoProfil->getClientOriginalName(), PATHINFO_FILENAME);
        $nomSecurise = $slugger->slug($nomOriginal)->lower();

        $extension = strtolower($photoProfil->getClientOriginalExtension());

        if (!$extension) {
            $extension = 'bin';
        }

        $extensionsAutorisees = ['png', 'jpg', 'jpeg', 'webp'];

        if (!in_array($extension, $extensionsAutorisees, true)) {
            return $this->json([
                'message' => 'Le format de l’image n’est pas autorisé.',
                'data' => null,
            ], 400);
        }

        $nomFichier = $nomSecurise . '-' . uniqid() . '.' . $extension;

        $uploadDirectory = $this->getParameter('kernel.project_dir') . '/public/uploads/profils';

        if (!is_dir($uploadDirectory)) {
            mkdir($uploadDirectory, 0777, true);
        }

        try {
            $photoProfil->move($uploadDirectory, $nomFichier);
        } catch (FileException) {
            return $this->json([
                'message' => 'Erreur lors de l’envoi de l’image de profil.',
                'data' => null,
            ], 500);
        }

        $user->setPhotoProfil('/uploads/profils/' . $nomFichier);
    }

    /*
     * Si jamais le front envoie encore une valeur texte photo_profil,
     * on l'accepte aussi, mais normalement l'image doit passer par $request->files.
     */
    if (!$photoProfil && array_key_exists('photo_profil', $data)) {
        $user->setPhotoProfil($data['photo_profil']);
    }

    $user->setUpdatedAt(new \DateTimeImmutable());

    $entityManager->flush();

    $role = $user->getRoleEntity();

    return $this->json([
        'message' => 'Profil mis à jour avec succès.',
        'data' => [
            'id' => $user->getId(),
            'nom' => $user->getNom(),
            'prenom' => $user->getPrenom(),
            'pseudo' => $user->getPseudo(),
            'email' => $user->getEmail(),
            'telephone' => $user->getTelephone(),
            'photo_profil' => $user->getPhotoProfil(),
            'est_actif' => $user->isEstActif(),
            'email_verifie' => $user->isEmailVerifie(),
            'date_derniere_connexion' => $user->getDateDerniereConnexion()?->format('Y-m-d H:i:s'),
            'role' => $role ? [
                'id' => $role->getId(),
                'code' => $role->getCode(),
                'libelle' => $role->getLibelle(),
                'description' => $role->getDescription(),
            ] : null,
        ],
    ], 200);
}
    #[Route('/api/me/password', name: 'api_me_update_password', methods: ['PATCH'])]
    public function updatePassword(
        Request $request,
        UserPasswordHasherInterface $passwordHasher,
        EntityManagerInterface $entityManager
    ): JsonResponse {
        $user = $this->getUser();
        $status = 200;
        $message = 'Mot de passe modifié avec succès.';
        $dataResponse = null;

        if (!$user instanceof UTILISATEURS) {
            $status = 401;
            $message = 'Utilisateur non connecté.';
        } else {
            $data = json_decode($request->getContent(), true);

            $currentPassword = $data['ancien_motDePasse'] ?? null;
            $newPassword = $data['nouveau_motDePasse'] ?? null;

            if (!$currentPassword || !$newPassword) {
                $status = 400;
                $message = 'Tous les champs sont obligatoires.';
            } elseif (!$passwordHasher->isPasswordValid($user, $currentPassword)) {
                $status = 400;
                $message = 'Le mot de passe actuel est incorrect.';
            } elseif (strlen($newPassword) < 8) {
                $status = 400;
                $message = 'Le nouveau mot de passe doit contenir au moins 8 caractères.';
            } elseif ($passwordHasher->isPasswordValid($user, $newPassword)) {
                $status = 400;
                $message = 'Le nouveau mot de passe doit être différent de l’ancien.';
            } else {
                $hashedPassword = $passwordHasher->hashPassword($user, $newPassword);
                $user->setMotDePasse($hashedPassword);
                $user->setUpdatedAt(new \DateTimeImmutable());

                $entityManager->flush();
            }
        }

        return $this->json([
            'message' => $message,
            'data' => $dataResponse,
        ], $status);
    }

    #[Route('/api/logout', name: 'api_logout', methods: ['POST'])]
    public function logout(): JsonResponse
    {
        $response = $this->json([
            'message' => 'Déconnexion réussie.',
            'data' => null,
        ]);

        $response->headers->clearCookie(
            'AUTH_TOKEN',
            '/',
            null,
            false,
            true,
            'lax'
        );

        return $response;
    }
}