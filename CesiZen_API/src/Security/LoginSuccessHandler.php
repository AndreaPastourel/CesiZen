<?php

namespace App\Security;

use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;
use App\Entity\UTILISATEURS;

class LoginSuccessHandler implements AuthenticationSuccessHandlerInterface{

public function __construct(
    private JWTTokenManagerInterface $jwtManager
)
{
}

public function onAuthenticationSuccess(Request $request, TokenInterface $token): JsonResponse
{
  $user=$token->getUser();

  if (!$user instanceof UTILISATEURS){
    return new JsonResponse([
        'message'=>'Utilisateur Invalide'
    ],401);
  } else {
    $jwt=$this->jwtManager->create($user);

    return new JsonResponse([
        'token'=>$jwt,
        'user'=>[
            'id'=>$user->getId(),
            'nom'=> $user->getNom(),
            'prenom'=> $user->getPrenom(),
            'pseudo'=> $user->getPseudo(),
            'email'=> $user->getEmail(),
            'telephone'=>$user->getPrenom(),
            'photo_profil'=> $user->getPhotoProfil(),
            'est_actif'=> $user->isEstActif(),
            'email_verifie'=> $user->isEmailVerifie(),
            'role'=> $user->getRoles(),

        ]
    ]);
  }

}

}




