import styles from "./module.mentionLegal.module.css";

export default function MentionLegal() {
  return (
    <main className={styles.legalPage}>
      <section className={styles.header}>
        <p className={styles.eyebrow}>INFORMATIONS LÉGALES</p>

        <h1 className={styles.title}>Mentions légales</h1>

        <p className={styles.subtitle}>
          Cette page présente les informations relatives à l’édition,
          l’hébergement, la propriété intellectuelle et la gestion des données
          personnelles du site CESI Zen.
        </p>
      </section>

      <section className={styles.card}>
        <article className={styles.section}>
          <h2>1. Éditeur du site</h2>

          <p>
            Le présent site, intitulé <strong>CESI Zen</strong>, est réalisé dans
            le cadre d’un projet de formation.
          </p>

          <p>
            Éditeur du site : <strong>Andréa Pastourel</strong>
          </p>

          <p>
            Adresse : <strong>7 rue diderot 62000 Arras</strong>
          </p>

          <p>
            Adresse email de contact :{" "}
            <strong>contact@cesizen.fr</strong>
          </p>
        </article>

        <article className={styles.section}>
          <h2>2. Responsable de la publication</h2>

          <p>
            Le responsable de la publication est :{" "}
            <strong>Andréa Pastourel</strong>.
          </p>

          <p>
            Dans le cadre d’un projet scolaire, cette responsabilité peut être
            portée par l’étudiant, le groupe projet ou la structure de formation
            selon le contexte de présentation.
          </p>
        </article>

        <article className={styles.section}>
          <h2>3. Hébergement</h2>

          <p>
            Le site est hébergé par : <strong>[Nom de l’hébergeur]</strong>.
          </p>

          <p>
            Adresse de l’hébergeur :{" "}
            <strong></strong>
          </p>

          <p>
            Site web de l’hébergeur :{" "}
            <strong></strong>
          </p>
        </article>

        <article className={styles.section}>
          <h2>4. Présentation du service</h2>

          <p>
            CESI Zen est une application destinée à accompagner les utilisateurs
            dans le suivi de leur bien-être. Elle permet notamment de consulter
            des ressources, de gérer un profil utilisateur et de suivre des
            informations liées au journal d’émotions.
          </p>

          <p>
            Les contenus proposés sur le site ont une vocation informative et ne
            remplacent pas l’avis d’un professionnel de santé.
          </p>
        </article>

        <article className={styles.section}>
          <h2>5. Propriété intellectuelle</h2>

          <p>
            L’ensemble des contenus présents sur le site, notamment les textes,
            interfaces, éléments graphiques, logos, images et ressources, sont
            protégés par le droit de la propriété intellectuelle lorsqu’ils sont
            originaux ou appartiennent à leurs auteurs respectifs.
          </p>

          <p>
            Toute reproduction, représentation, modification ou diffusion des
            contenus du site sans autorisation préalable est interdite, sauf
            exception prévue par la loi.
          </p>
        </article>

        <article className={styles.section}>
          <h2>6. Données personnelles</h2>

          <p>
            Dans le cadre de son fonctionnement, CESI Zen peut collecter
            certaines données personnelles, comme l’adresse email, le pseudo, le
            nom, le prénom, le téléphone, la photo de profil ou les informations
            renseignées dans le journal d’émotions.
          </p>

          <p>
            Ces données sont utilisées uniquement pour permettre le
            fonctionnement du compte utilisateur, l’accès aux fonctionnalités du
            site et l’amélioration de l’expérience utilisateur.
          </p>

          <p>
            Conformément au RGPD, l’utilisateur dispose de droits sur ses données
            personnelles, notamment un droit d’accès, de rectification,
            d’effacement, d’opposition et de limitation du traitement.
          </p>

          <p>
            Pour exercer ces droits, l’utilisateur peut contacter l’éditeur du
            site à l’adresse suivante :{" "}
            <strong>contact@cesizen.fr</strong>.
          </p>
        </article>

        <article className={styles.section}>
          <h2>7. Cookies</h2>

          <p>
            Le site peut utiliser des cookies nécessaires à son bon
            fonctionnement, notamment pour gérer la connexion utilisateur et
            assurer la sécurité des sessions.
          </p>

          <p>
            Des cookies optionnels peuvent également être utilisés pour mesurer
            l’audience ou mémoriser certaines préférences, uniquement si
            l’utilisateur les accepte.
          </p>

          <p>
            L’utilisateur peut gérer ses choix à tout moment depuis la bannière
            ou le module de gestion des cookies prévu à cet effet.
          </p>
        </article>

        <article className={styles.section}>
          <h2>8. Sécurité</h2>

          <p>
            CESI Zen met en œuvre des mesures techniques visant à protéger les
            comptes utilisateurs et les données personnelles, notamment à travers
            un système d’authentification, des jetons de session et des règles
            d’accès selon les rôles.
          </p>

          <p>
            L’utilisateur reste responsable de la confidentialité de ses
            identifiants de connexion.
          </p>
        </article>

        <article className={styles.section}>
          <h2>9. Limitation de responsabilité</h2>

          <p>
            L’éditeur du site s’efforce de fournir des informations fiables et à
            jour. Toutefois, des erreurs ou omissions peuvent exister.
          </p>

          <p>
            L’utilisateur est invité à signaler toute anomalie ou contenu
            inexact afin qu’une correction puisse être apportée.
          </p>
        </article>

        <article className={styles.section}>
          <h2>10. Contact</h2>

          <p>
            Pour toute question relative au site, aux données personnelles ou aux
            présentes mentions légales, l’utilisateur peut contacter :
          </p>

          <p>
            <strong>contact@cesizen.fr</strong>
          </p>
        </article>

        <p className={styles.updateDate}>
          Dernière mise à jour : <strong>29/05/2026</strong>
        </p>
      </section>
    </main>
  );
}