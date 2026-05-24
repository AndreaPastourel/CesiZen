<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\TYPESRESSOURCESRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Delete;
use App\Controller\TypesRessourcesController;
use Symfony\Component\Serializer\Attribute\Groups;
use Symfony\Component\Serializer\Attribute\Ignore;


#[ORM\Entity(repositoryClass: TYPESRESSOURCESRepository::class)]
#[ApiResource(
    operations: [
       new GetCollection(
            uriTemplate: '/types-ressources',
            controller: \App\Controller\TypesRessourcesController::class,
            read: false,
            output: false,
            name: 'api_types_ressources_list'
        ),

        new Get(
            uriTemplate: '/types-ressources/{id}',
            controller: \App\Controller\TypeRessourceByIdController::class,
            read: false,
            output: false,
            name: 'api_type_ressource_by_id'
        ),

        new Post(
            uriTemplate: '/types-ressources',
            controller: \App\Controller\CreateTypeRessourceController::class,
            read: false,
            deserialize: false,
            output: false,
            name: 'api_types_ressources_create_custom'
        ),

        new Patch(
            uriTemplate: '/types-ressources/{id}',
            controller: \App\Controller\UpdateTypeRessourceController::class,
            read: false,
            deserialize: false,
            output: false,
            name: 'api_types_ressources_update_custom'
        ),

        new Delete(uriTemplate: '/types-ressources/{id}'),
    ]
)]
class TYPESRESSOURCES
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['ressource:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    #[Groups(['ressource:read'])]
    private ?string $code = null;

    #[ORM\Column(length: 100)]
    #[Groups(['ressource:read'])]
    private ?string $libelle = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['ressource:read'])]
    private ?string $description = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $created_at = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $updated_at = null;

    #[ORM\Column(length: 20, nullable: true)]
    #[Groups(['ressource:read'])]
    private ?string $couleur = null;

    /**
     * @var Collection<int, RESSOURCES>
     */
    #[ORM\OneToMany(targetEntity: RESSOURCES::class, mappedBy: 'type')]
    #[Ignore]
    private Collection $ressources;

    public function __construct()
    {
        $this->ressources = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCode(): ?string
    {
        return $this->code;
    }

    public function setCode(string $code): static
    {
        $this->code = $code;

        return $this;
    }

    public function getLibelle(): ?string
    {
        return $this->libelle;
    }

    public function setLibelle(string $libelle): static
    {
        $this->libelle = $libelle;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
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

    public function getCouleur(): ?string
    {
        return $this->couleur;
    }

    public function setCouleur(?string $couleur): static
    {
        $this->couleur = $couleur;

        return $this;
    }

    /**
     * @return Collection<int, RESSOURCES>
     */
    #[Ignore]
    public function getRessources(): Collection
    {
        return $this->ressources;
    }

    public function addRessource(RESSOURCES $ressource): static
    {
        if (!$this->ressources->contains($ressource)) {
            $this->ressources->add($ressource);
            $ressource->setType($this);
        }

        return $this;
    }

    public function removeRessource(RESSOURCES $ressource): static
    {
        if ($this->ressources->removeElement($ressource)) {
            // set the owning side to null (unless already changed)
            if ($ressource->getType() === $this) {
                $ressource->setType(null);
            }
        }

        return $this;
    }
}
