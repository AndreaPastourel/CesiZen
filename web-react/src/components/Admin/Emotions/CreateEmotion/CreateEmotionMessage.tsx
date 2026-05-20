import { Message } from "../../../../types/message";
import styles from "../module.createEmotion.module.css";

type Props = {
    message : Message
}

export default function CreateEmotionMessage({message}:Readonly<Props>){

    if(!message) return null;

    return(  
          <p
            className={
              message.type === "error"
                ? styles.errorMessage
                : styles.successMessage
            }
            role="alert"
          >
            {message.text}
          </p>
        )
}