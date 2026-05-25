import { Link } from "react-router-dom"
import { TypeResources } from "../../../../../types/types"
import styles from "./module.typeRessourcesList.module.css"
type Props = {
    typesRessources : TypeResources [],
}

export default function TypesRessourcesListCard({typesRessources}:Readonly<Props>){

    return(
         <section className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <span>Type</span>
            <span>Code</span>
            <span>Description</span>
            <span>Couleur</span>
            <span>Actions</span>
          </div>

          {typesRessources.map((typeRessource) => (
            <article className={styles.tableRow} key={typeRessource.id}>
              <div className={styles.typeName}>
                <strong>{typeRessource.libelle ?? "Sans libellé"}</strong>

                <small>ID : {typeRessource.id}</small>
              </div>

              <span className={styles.codeBadge}>{typeRessource.code}</span>

              <p className={styles.description}>
                {typeRessource.description || "Aucune description."}
              </p>

              <div className={styles.colorCell}>
                <span
                  className={styles.colorDot}
                  style={{
                    backgroundColor: typeRessource.couleur ?? "#5D7052",
                  }}
                />

                <span>{typeRessource.couleur ?? "Non renseignée"}</span>
              </div>

              <div className={styles.actions}>
                <Link
                  to={`/admin/ressources/types/update/${typeRessource.id}`}
                  className={styles.editButton}
                >
                  Modifier
                </Link>
              </div>
            </article>
          ))}
        </section>
    )
}