<?php

namespace App\Security;

use App\Entity\UTILISATEURS;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAccountStatusException;
use Symfony\Component\Security\Core\User\UserCheckerInterface;
use Symfony\Component\Security\Core\User\UserInterface;

final class ActiveUserChecker implements UserCheckerInterface
{
    public function checkPreAuth(UserInterface $user): void
    {
        if (!$user instanceof UTILISATEURS) {
            return;
        }

        if ($user->isEstActif() !== true) {
            throw new CustomUserMessageAccountStatusException(
                'Ce compte est désactivé.'
            );
        }
    }

    public function checkPostAuth(
        UserInterface $user,
        ?TokenInterface $token = null
    ): void {
        // Aucune vérification supplémentaire après l'authentification.
    }
}

