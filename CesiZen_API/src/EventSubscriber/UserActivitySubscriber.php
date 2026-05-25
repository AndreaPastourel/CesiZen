<?php

namespace App\EventSubscriber;

use App\Entity\UTILISATEURS;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Http\Event\LoginSuccessEvent;

class UserActivitySubscriber implements EventSubscriberInterface
{
    public function __construct(
        private EntityManagerInterface $entityManager
    ) {
    }

    public static function getSubscribedEvents(): array
    {
        return [
            LoginSuccessEvent::class => 'onLoginSuccess',
        ];
    }

    public function onLoginSuccess(LoginSuccessEvent $event): void
    {
        $user = $event->getUser();

        if (!$user instanceof UTILISATEURS) {
            return;
        }

        $user->setDateDerniereConnexion(new \DateTimeImmutable());
        $user->setDateAlerteInactivite(null);

        $this->entityManager->flush();
    }
}

