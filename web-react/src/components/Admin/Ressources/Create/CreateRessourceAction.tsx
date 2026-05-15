import styles from "./module.ressourceCreate.module.css";

type Props= {
        isLoading: boolean,
}

export default function CreateRessourceAction({isLoading}:Readonly<Props>){

    return(
        <button
          className={styles.primaryButton}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Création..." : "Créer la ressource"}
        </button>
    )
}