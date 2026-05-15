<?php

namespace App\Security;

use App\Entity\UTILISATEURS;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;

class LoginSuccessHandler implements AuthenticationSuccessHandlerInterface
{
    public function __construct(
        private JWTTokenManagerInterface $jwtManager
    ) {
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token): JsonResponse
    {
        $user = $token->getUser();

        if (!$user instanceof UTILISATEURS) {
            return new JsonResponse([
                'message' => 'Utilisateur invalide',
            ], 401);
        }

        $jwt = $this->jwtManager->create($user);

        $response = new JsonResponse([
            'message' => 'Connexion réussie.',
            'data' => [
                'token' => $jwt,
                'user' => [
                    'id' => $user->getId(),
                    'nom' => $user->getNom(),
                    'prenom' => $user->getPrenom(),
                    'pseudo' => $user->getPseudo(),
                    'email' => $user->getEmail(),
                    'telephone' => $user->getTelephone(),
                    'photo_profil' => $user->getPhotoProfil(),
                    'est_actif' => $user->isEstActif(),
                    'email_verifie' => $user->isEmailVerifie(),
                    'role' => $user->getRoles(),
                ],
            ],
        ]);

        $cookie = Cookie::create('AUTH_TOKEN')
            ->withValue($jwt)
            ->withHttpOnly(true)
            ->withSecure(false)
            ->withSameSite('Lax')
            ->withPath('/')
            ->withExpires(time() + 3600);

        $response->headers->setCookie($cookie);

        return $response;
    }
}