<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\TYPESEMOTIONRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Delete;
use App\Controller\TypesEmotionsController;

#[ORM\Entity(repositoryClass: TYPESEMOTIONRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(uriTemplate: '/types-emotions',
            controller: TypesEmotionsController::class,
            read: false,
            output: false,
            name: 'api_types_emotions_list'),
        new Post(uriTemplate: '/types-emotions'),
        new Get(uriTemplate: '/types-emotions/{id}'),
        new Patch(uriTemplate: '/types-emotions{id}'),
        new Delete(uriTemplate: '/types-emotions/{id}'),
    ]
)]
class TYPESEMOTION
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    private ?string $nom = null;

    #[ORM\Column(length: 20, nullable: true)]
    private ?string $couleur = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $created_at = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $updated_at = null;

    /**
     * @var Collection<int, EMOTIONS>
     */
    #[ORM\OneToMany(targetEntity: EMOTIONS::class, mappedBy: 'type_emotion')]
    private Collection $emotions;

    public function __construct()
    {
        $this->emotions = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): static
    {
        $this->nom = $nom;

        return $this;
    }

    public function getCouleur(): ?string
    {
        return $this->couleur;
    }

    public function setCouleur(?string $couleur): static
    {
        $this->couleur = $couleur;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

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

    /**
     * @return Collection<int, EMOTIONS>
     */
    public function getEmotions(): Collection
    {
        return $this->emotions;
    }

    public function addEmotion(EMOTIONS $emotion): static
    {
        if (!$this->emotions->contains($emotion)) {
            $this->emotions->add($emotion);
            $emotion->setTypeEmotion($this);
        }

        return $this;
    }

    public function removeEmotion(EMOTIONS $emotion): static
    {
        if ($this->emotions->removeElement($emotion)) {
            // set the owning side to null (unless already changed)
            if ($emotion->getTypeEmotion() === $this) {
                $emotion->setTypeEmotion(null);
            }
        }

        return $this;
    }
}
