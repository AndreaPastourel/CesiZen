
import styles from "./module.EmotionList.module.css";

type Props={
    isLoading:boolean
}



export default function EmotionListLoading({isLoading}:Readonly<Props>){

        if (!isLoading) return null;
    return(
    
        <p className={styles.loadingMessage}>Chargement des émotions...</p>
    )
}