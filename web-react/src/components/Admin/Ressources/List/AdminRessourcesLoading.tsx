import styles from "./module.AdminRessourcesList.module.css"

type Props={
    isLoading: boolean,
}

export default function AdminRessourcesLoading({isLoading}:Readonly<Props>){
    if(!isLoading) return null;

    return(
        <p className={styles.loadingMessage}>Chargement des ressources...</p>
    )
}