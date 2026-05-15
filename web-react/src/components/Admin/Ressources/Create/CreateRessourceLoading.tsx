import styles from "./module.ressourceCreate.module.css";

type Props= {
        isLoading: boolean,
}

export default function CreateRessourceLoading({isLoading}:Readonly<Props>){

    if (!isLoading) return null;
    return(
      
          <p className={styles.loadingMessage}>
            Chargement des catégories et des types...
          </p>


    )
}