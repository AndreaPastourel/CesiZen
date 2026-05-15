import styles from "./module.AdminUsers.module.css";


export default function AdminUsersHeader(){

    return(
        <section className={styles.header}>
        <p className={styles.eyebrow}>ADMINISTRATION</p>

        <h1 className={styles.title}>Gestion des utilisateurs</h1>

        <p className={styles.subtitle}>
          Activez ou désactivez les comptes utilisateurs et gérez les droits
          administrateur.
        </p>
      </section>
    )
}