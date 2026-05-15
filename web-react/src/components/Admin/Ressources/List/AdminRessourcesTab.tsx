
import { Ressource } from "../../../../types/ressources"
import styles from "./module.AdminRessourcesList.module.css"
import AdminRessourcesCard from "./AdminRessourcesCard"

type Props ={
    ressources:Ressource[],
    handleToggleActive: (ressource: Ressource) => Promise<void>,

}



export default function AdminRessourcesTab({ressources,handleToggleActive}:Readonly<Props>){

    return (
         <section className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <span>Titre</span>
            <span>Catégorie</span>
            <span>Type</span>
            <span>Publication</span>
            <span>Statut</span>
            <span>Actions</span>
          </div>

          {ressources.map((ressource, idx) => (
           <AdminRessourcesCard
           key={ressource.id ?? idx}
           ressource={ressource}
           handleToggleActive={handleToggleActive}
           />
          ))}
        </section>
    )
}