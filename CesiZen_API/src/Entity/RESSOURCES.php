<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\RESSOURCESRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Delete;
use App\Controller\CreateRessourceController;
use App\Controller\RessourceByIdController;
use App\Controller\RessourceBySlugController;
use App\Controller\RessourcesListController;
use App\Controller\UpdateRessourceActiveController;
use App\Controller\UpdateRessourceController;
use Symfony\Component\Serializer\Attribute\Groups;



#[ORM\Entity(repositoryClass: RESSOURCESRepository::class)]
#[ApiResource(
    operations: [
     new GetCollection(
        uriTemplate: '/ressources',
        controller: RessourcesListController::class,
        read: false,
        output: false,
        name: 'api_ressources_list'
    ),

    new Get(
        uriTemplate: '/ressource/{slug}',
        controller: RessourceBySlugController::class,
        read: false,
        output: false,
        name: 'api_ressource_by_slug'
    ),

    new Get(
        uriTemplate: '/ressource/id/{id}',
        controller: RessourceByIdController::class,
        read: false,
        output: false,
        name: 'api_ressource_by_id'
    ),

    new Post(
        uriTemplate: '/ressource',
        controller: CreateRessourceController::class,
        read: false,
        deserialize: false,
        output: false,
        inputFormats: [
            'multipart' => ['multipart/form-data'],
        ],
        name: 'api_ressources_create_custom'
    ),

    new Patch(
    uriTemplate: '/ressource/{id}/active',
    controller: UpdateRessourceActiveController::class,
    read: false,
    deserialize: false,
    output: false,
    name: 'api_ressource_update_active'
),

new Post(
    uriTemplate: '/ressource/{id}',
    controller: UpdateRessourceController::class,
    read: false,
    deserialize: false,
    output: false,
    inputFormats: [
        'multipart' => ['multipart/form-data'],
    ],
    name: 'api_ressource_update_custom'
),
    new Delete(uriTemplate: '/ressource/{id}'),
],
)]



class RESSOURCES
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['ressource:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['ressource:read', 'ressource:write'])]
    private ?string $titre = null;

    #[ORM\Column(length: 255)]
    #[Groups(['ressource:read', 'ressource:write'])]
    private ?string $slug = null;

    #[ORM\Column(length: 255)]
    #[Groups(['ressource:read', 'ressource:write'])]
    private ?string $resume = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['ressource:read', 'ressource:write'])]
    private ?string $contenu_texte = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['ressource:read', 'ressource:write'])]
    private ?string $chemin_media = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['ressource:read', 'ressource:write'])]
    private ?string $nom_fichier = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['ressource:read', 'ressource:write'])]
    private ?int $taille_fichier_ko = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['ressource:read', 'ressource:write'])]
    private ?int $duree_seconde = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['ressource:read', 'ressource:write'])]
    private ?int $largeur_px = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['ressource:read', 'ressource:write'])]
    private ?int $hauteur_px = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['ressource:read', 'ressource:write'])]
    private ?bool $est_actif = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['ressource:read', 'ressource:write'])]
    private ?\DateTimeImmutable $date_publication = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['ressource:read'])]
    private ?\DateTimeImmutable $created_at = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['ressource:read'])]
    private ?\DateTimeImmutable $updated_at = null;

   #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['ressource:read', 'ressource:write'])]
    private ?UTILISATEURS $auteur = null;

    #[ORM\ManyToOne]
    #[Groups(['ressource:read', 'ressource:write'])]
    private ?CATEGORIESRESSOURCES $categorie = null;

    #[ORM\ManyToOne]
    #[Groups(['ressource:read', 'ressource:write'])]
    private ?TYPESRESSOURCES $type = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitre(): ?string
    {
        return $this->titre;
    }

    public function setTitre(string $titre): static
    {
        $this->titre = $titre;

        return $this;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): static
    {
        $this->slug = $slug;

        return $this;
    }

    public function getResume(): ?string
    {
        return $this->resume;
    }

    public function setResume(string $resume): static
    {
        $this->resume = $resume;

        return $this;
    }

    public function getContenuTexte(): ?string
    {
        return $this->contenu_texte;
    }

    public function setContenuTexte(?string $contenu_texte): static
    {
        $this->contenu_texte = $contenu_texte;

        return $this;
    }

    public function getCheminMedia(): ?string
    {
        return $this->chemin_media;
    }

    public function setCheminMedia(?string $chemin_media): static
    {
        $this->chemin_media = $chemin_media;

        return $this;
    }

    public function getNomFichier(): ?string
    {
        return $this->nom_fichier;
    }

    public function setNomFichier(?string $nom_fichier): static
    {
        $this->nom_fichier = $nom_fichier;

        return $this;
    }

    public function getTailleFichierKo(): ?int
    {
        return $this->taille_fichier_ko;
    }

    public function setTailleFichierKo(?int $taille_fichier_ko): static
    {
        $this->taille_fichier_ko = $taille_fichier_ko;

        return $this;
    }

    public function getDureeSeconde(): ?int
    {
        return $this->duree_seconde;
    }

    public function setDureeSeconde(?int $duree_seconde): static
    {
        $this->duree_seconde = $duree_seconde;

        return $this;
    }

    public function getLargeurPx(): ?int
    {
        return $this->largeur_px;
    }

    public function setLargeurPx(?int $largeur_px): static
    {
        $this->largeur_px = $largeur_px;

        return $this;
    }

    public function getHauteurPx(): ?int
    {
        return $this->hauteur_px;
    }

    public function setHauteurPx(?int $hauteur_px): static
    {
        $this->hauteur_px = $hauteur_px;

        return $this;
    }

    public function isEstActif(): ?bool
    {
        return $this->est_actif;
    }

    public function setEstActif(?bool $est_actif): static
    {
        $this->est_actif = $est_actif;

        return $this;
    }

    public function getDatePublication(): ?\DateTimeImmutable
    {
        return $this->date_publication;
    }

    public function setDatePublication(?\DateTimeImmutable $date_publication): static
    {
        $this->date_publication = $date_publication;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->created_at;
    }

    public function setCreatedAt(?\DateTimeImmutable $created_at): static
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

    public function getAuteur(): ?UTILISATEURS
    {
        return $this->auteur;
    }

    public function setAuteur(?UTILISATEURS $auteur): static
    {
        $this->auteur = $auteur;

        return $this;
    }

    public function getCategorie(): ?CATEGORIESRESSOURCES
    {
        return $this->categorie;
    }

    public function setCategorie(?CATEGORIESRESSOURCES $categorie): static
    {
        $this->categorie = $categorie;

        return $this;
    }

    public function getType(): ?TYPESRESSOURCES
    {
        return $this->type;
    }

    public function setType(?TYPESRESSOURCES $type): static
    {
        $this->type = $type;

        return $this;
    }
}