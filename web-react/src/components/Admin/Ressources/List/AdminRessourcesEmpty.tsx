import { Ressource } from "../../../../types/ressources"
import styles from "./module.AdminRessourcesList.module.css"

type Props={
    isLoading: boolean,
    ressources : Ressource[],
}


export default function AdminRessourcesEmpty({isLoading,ressources}:Readonly<Props>){

        if (!isLoading && ressources.length === 0) return null;

    return(
          
        <p className={styles.emptyMessage}>
          Aucune ressource n’a encore été créée.
        </p>
    )
}