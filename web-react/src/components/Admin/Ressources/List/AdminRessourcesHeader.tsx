import { Link } from "react-router-dom"
import styles from "./module.AdminRessourcesList.module.css"

export default function AdminRessourcesHeader(){

    return(
    <section className={styles.header}>
        <div>
          <p className={styles.eyebrow}>ADMINISTRATION</p>

          <h1 className={styles.title}>Gestion des ressources</h1>

          <p className={styles.subtitle}>
            Gérez les ressources visibles sur la plateforme CESI Zen.
          </p>
        </div>

        <Link to="/admin/ressources/create" className={styles.addButton}>
          Ajouter une ressource
        </Link>
      </section>
      )
}
