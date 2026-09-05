import styles from "../MentionLegal/module.mentionLegal.module.css";

export default function PrivacyPolicy() {
  return (
    <main className={styles.legalPage}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Protection de vos données</p>

        <h1 className={styles.title}>
          Politique de <span>confidentialité</span>
        </h1>

        <p className={styles.subtitle}>
          Cette page explique quelles données CesiZen utilise, pourquoi elles
          sont utilisées et comment exercer vos droits.
        </p>
      </header>

      <article className={styles.card}>
        <section className={styles.section}>
          <h2>1. Responsable du traitement</h2>

          <p>
            Le responsable du traitement des données est{" "}
            <strong>Andréa Pastourel</strong>, dans le cadre du projet CesiZen.
          </p>

          <p>
            Pour toute question relative à vos données personnelles, vous
            pouvez écrire à <strong>contact@cesizen.fr</strong>.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Données collectées</h2>

          <p>
            <strong>Données du compte :</strong> nom, prénom, pseudonyme,
            adresse électronique, numéro de téléphone et photo de profil
            lorsqu’ils sont renseignés.
          </p>

          <p>
            <strong>Données du journal émotionnel :</strong> titre de
            l’entrée, émotion, intensité et date renseignée.
          </p>

          <p>
            <strong>Données de sécurité :</strong> rôle, état du compte,
            dernière connexion, jetons de session et journaux techniques
            nécessaires à la détection des erreurs et tentatives malveillantes.
          </p>

          <p>
            Le mot de passe n’est jamais enregistré en clair. Seule sa version
            hachée est conservée.
          </p>
        </section>

        <section className={styles.section}>
          <h2>3. Finalités et bases légales</h2>

          <p>
            Les données du compte sont utilisées pour créer le compte,
            authentifier l’utilisateur, afficher son profil et fournir les
            fonctionnalités de CesiZen. Ce traitement repose sur
            l’exécution du service demandé.
          </p>

          <p>
            Les informations du journal sont utilisées uniquement pour
            permettre à l’utilisateur de suivre ses émotions. Lorsqu’elles
            peuvent révéler des informations relatives à la santé ou au
            bien-être, leur traitement repose sur le consentement explicite
            de l’utilisateur.
          </p>

          <p>
            Les journaux techniques et de sécurité sont utilisés pour protéger
            l’application, prévenir les abus et résoudre les incidents. Ce
            traitement repose sur l’intérêt légitime de sécuriser le service.
          </p>
        </section>

        <section className={styles.section}>
          <h2>4. Destinataires des données</h2>

          <p>
            Les données sont accessibles uniquement à leur propriétaire et,
            lorsque cela est nécessaire, aux administrateurs autorisés chargés
            du fonctionnement et de la sécurité de CesiZen.
          </p>

          <p>
            Les données personnelles ne sont ni vendues ni utilisées à des
            fins publicitaires.
          </p>
        </section>

        <section className={styles.section}>
          <h2>5. Durées de conservation</h2>

          <p>
            Les données du compte et du journal sont conservées pendant la
            durée d’utilisation du compte.
          </p>

          <p>
            Une alerte d’inactivité est prévue après deux mois sans connexion.
            Le compte est désactivé après trois mois. Une anonymisation
            automatique est prévue au plus tard six mois après sa
            désactivation.
          </p>

          <p>
            Lorsqu’un utilisateur demande directement la suppression de son
            compte, les entrées du journal, les sessions et la photo de profil
            sont supprimées, puis le compte est anonymisé.
          </p>

          <p>
            Les journaux techniques et de sécurité sont conservés pendant une
            durée maximale de six mois.
          </p>
        </section>

        <section className={styles.section}>
          <h2>6. Cookies et stockage local</h2>

          <p>
            CesiZen utilise uniquement les mécanismes techniques nécessaires à
            l’authentification, à la sécurité de la session et à la mémorisation
            du choix relatif aux cookies.
          </p>

          <p>
            Les éventuels outils facultatifs de mesure d’audience ne peuvent
            être activés qu’après le consentement de l’utilisateur.
          </p>
        </section>

        <section className={styles.section}>
          <h2>7. Sécurité</h2>

          <p>
            CesiZen utilise notamment le hachage des mots de passe,
            l’authentification JWT, le contrôle des rôles, la limitation des
            tentatives de connexion et une supervision des événements de
            sécurité.
          </p>

          <p>
            Malgré ces mesures, aucun système informatique ne peut garantir
            une sécurité absolue.
          </p>
        </section>

        <section className={styles.section}>
          <h2>8. Vos droits</h2>

          <p>
            Vous disposez d’un droit d’accès, de rectification, d’effacement,
            de limitation, d’opposition et de portabilité de vos données.
          </p>

          <p>
            Une fois connecté, vous pouvez exporter vos données et demander la
            suppression de votre compte depuis la page <strong>Profil</strong>.
          </p>

          <p>
            Vous pouvez également exercer vos droits en écrivant à{" "}
            <strong>contact@cesizen.fr</strong>. Une vérification de votre
            identité pourra être demandée lorsque cela est nécessaire.
          </p>

          <p>
            Si vous estimez que vos droits ne sont pas respectés, vous pouvez
            déposer une réclamation auprès de la <strong>CNIL</strong>.
          </p>
        </section>

        <section className={styles.section}>
          <h2>9. Modification de cette politique</h2>

          <p>
            Cette politique peut être mise à jour lorsque les traitements ou
            les fonctionnalités de CesiZen évoluent. La date de mise à jour
            affichée ci-dessous permet d’identifier la version applicable.
          </p>
        </section>

        <p className={styles.updateDate}>
          Dernière mise à jour : 4 septembre 2026
        </p>
      </article>
    </main>
  );
}