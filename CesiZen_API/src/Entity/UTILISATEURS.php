<?php

namespace App\Entity;

use App\Repository\UTILISATEURSRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;

#[ORM\Entity(repositoryClass: UTILISATEURSRepository::class)]



class UTILISATEURS implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    private ?string $nom = null;

    #[ORM\Column(length: 100)]
    private ?string $prenom = null;

    #[ORM\Column(length: 100, unique: true)]
    private ?string $pseudo = null;

    #[ORM\Column(length: 180, unique: true)]
    private ?string $email = null;

    #[ORM\Column(length: 20, nullable: true)]
    private ?string $telephone = null;

    #[ORM\Column(length: 255)]
    private ?string $motDePasse = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $photoProfil = null;

    #[ORM\Column]
    private ?bool $estActif = true;

    #[ORM\Column]
    private ?bool $emailVerifie = false;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $dateDerniereConnexion = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $updatedAt = null;

    #[ORM\ManyToOne(inversedBy: 'utilisateurs')]
    #[ORM\JoinColumn(nullable: false)]
    private ?ROLES $role = null;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
        $this->estActif = true;
        $this->emailVerifie = false;
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

    public function setTelephone(?string $telephone): static
    {
        $this->telephone = $telephone;
        return $this;
    }

    public function getPhotoProfil(): ?string
    {
        return $this->photoProfil;
    }

    public function setPhotoProfil(?string $photoProfil): static
    {
        $this->photoProfil = $photoProfil;
        return $this;
    }

    public function isEstActif(): ?bool
    {
        return $this->estActif;
    }

    public function setEstActif(bool $estActif): static
    {
        $this->estActif = $estActif;
        return $this;
    }

    public function isEmailVerifie(): ?bool
    {
        return $this->emailVerifie;
    }

    public function setEmailVerifie(bool $emailVerifie): static
    {
        $this->emailVerifie = $emailVerifie;
        return $this;
    }

    public function getDateDerniereConnexion(): ?\DateTimeImmutable
    {
        return $this->dateDerniereConnexion;
    }

    public function setDateDerniereConnexion(?\DateTimeImmutable $dateDerniereConnexion): static
    {
        $this->dateDerniereConnexion = $dateDerniereConnexion;
        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;
        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeImmutable $updatedAt): static
    {
        $this->updatedAt = $updatedAt;
        return $this;
    }

    public function getRoleEntity(): ?ROLES
    {
        return $this->role;
    }

    public function setRoleEntity(?ROLES $role): static
    {
        $this->role = $role;
        return $this;
    }

    public function getUserIdentifier(): string
    {
        return $this->email ?? '';
    }

    public function getRoles(): array
    {
        $roles = [];

        if ($this->role && $this->role->getCode()) {
            $roles[] = $this->role->getCode();
        }

        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function getPassword(): string
    {
        return $this->motDePasse ?? '';
    }

    public function setMotDePasse(string $motDePasse): static
    {
        $this->motDePasse = $motDePasse;
        return $this;
    }

    public function eraseCredentials(): void
    {
        // Cette méthode est vide par design car les données sensibles (mot de passe haché)
        // sont gérées par Symfony's PasswordHasher et ne doivent pas être effacées de l'entity
    }
}
