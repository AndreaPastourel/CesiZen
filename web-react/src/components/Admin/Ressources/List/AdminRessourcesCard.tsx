import { Link, useNavigate } from "react-router-dom"
import { formatDate } from "../../../../config/Format"
import { Ressource } from "../../../../types/ressources"
import styles from "./module.AdminRessourcesList.module.css"

type Props ={
    ressource:Ressource,
    handleToggleActive: (ressource: Ressource) => Promise<void>,

}


export default function AdminRessourcesCard({ressource,handleToggleActive}:Readonly<Props>){
        const navigate=useNavigate()

    return(
         <article className={styles.tableRow} key={ressource.id}>
              <div className={styles.resourceTitle}>
                <strong>{ressource.titre}</strong>
                <small>{ressource.slug}</small>
              </div>

              <span>{ressource.categorie?.nom ?? "Non renseignée"}</span>

              <span>{ressource.type?.libelle ?? ressource.type?.code}</span>

              <span>{formatDate(ressource.date_publication)}</span>

              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={ressource.est_actif}
                  aria-label={`Activer ou désactiver la ressource ${ressource.titre}`}
                  onChange={() => handleToggleActive(ressource)}
                />

                <span className={styles.slider}></span>
              </label>

              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.editButton}
                  onClick={() => navigate(`/admin/ressource/update/${ressource.id}`)}
                >
                  Modifier
                </button>

                <Link
                  to={`/ressources/${ressource.slug}`}
                  className={styles.viewButton}
                >
                  Voir
                </Link>
              </div>
            </article>
    )
}