
import styles from "./module.JournalStats.module.css"

type Props= {
    isLoading:boolean
}

export default function JournalLoading({isLoading}:Readonly<Props>){

    if(!isLoading) return null;

    return (
      
        <p className={styles.loadingMessage}>
          Chargement du journal d’émotions...
        </p>

    )
}