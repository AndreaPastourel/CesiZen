
import { Link } from "react-router-dom"
import styles from "./module.typeRessourcesList.module.css"

export default function TypesRessourcesListHeader(){

    return(
         <section className={styles.header}>
        <div>
          <p className={styles.eyebrow}>ADMINISTRATION</p>

          <h1 className={styles.title}>Types de ressources</h1>

          <p className={styles.subtitle}>
            Gérez les types utilisés pour classer les ressources, comme les
            articles, les vidéos ou les documents.
          </p>
        </div>

        <Link
          to="/admin/ressources/types/create"
          className={styles.addButton}
        >
          Ajouter un type
        </Link>
      </section>

    )
}