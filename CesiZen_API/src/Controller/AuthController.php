<?php

namespace App\Controller;

use App\Entity\UTILISATEURS;
use App\Repository\ROLESRepository;
use App\Repository\UTILISATEURSRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

final class AuthController extends AbstractController
{
    #[Route('/api/register', name: 'api_register', methods: ['Post'])]
    public function register(
        Request $request,
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $passwordHasher,
        UTILISATEURSRepository $uTILISATEURSRepository,
        ROLESRepository $rOLESRepository
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);
        
        // Validation des données
        $validationError = $this->validateRegistrationData($data, $uTILISATEURSRepository);
        if ($validationError) {
            return $validationError;
        }

        // Récupération du rôle utilisateur
        $role_user = $rOLESRepository->findOneBy(['code' => 'ROLE_USER']);
        if (!$role_user) {
            return $this->json(['message' => 'Le role Utilisateur est introuvable'], 500);
        }

        // Création et enregistrement de l'utilisateur
        $utilisateur = $this->createUtilisateur($data, $role_user, $passwordHasher);
        $entityManager->persist($utilisateur);
        $entityManager->flush();

        return $this->json(['message' => 'Utilisateur créé avec succès.'], 201);
    }

    private function validateRegistrationData(array $data, UTILISATEURSRepository $repository): ?JsonResponse
    {
        // Vérification des champs obligatoires
        if (empty($data['nom']) || empty($data['prenom']) || empty($data['email']) || empty($data['mot_de_passe']) || empty($data['pseudo'])) {
            return $this->json(['message' => 'Champs obligatoires manquant'], 400);
        }

        // Vérification des doublons
        if ($repository->findOneBy(['email' => $data['email']]) !== null) {
            return $this->json(['message' => 'Cet email est déjà utilisé'], 409);
        }

        if ($repository->findOneBy(['pseudo' => $data['pseudo']]) !== null) {
            return $this->json(['message' => 'Ce pseudo est déjà utilisé'], 409);
        }

        return null;
    }

    private function createUtilisateur(array $data, $role_user, UserPasswordHasherInterface $passwordHasher): UTILISATEURS
    {
        $utilisateur = new UTILISATEURS();
        $utilisateur->setNom($data['nom']);
        $utilisateur->setPrenom($data['prenom']);
        $utilisateur->setEmail($data['email']);
        $utilisateur->setPseudo($data['pseudo']);
        $utilisateur->setTelephone($data['telephone'] ?? null);
        $utilisateur->setPhotoProfil($data['photo_profil'] ?? null);
        $utilisateur->setRoleEntity($role_user);

        $hashedPassword = $passwordHasher->hashPassword($utilisateur, $data['mot_de_passe']);
        $utilisateur->setMotDePasse($hashedPassword);

        return $utilisateur;
    }

    public function index(): Response
    {
        return $this->render('auth/index.html.twig', [
            'controller_name' => 'AuthController',
        ]);
    }
}
