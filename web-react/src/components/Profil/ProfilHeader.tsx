import styles from "./module.Profil.module.css";

export default function ProfileHeader(){

    return(
        <section className={styles.header}>
        <p className={styles.eyebrow}>CESI ZEN</p>

        <h1 className={styles.title}>Mon profil</h1>

        <p className={styles.subtitle}>
          Gérez vos informations personnelles et la sécurité de votre compte.
        </p>
      </section>
    )
}