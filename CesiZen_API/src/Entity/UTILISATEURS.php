<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\UTILISATEURSRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UTILISATEURSRepository::class)]
#[ApiResource]
class UTILISATEURS
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    private ?string $nom = null;

    #[ORM\Column(length: 100)]
    private ?string $prenom = null;

    #[ORM\Column(length: 100)]
    private ?string $pseudo = null;

    #[ORM\Column(length: 180)]
    private ?string $email = null;

    #[ORM\Column(length: 20)]
    private ?string $telephone = null;

    #[ORM\Column(length: 255)]
    private ?string $mot_de_passe = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $photo_profil = null;

    #[ORM\Column]
    private ?bool $est_actif = null;

    #[ORM\Column]
    private ?bool $email_verifie = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $date_derniere_connexion = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $created_at = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $updated_at = null;

    #[ORM\ManyToOne(inversedBy: 'utilisateurs')]
    #[ORM\JoinColumn(nullable: false)]
    private ?ROLES $role = null;

    /**
     * @var Collection<int, REINITIALISATIONSMDP>
     */
    #[ORM\OneToMany(targetEntity: REINITIALISATIONSMDP::class, mappedBy: 'utilisateur')]
    private Collection $reinitialisation_mdp;

    /**
     * @var Collection<int, REFRESHTOKEN>
     */
    #[ORM\OneToMany(targetEntity: REFRESHTOKEN::class, mappedBy: 'utilisateur')]
    private Collection $refresh_token;

    /**
     * @var Collection<int, RESSOURCES>
     */
    #[ORM\OneToMany(targetEntity: RESSOURCES::class, mappedBy: 'auteur')]
    private Collection $ressources;

    /**
     * @var Collection<int, ENTREEJOURNAL>
     */
    #[ORM\OneToMany(targetEntity: ENTREEJOURNAL::class, mappedBy: 'utilisateur')]
    private Collection $entreeJournals;

    public function __construct()
    {
        $this->reinitialisation_mdp = new ArrayCollection();
        $this->refresh_token = new ArrayCollection();
        $this->ressources = new ArrayCollection();
        $this->entreeJournals = new ArrayCollection();
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

    public function getPrenom(): ?string
    {
        return $this->prenom;
    }

    public function setPrenom(string $prenom): static
    {
        $this->prenom = $prenom;

        return $this;
    }

    public function getPseudo(): ?string
    {
        return $this->pseudo;
    }

    public function setPseudo(string $pseudo): static
    {
        $this->pseudo = $pseudo;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getTelephone(): ?string
    {
        return $this->telephone;
    }

    public function setTelephone(string $telephone): static
    {
        $this->telephone = $telephone;

        return $this;
    }

    public function getMotDePasse(): ?string
    {
        return $this->mot_de_passe;
    }

    public function setMotDePasse(string $mot_de_passe): static
    {
        $this->mot_de_passe = $mot_de_passe;

        return $this;
    }

    public function getPhotoProfil(): ?string
    {
        return $this->photo_profil;
    }

    public function setPhotoProfil(?string $photo_profil): static
    {
        $this->photo_profil = $photo_profil;

        return $this;
    }

    public function isEstActif(): ?bool
    {
        return $this->est_actif;
    }

    public function setEstActif(bool $est_actif): static
    {
        $this->est_actif = $est_actif;

        return $this;
    }

    public function isEmailVerifie(): ?bool
    {
        return $this->email_verifie;
    }

    public function setEmailVerifie(bool $email_verifie): static
    {
        $this->email_verifie = $email_verifie;

        return $this;
    }

    public function getDateDerniereConnexion(): ?\DateTimeImmutable
    {
        return $this->date_derniere_connexion;
    }

    public function setDateDerniereConnexion(?\DateTimeImmutable $date_derniere_connexion): static
    {
        $this->date_derniere_connexion = $date_derniere_connexion;

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

    public function getRole(): ?ROLES
    {
        return $this->role;
    }

    public function setRole(?ROLES $role): static
    {
        $this->role = $role;

        return $this;
    }

    /**
     * @return Collection<int, REINITIALISATIONSMDP>
     */
    public function getReinitialisationMdp(): Collection
    {
        return $this->reinitialisation_mdp;
    }

    public function addReinitialisationMdp(REINITIALISATIONSMDP $reinitialisationMdp): static
    {
        if (!$this->reinitialisation_mdp->contains($reinitialisationMdp)) {
            $this->reinitialisation_mdp->add($reinitialisationMdp);
            $reinitialisationMdp->setUtilisateur($this);
        }

        return $this;
    }

    public function removeReinitialisationMdp(REINITIALISATIONSMDP $reinitialisationMdp): static
    {
        if ($this->reinitialisation_mdp->removeElement($reinitialisationMdp)) {
            // set the owning side to null (unless already changed)
            if ($reinitialisationMdp->getUtilisateur() === $this) {
                $reinitialisationMdp->setUtilisateur(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, REFRESHTOKEN>
     */
    public function getRefreshToken(): Collection
    {
        return $this->refresh_token;
    }

    public function addRefreshToken(REFRESHTOKEN $refreshToken): static
    {
        if (!$this->refresh_token->contains($refreshToken)) {
            $this->refresh_token->add($refreshToken);
            $refreshToken->setUtilisateur($this);
        }

        return $this;
    }

    public function removeRefreshToken(REFRESHTOKEN $refreshToken): static
    {
        if ($this->refresh_token->removeElement($refreshToken)) {
            // set the owning side to null (unless already changed)
            if ($refreshToken->getUtilisateur() === $this) {
                $refreshToken->setUtilisateur(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, RESSOURCES>
     */
    public function getRessources(): Collection
    {
        return $this->ressources;
    }

    public function addRessource(RESSOURCES $ressource): static
    {
        if (!$this->ressources->contains($ressource)) {
            $this->ressources->add($ressource);
            $ressource->setAuteur($this);
        }

        return $this;
    }

    public function removeRessource(RESSOURCES $ressource): static
    {
        if ($this->ressources->removeElement($ressource)) {
            // set the owning side to null (unless already changed)
            if ($ressource->getAuteur() === $this) {
                $ressource->setAuteur(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, ENTREEJOURNAL>
     */
    public function getEntreeJournals(): Collection
    {
        return $this->entreeJournals;
    }

    public function addEntreeJournal(ENTREEJOURNAL $entreeJournal): static
    {
        if (!$this->entreeJournals->contains($entreeJournal)) {
            $this->entreeJournals->add($entreeJournal);
            $entreeJournal->setUtilisateur($this);
        }

        return $this;
    }

    public function removeEntreeJournal(ENTREEJOURNAL $entreeJournal): static
    {
        if ($this->entreeJournals->removeElement($entreeJournal)) {
            // set the owning side to null (unless already changed)
            if ($entreeJournal->getUtilisateur() === $this) {
                $entreeJournal->setUtilisateur(null);
            }
        }

        return $this;
    }
}
