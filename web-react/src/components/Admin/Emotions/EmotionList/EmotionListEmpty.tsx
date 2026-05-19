import { TypeEmotion } from "../../../../types/typesEmotion";
import styles from "./module.EmotionList.module.css";

type Props={
    isLoading:boolean,
    typesEmotion:TypeEmotion[],
}




export default function EmotionListEmpty({isLoading,typesEmotion}:Props){

    if (!isLoading && typesEmotion.length !== 0) return null 

    return(
         
        <p className={styles.emptyMessage}>
          Aucun type d’émotion n’a encore été créé.
        </p>
    )
}