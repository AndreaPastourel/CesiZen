
import {formatDate} from "../../../config/Format";
import { Ressource } from "../../../types/ressources";
import styles from "./module.ressourcesDetail.module.css";

type Props={
    ressource:Ressource
}

export default function DetailInfo({ressource}:Readonly<Props>){

    return (
         <div className={styles.metaGrid}>
      
            <div className={styles.metaItem}>
              <span>Catégorie</span>
              <strong>{ressource.categorie?.nom ?? "Non renseignée"}</strong>
            </div>


            <div className={styles.metaItem}>
              <span>Type</span>
              <strong>{ressource.type?.libelle ?? "Ressource"}</strong>
            </div>

            {/* Auteur */}
            <div className={styles.metaItem}>
              <span>Auteur</span>
              <strong>{ressource.auteur?.pseudo ?? "Non renseigné"}</strong>
            </div>

            <div className={styles.metaItem}>
              <span>Publication</span>
              <strong>{formatDate(ressource.date_publication)}</strong>
            </div>
          </div>

    )
}