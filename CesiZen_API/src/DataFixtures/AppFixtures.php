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
            [
                'code' => 'ROLE_USER',
                'libelle' => 'Utilisateur',
                'description' => 'Utilisateur classique de la plateforme CESI Zen.',
            ],
            [
                'code' => 'ROLE_ADMIN',
                'libelle' => 'Administrateur',
                'description' => 'Administrateur chargé de gérer les contenus, les utilisateurs et les référentiels.',
            ],
        ];

        $roles = [];

        foreach ($rolesData as $roleData) {
            $role = new ROLES();
            $role->setCode($roleData['code']);
            $role->setLibelle($roleData['libelle']);
            $role->setDescription($roleData['description']);
            $role->setCreatedAt(new \DateTimeImmutable('-6 months'));
            $role->setUpdatedAt(new \DateTimeImmutable('-1 month'));

            $manager->persist($role);
            $roles[$roleData['code']] = $role;
        }

        /*
         * 2. Utilisateurs
         *
         * Mot de passe commun :
         * Password123!
         */
        $utilisateursData = [
            [
                'nom' => 'Admin',
                'prenom' => 'CESI',
                'pseudo' => 'admin',
                'email' => 'admin@cesizen.fr',
                'telephone' => '0600000001',
                'role' => 'ROLE_ADMIN',
                'estActif' => true,
                'emailVerifie' => true,
                'dateDerniereConnexion' => new \DateTimeImmutable('-2 days'),
                'dateAlerteInactivite' => null,
            ],
            [
                'nom' => 'Martin',
                'prenom' => 'Alice',
                'pseudo' => 'alice',
                'email' => 'alice@cesizen.fr',
                'telephone' => '0600000002',
                'role' => 'ROLE_USER',
                'estActif' => true,
                'emailVerifie' => true,
                'dateDerniereConnexion' => new \DateTimeImmutable('-1 day'),
                'dateAlerteInactivite' => null,
            ],
            [
                'nom' => 'Bernard',
                'prenom' => 'Lucas',
                'pseudo' => 'lucas',
                'email' => 'lucas@cesizen.fr',
                'telephone' => '0600000003',
                'role' => 'ROLE_USER',
                'estActif' => true,
                'emailVerifie' => true,
                'dateDerniereConnexion' => new \DateTimeImmutable('-15 days'),
                'dateAlerteInactivite' => null,
            ],
            [
                'nom' => 'Petit',
                'prenom' => 'Emma',
                'pseudo' => 'emma',
                'email' => 'emma@cesizen.fr',
                'telephone' => '0600000004',
                'role' => 'ROLE_USER',
                'estActif' => true,
                'emailVerifie' => true,
                'dateDerniereConnexion' => new \DateTimeImmutable('-75 days'),
                'dateAlerteInactivite' => null,
            ],
            [
                'nom' => 'Robert',
                'prenom' => 'Hugo',
                'pseudo' => 'hugo',
                'email' => 'hugo@cesizen.fr',
                'telephone' => '0600000005',
                'role' => 'ROLE_USER',
                'estActif' => true,
                'emailVerifie' => true,
                'dateDerniereConnexion' => new \DateTimeImmutable('-80 days'),
                'dateAlerteInactivite' => new \DateTimeImmutable('-5 days'),
            ],
            [
                'nom' => 'Moreau',
                'prenom' => 'Chloé',
                'pseudo' => 'chloe',
                'email' => 'chloe@cesizen.fr',
                'telephone' => '0600000006',
                'role' => 'ROLE_USER',
                'estActif' => true,
                'emailVerifie' => true,
                'dateDerniereConnexion' => new \DateTimeImmutable('-100 days'),
                'dateAlerteInactivite' => new \DateTimeImmutable('-30 days'),
            ],
            [
                'nom' => 'Simon',
                'prenom' => 'Noah',
                'pseudo' => 'noah',
                'email' => 'noah@cesizen.fr',
                'telephone' => '0600000007',
                'role' => 'ROLE_USER',
                'estActif' => false,
                'emailVerifie' => true,
                'dateDerniereConnexion' => new \DateTimeImmutable('-120 days'),
                'dateAlerteInactivite' => new \DateTimeImmutable('-45 days'),
            ],
            [
                'nom' => 'Laurent',
                'prenom' => 'Lina',
                'pseudo' => 'lina',
                'email' => 'lina@cesizen.fr',
                'telephone' => '0600000008',
                'role' => 'ROLE_USER',
                'estActif' => true,
                'emailVerifie' => false,
                'dateDerniereConnexion' => null,
                'dateAlerteInactivite' => null,
            ],
            [
                'nom' => 'Lefevre',
                'prenom' => 'Nathan',
                'pseudo' => 'nathan',
                'email' => 'nathan@cesizen.fr',
                'telephone' => '0600000009',
                'role' => 'ROLE_USER',
                'estActif' => true,
                'emailVerifie' => true,
                'dateDerniereConnexion' => new \DateTimeImmutable('-7 days'),
                'dateAlerteInactivite' => null,
            ],
            [
                'nom' => 'Garcia',
                'prenom' => 'Manon',
                'pseudo' => 'manon',
                'email' => 'manon@cesizen.fr',
                'telephone' => '0600000010',
                'role' => 'ROLE_USER',
                'estActif' => true,
                'emailVerifie' => true,
                'dateDerniereConnexion' => new \DateTimeImmutable('-30 days'),
                'dateAlerteInactivite' => null,
            ],
        ];

        $utilisateurs = [];

        foreach ($utilisateursData as $utilisateurData) {
            $utilisateur = new UTILISATEURS();

            $utilisateur->setNom($utilisateurData['nom']);
            $utilisateur->setPrenom($utilisateurData['prenom']);
            $utilisateur->setPseudo($utilisateurData['pseudo']);
            $utilisateur->setEmail($utilisateurData['email']);
            $utilisateur->setTelephone($utilisateurData['telephone']);
            $utilisateur->setMotDePasse(
                $this->passwordHasher->hashPassword($utilisateur, 'Password123!')
            );
            $utilisateur->setPhotoProfil(null);
            $utilisateur->setEstActif($utilisateurData['estActif']);
            $utilisateur->setEmailVerifie($utilisateurData['emailVerifie']);
            $utilisateur->setDateDerniereConnexion($utilisateurData['dateDerniereConnexion']);
            $utilisateur->setDateAlerteInactivite($utilisateurData['dateAlerteInactivite']);
            $utilisateur->setCreatedAt(new \DateTimeImmutable('-6 months'));
            $utilisateur->setUpdatedAt(new \DateTimeImmutable('-1 week'));
            $utilisateur->setRoleEntity($roles[$utilisateurData['role']]);

            $manager->persist($utilisateur);
            $utilisateurs[] = $utilisateur;
        }

        /*
         * 3. Catégories de ressources
         */
        $categoriesData = [
            [
                'nom' => 'Santé mentale',
                'couleur' => '#7FA36B',
                'description' => 'Contenus généraux autour de la santé mentale et de la prévention.',
            ],
            [
                'nom' => 'Gestion du stress',
                'couleur' => '#C96B6B',
                'description' => 'Conseils et ressources pour comprendre et réduire le stress.',
            ],
            [
                'nom' => 'Respiration',
                'couleur' => '#6B8FA3',
                'description' => 'Exercices de respiration et de cohérence cardiaque.',
            ],
            [
                'nom' => 'Sommeil',
                'couleur' => '#9A7FA3',
                'description' => 'Ressources pour améliorer la qualité du sommeil.',
            ],
            [
                'nom' => 'Organisation',
                'couleur' => '#D49A52',
                'description' => 'Conseils pour mieux organiser son quotidien et limiter la surcharge mentale.',
            ],
            [
                'nom' => 'Vie étudiante',
                'couleur' => '#8CA36B',
                'description' => 'Ressources adaptées au public étudiant.',
            ],
            [
                'nom' => 'Prévention',
                'couleur' => '#B58B73',
                'description' => 'Informations de prévention et bonnes pratiques.',
            ],
            [
                'nom' => 'Relaxation',
                'couleur' => '#87BFA3',
                'description' => 'Activités détente et relaxation.',
            ],
        ];

        $categories = [];

        foreach ($categoriesData as $categorieData) {
            $categorie = new CATEGORIESRESSOURCES();
            $categorie->setNom($categorieData['nom']);
            $categorie->setCouleur($categorieData['couleur']);
            $categorie->setDescription($categorieData['description']);
            $categorie->setCreatedAt(new \DateTimeImmutable('-5 months'));
            $categorie->setUpdatedAt(new \DateTimeImmutable('-2 weeks'));

            $manager->persist($categorie);
            $categories[] = $categorie;
        }

        /*
         * 4. Types de ressources
         */
        $typesRessourcesData = [
            [
                'code' => 'ARTICLE',
                'libelle' => 'Article',
                'couleur' => '#7FA36B',
                'description' => 'Contenu textuel informatif.',
            ],
            [
                'code' => 'GUIDE',
                'libelle' => 'Guide',
                'couleur' => '#6B8FA3',
                'description' => 'Guide pratique structuré.',
            ],
            [
                'code' => 'EXERCICE',
                'libelle' => 'Exercice',
                'couleur' => '#D49A52',
                'description' => 'Exercice guidé à réaliser par l’utilisateur.',
            ],
            [
                'code' => 'VIDEO',
                'libelle' => 'Vidéo',
                'couleur' => '#C96B6B',
                'description' => 'Ressource vidéo.',
            ],
            [
                'code' => 'AUDIO',
                'libelle' => 'Audio',
                'couleur' => '#9A7FA3',
                'description' => 'Ressource audio ou méditation guidée.',
            ],
            [
                'code' => 'FICHE',
                'libelle' => 'Fiche pratique',
                'couleur' => '#87BFA3',
                'description' => 'Fiche synthétique.',
            ],
            [
                'code' => 'INFOGRAPHIE',
                'libelle' => 'Infographie',
                'couleur' => '#D4B052',
                'description' => 'Support visuel ou image informative.',
            ],
        ];

        $typesRessources = [];

        foreach ($typesRessourcesData as $typeData) {
            $type = new TYPESRESSOURCES();
            $type->setCode($typeData['code']);
            $type->setLibelle($typeData['libelle']);
            $type->setCouleur($typeData['couleur']);
            $type->setDescription($typeData['description']);
            $type->setCreatedAt(new \DateTimeImmutable('-5 months'));
            $type->setUpdatedAt(new \DateTimeImmutable('-2 weeks'));

            $manager->persist($type);
            $typesRessources[] = $type;
        }

        /*
         * 5. Types d’émotions de base
         */
        $typesEmotionData = [
    [
        'nom' => 'Joie',
        'couleur' => '#7FA36B',
        'description' => 'Émotion de base positive associée au bien-être, au plaisir et à la satisfaction.',
    ],
    [
        'nom' => 'Colère',
        'couleur' => '#C96B6B',
        'description' => 'Émotion de base liée à la frustration, à l’agacement ou à l’opposition.',
    ],
    [
        'nom' => 'Peur',
        'couleur' => '#6B8FA3',
        'description' => 'Émotion de base liée au danger perçu, à l’inquiétude ou à l’anxiété.',
    ],
    [
        'nom' => 'Tristesse',
        'couleur' => '#A3846B',
        'description' => 'Émotion de base liée à la perte, au chagrin ou au découragement.',
    ],
    [
        'nom' => 'Surprise',
        'couleur' => '#D4B052',
        'description' => 'Émotion de base liée à un événement inattendu.',
    ],
    [
        'nom' => 'Dégoût',
        'couleur' => '#9A7FA3',
        'description' => 'Émotion de base liée au rejet, à la répulsion ou au déplaisir.',
    ],
];

$typesEmotion = [];

foreach ($typesEmotionData as $typeEmotionData) {
    $typeEmotion = new TYPESEMOTION();
    $typeEmotion->setNom($typeEmotionData['nom']);
    $typeEmotion->setCouleur($typeEmotionData['couleur']);
    $typeEmotion->setDescription($typeEmotionData['description']);
    $typeEmotion->setCreatedAt(new \DateTimeImmutable('-5 months'));
    $typeEmotion->setUpdatedAt(new \DateTimeImmutable('-2 weeks'));

    $manager->persist($typeEmotion);
    $typesEmotion[$typeEmotionData['nom']] = $typeEmotion;
}

/*
 * 6. Émotions niveau 2

 */
$emotionsData = [
    'Joie' => [
        ['nom' => 'Contentement', 'icone' => 'smile', 'intensite_min' => 1, 'intensite_max' => 2],
        ['nom' => 'Gratitude', 'icone' => 'heart', 'intensite_min' => 2, 'intensite_max' => 3],
        ['nom' => 'Fierté', 'icone' => 'award', 'intensite_min' => 3, 'intensite_max' => 5],
        ['nom' => 'Enchantement', 'icone' => 'sparkles', 'intensite_min' => 5, 'intensite_max' => 7],
        ['nom' => 'Excitation', 'icone' => 'zap', 'intensite_min' => 7, 'intensite_max' => 9],
        ['nom' => 'Émerveillement', 'icone' => 'star', 'intensite_min' => 9, 'intensite_max' => 10],
    ],

    'Colère' => [
        ['nom' => 'Agacement', 'icone' => 'annoyed', 'intensite_min' => 1, 'intensite_max' => 2],
        ['nom' => 'Irritation', 'icone' => 'frown', 'intensite_min' => 2, 'intensite_max' => 4],
        ['nom' => 'Frustration', 'icone' => 'alert-triangle', 'intensite_min' => 4, 'intensite_max' => 6],
        ['nom' => 'Ressentiment', 'icone' => 'cloud-lightning', 'intensite_min' => 6, 'intensite_max' => 8],
        ['nom' => 'Hostilité', 'icone' => 'shield-alert', 'intensite_min' => 8, 'intensite_max' => 9],
        ['nom' => 'Rage', 'icone' => 'flame', 'intensite_min' => 9, 'intensite_max' => 10],
    ],

    'Peur' => [
        ['nom' => 'Crainte', 'icone' => 'alert-circle', 'intensite_min' => 1, 'intensite_max' => 2],
        ['nom' => 'Inquiétude', 'icone' => 'help-circle', 'intensite_min' => 2, 'intensite_max' => 4],
        ['nom' => 'Appréhension', 'icone' => 'eye', 'intensite_min' => 4, 'intensite_max' => 6],
        ['nom' => 'Anxiété', 'icone' => 'wind', 'intensite_min' => 6, 'intensite_max' => 8],
        ['nom' => 'Panique', 'icone' => 'alarm-clock', 'intensite_min' => 8, 'intensite_max' => 9],
        ['nom' => 'Terreur', 'icone' => 'siren', 'intensite_min' => 9, 'intensite_max' => 10],
    ],

    'Tristesse' => [
        ['nom' => 'Mélancolie', 'icone' => 'cloud', 'intensite_min' => 1, 'intensite_max' => 2],
        ['nom' => 'Solitude', 'icone' => 'user-x', 'intensite_min' => 2, 'intensite_max' => 4],
        ['nom' => 'Chagrin', 'icone' => 'cloud-rain', 'intensite_min' => 4, 'intensite_max' => 6],
        ['nom' => 'Abattement', 'icone' => 'battery-low', 'intensite_min' => 6, 'intensite_max' => 8],
        ['nom' => 'Désespoir', 'icone' => 'moon', 'intensite_min' => 8, 'intensite_max' => 9],
        ['nom' => 'Dépression', 'icone' => 'cloud-drizzle', 'intensite_min' => 9, 'intensite_max' => 10],
    ],

    'Surprise' => [
        ['nom' => 'Étonnement', 'icone' => 'circle-help', 'intensite_min' => 1, 'intensite_max' => 2],
        ['nom' => 'Incrédule', 'icone' => 'message-circle-question', 'intensite_min' => 2, 'intensite_max' => 4],
        ['nom' => 'Confusion', 'icone' => 'shuffle', 'intensite_min' => 4, 'intensite_max' => 6],
        ['nom' => 'Stupéfaction', 'icone' => 'badge-alert', 'intensite_min' => 6, 'intensite_max' => 8],
        ['nom' => 'Sidération', 'icone' => 'pause-circle', 'intensite_min' => 8, 'intensite_max' => 9],
        ['nom' => 'Émerveillement surpris', 'icone' => 'stars', 'intensite_min' => 9, 'intensite_max' => 10],
    ],

    'Dégoût' => [
        ['nom' => 'Déplaisir', 'icone' => 'thumbs-down', 'intensite_min' => 1, 'intensite_max' => 2],
        ['nom' => 'Dédain', 'icone' => 'minus-circle', 'intensite_min' => 2, 'intensite_max' => 4],
        ['nom' => 'Nausée', 'icone' => 'circle-off', 'intensite_min' => 4, 'intensite_max' => 6],
        ['nom' => 'Répulsion', 'icone' => 'ban', 'intensite_min' => 6, 'intensite_max' => 8],
        ['nom' => 'Horreur', 'icone' => 'skull', 'intensite_min' => 8, 'intensite_max' => 9],
        ['nom' => 'Dégoût profond', 'icone' => 'x-octagon', 'intensite_min' => 9, 'intensite_max' => 10],
    ],
];

$emotions = [];

foreach ($emotionsData as $typeEmotionNom => $emotionsDuType) {
    foreach ($emotionsDuType as $emotionData) {
        $typeEmotion = $typesEmotion[$typeEmotionNom];

        $emotion = new EMOTIONS();
        $emotion->setNom($emotionData['nom']);
        $emotion->setIcone($emotionData['icone']);
        $emotion->setCouleur($typeEmotion->getCouleur());
        $emotion->setDescription(
            'Émotion associée à la famille émotionnelle : ' . $typeEmotionNom . '.'
        );
        $emotion->setIntensiteMin($emotionData['intensite_min']);
        $emotion->setIntensiteMax($emotionData['intensite_max']);
        $emotion->setTypeEmotion($typeEmotion);
        $emotion->setCreatedAt(new \DateTimeImmutable('-5 months'));
        $emotion->setUpdatedAt(new \DateTimeImmutable('-2 weeks'));

        $manager->persist($emotion);
        $emotions[] = $emotion;
    }
}

        /*
         * 7. Ressources d’information
         */
        $ressourcesData = [
            [
                'titre' => 'Comprendre le stress au quotidien',
                'slug' => 'comprendre-le-stress-au-quotidien',
                'resume' => 'Une introduction simple pour comprendre le rôle du stress et ses effets.',
                'contenu' => 'Le stress est une réaction normale face à une situation perçue comme difficile ou menaçante. Lorsqu’il devient fréquent ou intense, il peut influencer le sommeil, la concentration, l’humeur et le bien-être général.',
                'categorieIndex' => 1,
                'typeIndex' => 0,
                'estActif' => true,
            ],
            [
                'titre' => 'Premiers gestes pour retrouver son calme',
                'slug' => 'premiers-gestes-retrouver-son-calme',
                'resume' => 'Quelques actions simples à réaliser lors d’un moment de tension.',
                'contenu' => 'Prendre quelques respirations lentes, s’éloigner de la source de tension, boire un verre d’eau ou verbaliser son ressenti peut aider à réduire l’intensité d’un moment de stress.',
                'categorieIndex' => 1,
                'typeIndex' => 1,
                'estActif' => true,
            ],
            [
                'titre' => 'Cohérence cardiaque : méthode 5-5',
                'slug' => 'coherence-cardiaque-methode-55',
                'resume' => 'Un exercice de respiration basé sur 5 secondes d’inspiration et 5 secondes d’expiration.',
                'contenu' => 'La méthode 5-5 consiste à inspirer pendant 5 secondes puis expirer pendant 5 secondes. Elle peut être répétée pendant plusieurs minutes afin de favoriser l’apaisement.',
                'categorieIndex' => 2,
                'typeIndex' => 2,
                'estActif' => true,
                'cheminMedia' => '/uploads/ressources/respiration-55.jpg',
                'nomFichier' => 'respiration-55.jpg',
                'tailleFichierKo' => 280,
                'largeurPx' => 1200,
                'hauteurPx' => 800,
                'dureeSeconde' => null,
            ],
            [
                'titre' => 'Cohérence cardiaque : méthode 4-6',
                'slug' => 'coherence-cardiaque-methode-46',
                'resume' => 'Un exercice simple avec inspiration de 4 secondes et expiration de 6 secondes.',
                'contenu' => 'La méthode 4-6 permet de ralentir le rythme respiratoire. L’expiration plus longue favorise une sensation de relâchement.',
                'categorieIndex' => 2,
                'typeIndex' => 2,
                'estActif' => true,
            ],
            [
                'titre' => 'Cohérence cardiaque : méthode 7-4-8',
                'slug' => 'coherence-cardiaque-methode-748',
                'resume' => 'Un exercice de respiration avec inspiration, apnée et expiration.',
                'contenu' => 'La méthode 7-4-8 consiste à inspirer pendant 7 secondes, retenir sa respiration pendant 4 secondes, puis expirer pendant 8 secondes.',
                'categorieIndex' => 2,
                'typeIndex' => 2,
                'estActif' => true,
            ],
            [
                'titre' => 'Améliorer son sommeil en période de stress',
                'slug' => 'ameliorer-son-sommeil-en-periode-de-stress',
                'resume' => 'Conseils pour limiter l’impact du stress sur le sommeil.',
                'contenu' => 'Un rituel de coucher régulier, la limitation des écrans et une activité calme en soirée peuvent aider à préserver la qualité du sommeil.',
                'categorieIndex' => 3,
                'typeIndex' => 0,
                'estActif' => true,
                'cheminMedia' => '/uploads/ressources/sommeil.jpg',
                'nomFichier' => 'sommeil.jpg',
                'tailleFichierKo' => 310,
                'largeurPx' => 1200,
                'hauteurPx' => 800,
                'dureeSeconde' => null,
            ],
            [
                'titre' => 'Organiser sa journée pour réduire la charge mentale',
                'slug' => 'organiser-sa-journee-reduire-charge-mentale',
                'resume' => 'Une ressource pour apprendre à prioriser les tâches.',
                'contenu' => 'La charge mentale peut être réduite en listant les tâches, en priorisant les urgences et en acceptant de ne pas tout faire dans la même journée.',
                'categorieIndex' => 4,
                'typeIndex' => 5,
                'estActif' => true,
            ],
            [
                'titre' => 'Reconnaître ses émotions',
                'slug' => 'reconnaitre-ses-emotions',
                'resume' => 'Une aide pour identifier plus facilement son état émotionnel.',
                'contenu' => 'Identifier une émotion permet de mieux comprendre ses besoins. Le tracker d’émotions aide à observer les variations émotionnelles dans le temps.',
                'categorieIndex' => 0,
                'typeIndex' => 0,
                'estActif' => true,
                'cheminMedia' => '/uploads/ressources/tracker-emotions.jpg',
                'nomFichier' => 'tracker-emotions.jpg',
                'tailleFichierKo' => 260,
                'largeurPx' => 1200,
                'hauteurPx' => 800,
                'dureeSeconde' => null,
            ],
            [
                'titre' => 'Conseils bien-être pour les étudiants',
                'slug' => 'conseils-bien-etre-pour-les-etudiants',
                'resume' => 'Conseils adaptés aux périodes de cours, de stage ou d’examen.',
                'contenu' => 'Pendant les périodes chargées, il est important de préserver des temps de pause, de garder un rythme de sommeil régulier et de demander de l’aide si nécessaire.',
                'categorieIndex' => 5,
                'typeIndex' => 1,
                'estActif' => true,
            ],
            [
                'titre' => 'Prévenir l’épuisement mental',
                'slug' => 'prevenir-epuisement-mental',
                'resume' => 'Signes d’alerte et conseils de prévention.',
                'contenu' => 'La fatigue persistante, la perte de motivation ou l’irritabilité peuvent être des signaux d’alerte. Il est essentiel de prendre ces signes au sérieux.',
                'categorieIndex' => 6,
                'typeIndex' => 0,
                'estActif' => true,
                'cheminMedia' => '/uploads/ressources/prevention-epuisement.jpg',
                'nomFichier' => 'prevention-epuisement.jpg',
                'tailleFichierKo' => 295,
                'largeurPx' => 1200,
                'hauteurPx' => 800,
                'dureeSeconde' => null,
            ],
            [
                'titre' => 'Exercice de relaxation rapide',
                'slug' => 'exercice-relaxation-rapide',
                'resume' => 'Un exercice court à utiliser dans une journée chargée.',
                'contenu' => 'Fermer les yeux, détendre les épaules et porter attention à sa respiration pendant deux minutes peut aider à créer une pause mentale.',
                'categorieIndex' => 7,
                'typeIndex' => 2,
                'estActif' => true,
                'cheminMedia' => '/uploads/ressources/relaxation.jpg',
                'nomFichier' => 'relaxation.jpg',
                'tailleFichierKo' => 275,
                'largeurPx' => 1200,
                'hauteurPx' => 800,
                'dureeSeconde' => null,
            ],
            [
                'titre' => 'Infographie : comprendre les signes du stress',
                'slug' => 'infographie-comprendre-signes-stress',
                'resume' => 'Une infographie pour identifier rapidement les signes physiques et émotionnels du stress.',
                'contenu' => 'Cette ressource visuelle aide l’utilisateur à reconnaître les signaux pouvant indiquer un niveau de stress élevé.',
                'categorieIndex' => 1,
                'typeIndex' => 6,
                'estActif' => true,
                'cheminMedia' => '/uploads/ressources/stress.jpg',
                'nomFichier' => 'stress.jpg',
                'tailleFichierKo' => 245,
                'largeurPx' => 1200,
                'hauteurPx' => 800,
                'dureeSeconde' => null,
            ],
            [
                'titre' => 'Ressource en préparation',
                'slug' => 'ressource-en-preparation',
                'resume' => 'Exemple de ressource inactive pour tester le back-office.',
                'contenu' => 'Cette ressource est volontairement inactive afin de tester la gestion de publication dans l’administration.',
                'categorieIndex' => 0,
                'typeIndex' => 0,
                'estActif' => false,
            ],
        ];

        foreach ($ressourcesData as $index => $ressourceData) {
            $ressource = new RESSOURCES();

            $ressource->setTitre($ressourceData['titre']);
            $ressource->setSlug($ressourceData['slug']);
            $ressource->setResume($ressourceData['resume']);
            $ressource->setContenuTexte($ressourceData['contenu']);
            $ressource->setCheminMedia($ressourceData['cheminMedia'] ?? null);
            $ressource->setNomFichier($ressourceData['nomFichier'] ?? null);
            $ressource->setTailleFichierKo($ressourceData['tailleFichierKo'] ?? null);
            $ressource->setDureeSeconde($ressourceData['dureeSeconde'] ?? null);
            $ressource->setLargeurPx($ressourceData['largeurPx'] ?? null);
            $ressource->setHauteurPx($ressourceData['hauteurPx'] ?? null);
            $ressource->setEstActif($ressourceData['estActif']);
            $ressource->setDatePublication(
                $ressourceData['estActif'] ? new \DateTimeImmutable('-' . ($index + 1) . ' days') : null
            );
            $ressource->setCreatedAt(new \DateTimeImmutable('-2 months'));
            $ressource->setUpdatedAt(new \DateTimeImmutable('-' . ($index + 1) . ' days'));
            $ressource->setAuteur($utilisateurs[0]);
            $ressource->setCategorie($categories[$ressourceData['categorieIndex']]);
            $ressource->setType($typesRessources[$ressourceData['typeIndex']]);

            $manager->persist($ressource);
        }

        /*
         * 8. Entrées de journal
         */
        $titresJournal = [
            'Journée calme',
            'Moment compliqué',
            'Fin de journée chargée',
            'Petit bilan personnel',
            'Émotion marquante',
            'Pause introspective',
        ];

        foreach ($emotions as $index => $emotion) {
            $entree = new ENTREEJOURNAL();

            $entree->setTitre($titresJournal[$index % count($titresJournal)] . ' #' . ($index + 1));
            $entree->setDateRessentie(new \DateTimeImmutable('-' . ($index + 1) . ' days'));
            $entree->setIntensite(($index % 5) + 1);
            $entree->setUtilisateur($utilisateurs[($index % 5) + 1]);
            $entree->setEmotion($emotion);
            $entree->setCreatedAt(new \DateTimeImmutable('-' . ($index + 1) . ' days'));
            $entree->setUpdatedAt(new \DateTimeImmutable('-' . ($index + 1) . ' days'));

            $manager->persist($entree);
        }

        /*
         * Quelques entrées supplémentaires pour Alice afin de tester un journal utilisateur bien rempli.
         */
        for ($i = 1; $i <= 10; $i++) {
            $entree = new ENTREEJOURNAL();

            $entree->setTitre('Suivi émotionnel Alice ' . $i);
            $entree->setDateRessentie(new \DateTimeImmutable('-' . $i . ' days'));
            $entree->setIntensite(($i % 5) + 1);
            $entree->setUtilisateur($utilisateurs[1]);
            $entree->setEmotion($emotions[$i - 1]);
            $entree->setCreatedAt(new \DateTimeImmutable('-' . $i . ' days'));
            $entree->setUpdatedAt(new \DateTimeImmutable('-' . $i . ' days'));

            $manager->persist($entree);
        }

        $manager->flush();
    }
}