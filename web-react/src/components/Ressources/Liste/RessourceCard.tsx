
import styles from "./module.ressourcesList.module.css";
import { Ressource } from "../../../types/ressources";
import { formatDate } from "../../../config/Format";
import { Link } from "react-router-dom";


type Props={
    ressource : Ressource,
}


export default function RessourceCard({ressource}:Readonly<Props>){

    return  (
        <article className={styles.card} key={ressource.id}>
              <div className={styles.cardTop}>
                <span className={styles.badge}>
                  {ressource.type?.libelle ?? "Ressource"}
                </span>

                {ressource.est_actif ? (
                  <span className={styles.statusActive}>Active</span>
                ) : (
                  <span className={styles.statusInactive}>Inactive</span>
                )}
              </div>

              <div className={styles.cardContent}>
                <h2 className={styles.cardTitle}>{ressource.titre}</h2>

                <p className={styles.cardResume}>
                  {ressource.resume || "Aucun résumé disponible."}
                </p>

                <div className={styles.metaList}>
                  <p>
                    <strong>Catégorie :</strong>{" "}
                    {ressource.categorie?.nom ?? "Non renseignée"}
                  </p>

                  <p>
                    <strong>Auteur :</strong>{" "}
                    {ressource.auteur?.pseudo ?? "Non renseigné"}
                  </p>

                  <p>
                    <strong>Publié le :</strong>{" "}
                    {formatDate(ressource.date_publication)}
                  </p>
                </div>
              </div>

              <div className={styles.cardFooter}>
                {ressource.nom_fichier && (
                  <p className={styles.fileInfo}>{ressource.nom_fichier}</p>
                )}

                <Link to={`/ressources/${ressource.slug}`} className={styles.cardButton}>
                Voir la ressource
              </Link>
              </div>
            </article>
    )   
    
}