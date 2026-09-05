<?php

namespace App\Security;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAccountStatusException;
use Symfony\Component\Security\Core\Exception\TooManyLoginAttemptsAuthenticationException;
use Symfony\Component\Security\Http\Authentication\AuthenticationFailureHandlerInterface;

final class AuthenticationFailureHandler implements AuthenticationFailureHandlerInterface
{
    public function onAuthenticationFailure(
        Request $request,
        AuthenticationException $exception
    ): JsonResponse {
       
        if ($exception instanceof TooManyLoginAttemptsAuthenticationException) {
            return new JsonResponse([
                'message' => 'Trop de tentatives de connexion. Réessayez dans quelques minutes.',
                'data' => null,
            ], JsonResponse::HTTP_TOO_MANY_REQUESTS);
        }

       
        if ($exception instanceof CustomUserMessageAccountStatusException) {
            return new JsonResponse([
                'message' => $exception->getMessageKey(),
                'data' => null,
            ], JsonResponse::HTTP_UNAUTHORIZED);
        }

       
        return new JsonResponse([
            'message' => 'Adresse email ou mot de passe incorrect.',
            'data' => null,
        ], JsonResponse::HTTP_UNAUTHORIZED);
    }
}