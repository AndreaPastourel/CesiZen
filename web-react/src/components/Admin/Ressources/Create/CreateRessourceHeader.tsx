import styles from "./module.ressourceCreate.module.css";

export default function CreateRessourceHeader(){

    return(
        <section className={styles.header}>
        <p className={styles.eyebrow}>ADMINISTRATION</p>

        <h1 className={styles.title}>Créer une ressource</h1>

        <p className={styles.subtitle}>
          Ajoutez une nouvelle ressource visible dans l’espace CESI Zen.
        </p>
      </section>
    )
}