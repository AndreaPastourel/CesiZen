import { TypeResources } from "../../../../../types/types"
import styles from "./module.typeRessourcesList.module.css"
type Props = {
    isLoading : boolean,
    typesRessources : TypeResources [],
}

export default function TypesRessourcesListEmpty({isLoading,typesRessources}:Readonly<Props>){

    if (isLoading && typesRessources.length !==0) return null

    return(
        
        <p className={styles.emptyMessage}>
          Aucun type de ressource n’a encore été créé.
        </p>

    )
}