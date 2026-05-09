<?php

namespace App\Security;

use Lexik\Bundle\JWTAuthenticationBundle\Security\Http\Authentication\AuthenticationFailureHandler as LexikAuthenticationFailureHandler;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\Exception\AuthenticationException;

class AuthenticationFailureHandler extends LexikAuthenticationFailureHandler
{
    public function onAuthenticationFailure($request, AuthenticationException $exception): JsonResponse
    {
        return new JsonResponse([
            'message' => 'Adresse email ou mot de passe incorrect.',
        ], JsonResponse::HTTP_UNAUTHORIZED);
    }
}