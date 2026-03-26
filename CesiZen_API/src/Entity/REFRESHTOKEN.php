<?php

namespace App\Entity;

use App\Repository\REFRESHTOKENRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: REFRESHTOKENRepository::class)]
class REFRESHTOKEN
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $token = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $date_creation = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $date_expiration = null;

    #[ORM\Column]
    private ?bool $est_revoque = null;

    #[ORM\ManyToOne(inversedBy: 'refresh_token')]
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

    public function getDateCreation(): ?\DateTimeImmutable
    {
        return $this->date_creation;
    }

    public function setDateCreation(\DateTimeImmutable $date_creation): static
    {
        $this->date_creation = $date_creation;

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

    public function isEstRevoque(): ?bool
    {
        return $this->est_revoque;
    }

    public function setEstRevoque(bool $est_revoque): static
    {
        $this->est_revoque = $est_revoque;

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
