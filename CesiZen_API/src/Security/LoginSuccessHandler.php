<?php

namespace App\Security;

use App\Entity\UTILISATEURS;
use Doctrine\ORM\EntityManagerInterface;
use Gesdinet\JWTRefreshTokenBundle\Generator\RefreshTokenGeneratorInterface;
use Gesdinet\JWTRefreshTokenBundle\Model\RefreshTokenManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;

class LoginSuccessHandler implements AuthenticationSuccessHandlerInterface
{
    public function __construct(
        private JWTTokenManagerInterface $jwtManager,
        private RefreshTokenGeneratorInterface $refreshTokenGenerator,
        private RefreshTokenManagerInterface $refreshTokenManager,
        private EntityManagerInterface $entityManager
    ) {
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token): JsonResponse
    {
        $user = $token->getUser();

        if (!$user instanceof UTILISATEURS) {
            return new JsonResponse([
                'message' => 'Utilisateur invalide',
                'data' => null,
            ], 401);
        }

        $jwt = $this->jwtManager->create($user);

        $refreshToken = $this->refreshTokenGenerator->createForUserWithTtl(
            $user,
            2592000
        );

        $this->refreshTokenManager->save($refreshToken);

        $role = $user->getRoleEntity();

        $response = new JsonResponse([
            'message' => 'Connexion réussie.',
            'data' => [
                'token' => $jwt,
                'refresh_token' => $refreshToken->getRefreshToken(),
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
                    'date_derniere_connexion' => $user->getDateDerniereConnexion()?->format('Y-m-d H:i:s'),
                    'role' => $role ? [
                        'id' => $role->getId(),
                        'code' => $role->getCode(),
                        'libelle' => $role->getLibelle(),
                        'description' => $role->getDescription(),
                    ] : null,
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
