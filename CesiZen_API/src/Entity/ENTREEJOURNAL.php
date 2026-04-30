<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ENTREEJOURNALRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Delete;


#[ORM\Entity(repositoryClass: ENTREEJOURNALRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(uriTemplate: '/entree-journal'),
        new Post(uriTemplate: '/entree-journal'),
        new Get(uriTemplate: '/entree-journal/{id}'),
        new Patch(uriTemplate: '/entree-journal/{id}'),
        new Delete(uriTemplate: '/entree-journal/{id}'),
    ]
)]
class ENTREEJOURNAL
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $titre = null;

    #[ORM\Column(nullable: true)]
    private ?int $intensite = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $date_ressentie = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $created_at = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $updated_at = null;

    #[ORM\ManyToOne(inversedBy: 'entreeJournals')]
    #[ORM\JoinColumn(nullable: false)]
    private ?UTILISATEURS $utilisateur = null;

    #[ORM\ManyToOne(inversedBy: 'entrees_journal')]
    #[ORM\JoinColumn(nullable: false)]
    private ?EMOTIONS $emotion = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitre(): ?string
    {
        return $this->titre;
    }

    public function setTitre(?string $titre): static
    {
        $this->titre = $titre;

        return $this;
    }

    public function getIntensite(): ?int
    {
        return $this->intensite;
    }

    public function setIntensite(?int $intensite): static
    {
        $this->intensite = $intensite;

        return $this;
    }

    public function getDateRessentie(): ?\DateTimeImmutable
    {
        return $this->date_ressentie;
    }

    public function setDateRessentie(\DateTimeImmutable $date_ressentie): static
    {
        $this->date_ressentie = $date_ressentie;

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

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updated_at;
    }

    public function setUpdatedAt(?\DateTimeImmutable $updated_at): static
    {
        $this->updated_at = $updated_at;

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

    public function getEmotion(): ?EMOTIONS
    {
        return $this->emotion;
    }

    public function setEmotion(?EMOTIONS $emotion): static
    {
        $this->emotion = $emotion;

        return $this;
    }
}
