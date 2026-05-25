import styles from "./module.typeRessourcesList.module.css"
type Props = {
    isLoading : boolean
}

export default function TypesRessourcesListLoading({isLoading}:Readonly<Props>){

    if(!isLoading) return null;

    return(

        <p className={styles.loadingMessage}>
          Chargement des types de ressources...
        </p>

    )
}