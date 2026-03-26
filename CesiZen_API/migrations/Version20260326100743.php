<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260326100743 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE categoriesressources (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(100) NOT NULL, couleur VARCHAR(20) DEFAULT NULL, description LONGTEXT DEFAULT NULL, created_at DATETIME NOT NULL, updated_at DATETIME DEFAULT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE emotions (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(100) NOT NULL, description LONGTEXT NOT NULL, intensite_min INT NOT NULL, intensite_max INT NOT NULL, couleur VARCHAR(20) DEFAULT NULL, icone VARCHAR(255) DEFAULT NULL, created_at DATETIME NOT NULL, updated_at DATETIME DEFAULT NULL, type_emotion_id INT DEFAULT NULL, INDEX IDX_D56FF5283E773A7 (type_emotion_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE entreejournal (id INT AUTO_INCREMENT NOT NULL, titre VARCHAR(255) DEFAULT NULL, intensite INT DEFAULT NULL, date_ressentie DATETIME NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME DEFAULT NULL, utilisateur_id INT NOT NULL, emotion_id INT NOT NULL, INDEX IDX_B3B8B60AFB88E14F (utilisateur_id), INDEX IDX_B3B8B60A1EE4A582 (emotion_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE refreshtoken (id INT AUTO_INCREMENT NOT NULL, token VARCHAR(255) NOT NULL, date_creation DATETIME NOT NULL, date_expiration DATETIME NOT NULL, est_revoque TINYINT NOT NULL, utilisateur_id INT NOT NULL, INDEX IDX_A8B2C362FB88E14F (utilisateur_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE reinitialisationsmdp (id INT AUTO_INCREMENT NOT NULL, token VARCHAR(255) NOT NULL, date_demande DATETIME NOT NULL, date_expiration DATETIME NOT NULL, date_utilisation DATETIME DEFAULT NULL, est_utilise TINYINT NOT NULL, created_at DATETIME NOT NULL, utilisateur_id INT NOT NULL, INDEX IDX_3A00D997FB88E14F (utilisateur_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE ressources (id INT AUTO_INCREMENT NOT NULL, titre VARCHAR(255) NOT NULL, slug VARCHAR(255) NOT NULL, resume VARCHAR(255) NOT NULL, contenu_texte LONGTEXT DEFAULT NULL, chemin_media VARCHAR(255) DEFAULT NULL, nom_fichier VARCHAR(255) DEFAULT NULL, taille_fichier_ko INT DEFAULT NULL, duree_seconde INT DEFAULT NULL, largeur_px INT DEFAULT NULL, hauteur_px INT DEFAULT NULL, est_actif TINYINT DEFAULT NULL, date_publication DATETIME DEFAULT NULL, created_at DATETIME DEFAULT NULL, updated_at DATETIME DEFAULT NULL, auteur_id INT NOT NULL, categorie_id INT DEFAULT NULL, type_id INT DEFAULT NULL, INDEX IDX_6A2CD5C760BB6FE6 (auteur_id), INDEX IDX_6A2CD5C7BCF5E72D (categorie_id), INDEX IDX_6A2CD5C7C54C8C93 (type_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE roles (id INT AUTO_INCREMENT NOT NULL, code VARCHAR(50) NOT NULL, libelle VARCHAR(100) NOT NULL, description LONGTEXT DEFAULT NULL, created_at DATETIME NOT NULL, updated_at DATETIME DEFAULT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE typesemotion (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(100) NOT NULL, couleur VARCHAR(20) DEFAULT NULL, description LONGTEXT NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME DEFAULT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE typesressources (id INT AUTO_INCREMENT NOT NULL, code VARCHAR(50) NOT NULL, libelle VARCHAR(100) NOT NULL, description VARCHAR(255) DEFAULT NULL, created_at DATETIME NOT NULL, updated_at DATETIME DEFAULT NULL, couleur VARCHAR(20) DEFAULT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE utilisateurs (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(100) NOT NULL, prenom VARCHAR(100) NOT NULL, pseudo VARCHAR(100) NOT NULL, email VARCHAR(180) NOT NULL, telephone VARCHAR(20) NOT NULL, mot_de_passe VARCHAR(255) NOT NULL, photo_profil VARCHAR(255) DEFAULT NULL, est_actif TINYINT NOT NULL, email_verifie TINYINT NOT NULL, date_derniere_connexion DATETIME DEFAULT NULL, created_at DATETIME NOT NULL, updated_at DATETIME DEFAULT NULL, role_id INT NOT NULL, INDEX IDX_497B315ED60322AC (role_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL, available_at DATETIME NOT NULL, delivered_at DATETIME DEFAULT NULL, INDEX IDX_75EA56E0FB7336F0E3BD61CE16BA31DBBF396750 (queue_name, available_at, delivered_at, id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('ALTER TABLE emotions ADD CONSTRAINT FK_D56FF5283E773A7 FOREIGN KEY (type_emotion_id) REFERENCES typesemotion (id)');
        $this->addSql('ALTER TABLE entreejournal ADD CONSTRAINT FK_B3B8B60AFB88E14F FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs (id)');
        $this->addSql('ALTER TABLE entreejournal ADD CONSTRAINT FK_B3B8B60A1EE4A582 FOREIGN KEY (emotion_id) REFERENCES emotions (id)');
        $this->addSql('ALTER TABLE refreshtoken ADD CONSTRAINT FK_A8B2C362FB88E14F FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs (id)');
        $this->addSql('ALTER TABLE reinitialisationsmdp ADD CONSTRAINT FK_3A00D997FB88E14F FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs (id)');
        $this->addSql('ALTER TABLE ressources ADD CONSTRAINT FK_6A2CD5C760BB6FE6 FOREIGN KEY (auteur_id) REFERENCES utilisateurs (id)');
        $this->addSql('ALTER TABLE ressources ADD CONSTRAINT FK_6A2CD5C7BCF5E72D FOREIGN KEY (categorie_id) REFERENCES categoriesressources (id)');
        $this->addSql('ALTER TABLE ressources ADD CONSTRAINT FK_6A2CD5C7C54C8C93 FOREIGN KEY (type_id) REFERENCES typesressources (id)');
        $this->addSql('ALTER TABLE utilisateurs ADD CONSTRAINT FK_497B315ED60322AC FOREIGN KEY (role_id) REFERENCES roles (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE emotions DROP FOREIGN KEY FK_D56FF5283E773A7');
        $this->addSql('ALTER TABLE entreejournal DROP FOREIGN KEY FK_B3B8B60AFB88E14F');
        $this->addSql('ALTER TABLE entreejournal DROP FOREIGN KEY FK_B3B8B60A1EE4A582');
        $this->addSql('ALTER TABLE refreshtoken DROP FOREIGN KEY FK_A8B2C362FB88E14F');
        $this->addSql('ALTER TABLE reinitialisationsmdp DROP FOREIGN KEY FK_3A00D997FB88E14F');
        $this->addSql('ALTER TABLE ressources DROP FOREIGN KEY FK_6A2CD5C760BB6FE6');
        $this->addSql('ALTER TABLE ressources DROP FOREIGN KEY FK_6A2CD5C7BCF5E72D');
        $this->addSql('ALTER TABLE ressources DROP FOREIGN KEY FK_6A2CD5C7C54C8C93');
        $this->addSql('ALTER TABLE utilisateurs DROP FOREIGN KEY FK_497B315ED60322AC');
        $this->addSql('DROP TABLE categoriesressources');
        $this->addSql('DROP TABLE emotions');
        $this->addSql('DROP TABLE entreejournal');
        $this->addSql('DROP TABLE refreshtoken');
        $this->addSql('DROP TABLE reinitialisationsmdp');
        $this->addSql('DROP TABLE ressources');
        $this->addSql('DROP TABLE roles');
        $this->addSql('DROP TABLE typesemotion');
        $this->addSql('DROP TABLE typesressources');
        $this->addSql('DROP TABLE utilisateurs');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
