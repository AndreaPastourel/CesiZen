<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\EMOTIONSRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: EMOTIONSRepository::class)]
#[ApiResource]
class EMOTIONS
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    private ?string $nom = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    #[ORM\Column]
    private ?int $intensite_min = null;

    #[ORM\Column]
    private ?int $intensite_max = null;

    #[ORM\Column(length: 20, nullable: true)]
    private ?string $couleur = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $icone = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $created_at = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $updated_at = null;

    #[ORM\ManyToOne(inversedBy: 'emotions')]
    private ?TYPESEMOTION $type_emotion = null;

    /**
     * @var Collection<int, ENTREEJOURNAL>
     */
    #[ORM\OneToMany(targetEntity: ENTREEJOURNAL::class, mappedBy: 'emotion')]
    private Collection $entrees_journal;

    public function __construct()
    {
        $this->entrees_journal = new ArrayCollection();
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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getIntensiteMin(): ?int
    {
        return $this->intensite_min;
    }

    public function setIntensiteMin(int $intensite_min): static
    {
        $this->intensite_min = $intensite_min;

        return $this;
    }

    public function getIntensiteMax(): ?int
    {
        return $this->intensite_max;
    }

    public function setIntensiteMax(int $intensite_max): static
    {
        $this->intensite_max = $intensite_max;

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

    public function getIcone(): ?string
    {
        return $this->icone;
    }

    public function setIcone(?string $icone): static
    {
        $this->icone = $icone;

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

    public function getTypeEmotion(): ?TYPESEMOTION
    {
        return $this->type_emotion;
    }

    public function setTypeEmotion(?TYPESEMOTION $type_emotion): static
    {
        $this->type_emotion = $type_emotion;

        return $this;
    }

    /**
     * @return Collection<int, ENTREEJOURNAL>
     */
    public function getEntreesJournal(): Collection
    {
        return $this->entrees_journal;
    }

    public function addEntreesJournal(ENTREEJOURNAL $entreesJournal): static
    {
        if (!$this->entrees_journal->contains($entreesJournal)) {
            $this->entrees_journal->add($entreesJournal);
            $entreesJournal->setEmotion($this);
        }

        return $this;
    }

    public function removeEntreesJournal(ENTREEJOURNAL $entreesJournal): static
    {
        if ($this->entrees_journal->removeElement($entreesJournal)) {
            // set the owning side to null (unless already changed)
            if ($entreesJournal->getEmotion() === $this) {
                $entreesJournal->setEmotion(null);
            }
        }

        return $this;
    }
}

