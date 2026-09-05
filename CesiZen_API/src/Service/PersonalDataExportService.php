<?php

namespace App\Service;

use App\Entity\ENTREEJOURNAL;
use App\Entity\UTILISATEURS;
use App\Repository\ENTREEJOURNALRepository;

final class PersonalDataExportService
{
    public function __construct(
        private readonly ENTREEJOURNALRepository $entreeJournalRepository
    ) {
    }

 
    public function buildExport(UTILISATEURS $user): array
    {
        
        $entrees = $this->entreeJournalRepository->findBy(
            ['utilisateur' => $user],
            ['date_ressentie' => 'ASC']
        );

        return [
            'metadata' => [
                'application' => 'CesiZen',
                'format_version' => '1.0',
                'exported_at' => (new \DateTimeImmutable())->format(\DateTimeInterface::ATOM),
            ],

            'profil' => [
                'id' => $user->getId(),
                'nom' => $user->getNom(),
                'prenom' => $user->getPrenom(),
                'pseudo' => $user->getPseudo(),
                'email' => $user->getEmail(),
                'telephone' => $user->getTelephone(),
                'photo_profil' => $user->getPhotoProfil(),
                'est_actif' => $user->isEstActif(),
                'email_verifie' => $user->isEmailVerifie(),
                'role' => $user->getRoleEntity()?->getCode(),
                'date_derniere_connexion' => $this->formatDate(
                    $user->getDateDerniereConnexion()
                ),
                'date_creation' => $this->formatDate($user->getCreatedAt()),
                'date_modification' => $this->formatDate($user->getUpdatedAt()),
                'date_alerte_inactivite' => $this->formatDate(
                    $user->getDateAlerteInactivite()
                ),
            ],

            'journal_emotionnel' => array_map(
                fn (ENTREEJOURNAL $entree): array => $this->mapJournalEntry($entree),
                $entrees
            ),
        ];
    }


    private function mapJournalEntry(ENTREEJOURNAL $entree): array
    {
        $emotion = $entree->getEmotion();
        $typeEmotion = $emotion?->getTypeEmotion();

        return [
            'id' => $entree->getId(),
            'titre' => $entree->getTitre(),
            'intensite' => $entree->getIntensite(),
            'date_ressentie' => $this->formatDate($entree->getDateRessentie()),
            'date_creation' => $this->formatDate($entree->getCreatedAt()),
            'date_modification' => $this->formatDate($entree->getUpdatedAt()),

         
            'emotion' => $emotion ? [
                'id' => $emotion->getId(),
                'nom' => $emotion->getNom(),
                'icone' => $emotion->getIcone(),
                'couleur' => $emotion->getCouleur(),
                'description' => $emotion->getDescription(),
                'intensite_min' => $emotion->getIntensiteMin(),
                'intensite_max' => $emotion->getIntensiteMax(),
                'type_emotion' => $typeEmotion ? [
                    'id' => $typeEmotion->getId(),
                    'nom' => $typeEmotion->getNom(),
                    'couleur' => $typeEmotion->getCouleur(),
                    'description' => $typeEmotion->getDescription(),
                ] : null,
            ] : null,
        ];
    }

    private function formatDate(?\DateTimeInterface $date): ?string
    {
        return $date?->format(\DateTimeInterface::ATOM);
    }
}
