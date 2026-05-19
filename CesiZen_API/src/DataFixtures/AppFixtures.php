<?php

namespace App\DataFixtures;

use App\Entity\CATEGORIESRESSOURCES;
use App\Entity\EMOTIONS;
use App\Entity\ENTREEJOURNAL;
use App\Entity\RESSOURCES;
use App\Entity\ROLES;
use App\Entity\TYPESEMOTION;
use App\Entity\TYPESRESSOURCES;
use App\Entity\UTILISATEURS;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    public function __construct(
        private UserPasswordHasherInterface $passwordHasher
    ) {
    }

    public function load(ObjectManager $manager): void
    {
        /*
         * 1. Rôles
         */
        $rolesData = [
            ['code' => 'ROLE_USER', 'libelle' => 'Utilisateur', 'description' => 'Utilisateur classique de la plateforme.'],
            ['code' => 'ROLE_ADMIN', 'libelle' => 'Administrateur', 'description' => 'Administrateur de la plateforme.'],
        ];

        $roles = [];

        foreach ($rolesData as $roleData) {
            $role = new ROLES();
            $role->setCode($roleData['code']);
            $role->setLibelle($roleData['libelle']);
            $role->setDescription($roleData['description']);
            $role->setCreatedAt(new \DateTimeImmutable());
            $role->setUpdatedAt(new \DateTimeImmutable());

            $manager->persist($role);
            $roles[] = $role;
        }

        /*
         * 2. Utilisateurs
         */
        $utilisateurs = [];

        for ($i = 1; $i <= 10; $i++) {
            $utilisateur = new UTILISATEURS();

            $utilisateur->setNom('Nom' . $i);
            $utilisateur->setPrenom('Prenom' . $i);
            $utilisateur->setPseudo('user' . $i);
            $utilisateur->setEmail('user' . $i . '@cesizen.fr');
            $utilisateur->setTelephone('060000000' . $i);
            $utilisateur->setMotDePasse(
                $this->passwordHasher->hashPassword($utilisateur, 'Password123!')
            );
            $utilisateur->setPhotoProfil(null);
            $utilisateur->setEstActif(true);
            $utilisateur->setEmailVerifie(true);
            $utilisateur->setCreatedAt(new \DateTimeImmutable());
            $utilisateur->setUpdatedAt(new \DateTimeImmutable());

            if ($i === 1) {
                $utilisateur->setRoleEntity($roles[1]);
            } else {
                $utilisateur->setRoleEntity($roles[0]);
            }

            $manager->persist($utilisateur);
            $utilisateurs[] = $utilisateur;
        }

        /*
         * 3. Catégories de ressources
         */
        $categoriesData = [
            ['nom' => 'Gestion du stress', 'couleur' => '#7FA36B'],
            ['nom' => 'Sommeil', 'couleur' => '#6B8FA3'],
            ['nom' => 'Concentration', 'couleur' => '#D49A52'],
            ['nom' => 'Respiration', 'couleur' => '#87BFA3'],
            ['nom' => 'Organisation', 'couleur' => '#A3846B'],
            ['nom' => 'Bien-être mental', 'couleur' => '#9A7FA3'],
            ['nom' => 'Relaxation', 'couleur' => '#7F9FA3'],
            ['nom' => 'Motivation', 'couleur' => '#D4B052'],
            ['nom' => 'Vie étudiante', 'couleur' => '#8CA36B'],
            ['nom' => 'Prévention', 'couleur' => '#C96B6B'],
        ];

        $categories = [];

        foreach ($categoriesData as $categorieData) {
            $categorie = new CATEGORIESRESSOURCES();
            $categorie->setNom($categorieData['nom']);
            $categorie->setCouleur($categorieData['couleur']);
            $categorie->setDescription('Catégorie liée à ' . strtolower($categorieData['nom']) . '.');
            $categorie->setCreatedAt(new \DateTimeImmutable());
            $categorie->setUpdatedAt(new \DateTimeImmutable());

            $manager->persist($categorie);
            $categories[] = $categorie;
        }

        /*
         * 4. Types de ressources
         */
        $typesRessourcesData = [
            ['code' => 'ARTICLE', 'libelle' => 'Article', 'couleur' => '#7FA36B'],
            ['code' => 'VIDEO', 'libelle' => 'Vidéo', 'couleur' => '#6B8FA3'],
            ['code' => 'AUDIO', 'libelle' => 'Audio', 'couleur' => '#D49A52'],
            ['code' => 'EXERCICE', 'libelle' => 'Exercice', 'couleur' => '#87BFA3'],
            ['code' => 'FICHE', 'libelle' => 'Fiche pratique', 'couleur' => '#A3846B'],
            ['code' => 'GUIDE', 'libelle' => 'Guide', 'couleur' => '#9A7FA3'],
            ['code' => 'PODCAST', 'libelle' => 'Podcast', 'couleur' => '#7F9FA3'],
            ['code' => 'INFOGRAPHIE', 'libelle' => 'Infographie', 'couleur' => '#D4B052'],
            ['code' => 'QUESTIONNAIRE', 'libelle' => 'Questionnaire', 'couleur' => '#8CA36B'],
            ['code' => 'MEDITATION', 'libelle' => 'Méditation guidée', 'couleur' => '#C96B6B'],
        ];

        $typesRessources = [];

        foreach ($typesRessourcesData as $typeData) {
            $type = new TYPESRESSOURCES();
            $type->setCode($typeData['code']);
            $type->setLibelle($typeData['libelle']);
            $type->setCouleur($typeData['couleur']);
            $type->setDescription('Type de ressource : ' . strtolower($typeData['libelle']) . '.');
            $type->setCreatedAt(new \DateTimeImmutable());
            $type->setUpdatedAt(new \DateTimeImmutable());

            $manager->persist($type);
            $typesRessources[] = $type;
        }

        /*
         * 5. Types d’émotion
         */
        $typesEmotionData = [
            ['nom' => 'Émotion positive', 'couleur' => '#7FA36B'],
            ['nom' => 'Émotion négative', 'couleur' => '#C96B6B'],
            ['nom' => 'Émotion neutre', 'couleur' => '#A3846B'],
            ['nom' => 'Émotion intense', 'couleur' => '#D49A52'],
            ['nom' => 'Émotion calme', 'couleur' => '#6B8FA3'],
            ['nom' => 'Émotion sociale', 'couleur' => '#9A7FA3'],
            ['nom' => 'Émotion liée au stress', 'couleur' => '#D4B052'],
            ['nom' => 'Émotion liée à la fatigue', 'couleur' => '#7F9FA3'],
            ['nom' => 'Émotion liée à la motivation', 'couleur' => '#8CA36B'],
            ['nom' => 'Émotion mixte', 'couleur' => '#B58B73'],
        ];

        $typesEmotion = [];

        foreach ($typesEmotionData as $typeEmotionData) {
            $typeEmotion = new TYPESEMOTION();
            $typeEmotion->setNom($typeEmotionData['nom']);
            $typeEmotion->setCouleur($typeEmotionData['couleur']);
            $typeEmotion->setDescription('Type utilisé pour classer les émotions.');
            $typeEmotion->setCreatedAt(new \DateTimeImmutable());
            $typeEmotion->setUpdatedAt(new \DateTimeImmutable());

            $manager->persist($typeEmotion);
            $typesEmotion[] = $typeEmotion;
        }

        /*
         * 6. Émotions
         */
        $emotionsData = [
            ['nom' => 'Joie', 'icone' => 'smile', 'intensite_min' => 1, 'intensite_max' => 5],
            ['nom' => 'Sérénité', 'icone' => 'leaf', 'intensite_min' => 1, 'intensite_max' => 5],
            ['nom' => 'Stress', 'icone' => 'alert-circle', 'intensite_min' => 1, 'intensite_max' => 5],
            ['nom' => 'Tristesse', 'icone' => 'cloud-rain', 'intensite_min' => 1, 'intensite_max' => 5],
            ['nom' => 'Colère', 'icone' => 'flame', 'intensite_min' => 1, 'intensite_max' => 5],
            ['nom' => 'Fatigue', 'icone' => 'moon', 'intensite_min' => 1, 'intensite_max' => 5],
            ['nom' => 'Motivation', 'icone' => 'star', 'intensite_min' => 1, 'intensite_max' => 5],
            ['nom' => 'Anxiété', 'icone' => 'wind', 'intensite_min' => 1, 'intensite_max' => 5],
            ['nom' => 'Fierté', 'icone' => 'award', 'intensite_min' => 1, 'intensite_max' => 5],
            ['nom' => 'Découragement', 'icone' => 'cloud', 'intensite_min' => 1, 'intensite_max' => 5],
        ];

        $emotions = [];

        foreach ($emotionsData as $index => $emotionData) {
            $emotion = new EMOTIONS();
            $emotion->setNom($emotionData['nom']);
            $emotion->setIcone($emotionData['icone']);
            $emotion->setCouleur($typesEmotion[$index]->getCouleur());
            $emotion->setDescription('Émotion utilisée dans le journal de bord CESI Zen.');
            $emotion->setIntensiteMin($emotionData['intensite_min']);
            $emotion->setIntensiteMax($emotionData['intensite_max']);
            $emotion->setTypeEmotion($typesEmotion[$index]);
            $emotion->setCreatedAt(new \DateTimeImmutable());
            $emotion->setUpdatedAt(new \DateTimeImmutable());

            $manager->persist($emotion);
            $emotions[] = $emotion;
        }

        /*
         * 7. Ressources
         */
        for ($i = 1; $i <= 10; $i++) {
            $ressource = new RESSOURCES();

            $ressource->setTitre('Ressource test ' . $i);
            $ressource->setSlug('ressource-test-' . $i);
            $ressource->setResume('Résumé de la ressource test numéro ' . $i . '.');
            $ressource->setContenuTexte('Ceci est le contenu complet de la ressource test numéro ' . $i . '. Cette ressource permet de tester l’affichage, la consultation et les détails côté front.');
            $ressource->setCheminMedia(null);
            $ressource->setNomFichier(null);
            $ressource->setTailleFichierKo(null);
            $ressource->setDureeSeconde(null);
            $ressource->setLargeurPx(null);
            $ressource->setHauteurPx(null);
            $ressource->setEstActif(true);
            $ressource->setDatePublication(new \DateTimeImmutable());
            $ressource->setCreatedAt(new \DateTimeImmutable());
            $ressource->setUpdatedAt(new \DateTimeImmutable());
            $ressource->setAuteur($utilisateurs[$i - 1]);
            $ressource->setCategorie($categories[$i - 1]);
            $ressource->setType($typesRessources[$i - 1]);

            $manager->persist($ressource);
        }

        /*
         * 8. Entrées de journal
         */
        for ($i = 1; $i <= 10; $i++) {
            $entree = new ENTREEJOURNAL();

            $entree->setTitre('Entrée journal test ' . $i);
            $entree->setDateRessentie(new \DateTimeImmutable('-' . $i . ' days'));
            $entree->setIntensite(($i % 5) + 1);
            $entree->setUtilisateur($utilisateurs[$i - 1]);
            $entree->setEmotion($emotions[$i - 1]);
            $entree->setCreatedAt(new \DateTimeImmutable());
            $entree->setUpdatedAt(new \DateTimeImmutable());

            $manager->persist($entree);
        }

        $manager->flush();
    }
}