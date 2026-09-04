<?php

namespace App\Command;

use App\Repository\UTILISATEURSRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Mailer\MailerInterface;

#[AsCommand(
    name: 'app:check-inactive-users',
    description: 'Avertit puis désactive les comptes utilisateurs inactifs.'
)]
class CheckInactiveUsersCommand extends Command
{
    public function __construct(
        private UTILISATEURSRepository $utilisateursRepository,
        private EntityManagerInterface $entityManager,
        private MailerInterface $mailer
    ) {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $dateAlerte = new \DateTimeImmutable('-2 months');
        $dateDesactivation = new \DateTimeImmutable('-3 months');

        $utilisateursAAvertir = $this->utilisateursRepository->createQueryBuilder('u')
            ->where('u.estActif = :actif')
            ->andWhere('u.dateDerniereConnexion IS NOT NULL')
            ->andWhere('u.dateDerniereConnexion < :dateAlerte')
            ->andWhere('u.dateDerniereConnexion >= :dateDesactivation')
            ->andWhere('u.date_alerte_inactivite IS NULL')
            ->setParameter('actif', true)
            ->setParameter('dateAlerte', $dateAlerte)
            ->setParameter('dateDesactivation', $dateDesactivation)
            ->getQuery()
            ->getResult();

        foreach ($utilisateursAAvertir as $utilisateur) {
            $email = (new TemplatedEmail())
                ->from('no-reply@cesizen.fr')
                ->to($utilisateur->getEmail())
                ->subject('Votre compte CESI Zen est inactif')
                ->html(
                    '<p>Bonjour,</p>
                    <p>Votre compte CESI Zen est inactif depuis bientôt 3 mois.</p>
                    <p>Sans reconnexion de votre part, il pourra être désactivé prochainement.</p>
                    <p>Pour conserver votre compte actif, il suffit de vous reconnecter à l’application.</p>'
                );

            $this->mailer->send($email);

            $utilisateur->setDateAlerteInactivite(new \DateTimeImmutable());
            $utilisateur->setUpdatedAt(new \DateTimeImmutable());
        }

        $utilisateursADesactiver = $this->utilisateursRepository->createQueryBuilder('u')
            ->where('u.estActif = :actif')
            ->andWhere('u.dateDerniereConnexion IS NOT NULL')
            ->andWhere('u.dateDerniereConnexion < :dateDesactivation')
            ->setParameter('actif', true)
            ->setParameter('dateDesactivation', $dateDesactivation)
            ->getQuery()
            ->getResult();

        foreach ($utilisateursADesactiver as $utilisateur) {
            $utilisateur->setEstActif(false);
            $utilisateur->setUpdatedAt(new \DateTimeImmutable());
        }

        $this->entityManager->flush();

        $output->writeln(count($utilisateursAAvertir) . ' utilisateur(s) averti(s).');
        $output->writeln(count($utilisateursADesactiver) . ' utilisateur(s) désactivé(s).');

        return Command::SUCCESS;
    }
}

