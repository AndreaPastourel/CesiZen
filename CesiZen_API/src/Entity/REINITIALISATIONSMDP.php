<?php

namespace App\Entity;

use App\Repository\REINITIALISATIONSMDPRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: REINITIALISATIONSMDPRepository::class)]
class REINITIALISATIONSMDP
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $token = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $date_demande = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $date_expiration = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $date_utilisation = null;

    #[ORM\Column]
    private ?bool $est_utilise = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $created_at = null;

    #[ORM\ManyToOne(inversedBy: 'reinitialisation_mdp')]
    #[ORM\JoinColumn(nullable: false)]
    private ?UTILISATEURS $utilisateur = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getToken(): ?string
    {
        return $this->token;
    }

    public function setToken(string $token): static
    {
        $this->token = $token;

        return $this;
    }

    public function getDateDemande(): ?\DateTimeImmutable
    {
        return $this->date_demande;
    }

    public function setDateDemande(\DateTimeImmutable $date_demande): static
    {
        $this->date_demande = $date_demande;

        return $this;
    }

    public function getDateExpiration(): ?\DateTimeImmutable
    {
        return $this->date_expiration;
    }

    public function setDateExpiration(\DateTimeImmutable $date_expiration): static
    {
        $this->date_expiration = $date_expiration;

        return $this;
    }

    public function getDateUtilisation(): ?\DateTimeImmutable
    {
        return $this->date_utilisation;
    }

    public function setDateUtilisation(?\DateTimeImmutable $date_utilisation): static
    {
        $this->date_utilisation = $date_utilisation;

        return $this;
    }

    public function isEstUtilise(): ?bool
    {
        return $this->est_utilise;
    }

    public function setEstUtilise(bool $est_utilise): static
    {
        $this->est_utilise = $est_utilise;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeImmutable $created_at): static
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getUtilisateur(): ?UTILISATEURS
    {
        return $this->utilisateur;
    }

    public function setUtilisateur(?UTILISATEURS $utilisateur): static
    {
        $this->utilisateur = $utilisateur;

        return $this;
    }
}
