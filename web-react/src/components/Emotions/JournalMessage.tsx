import { Message } from "../../types/message"
import styles from "./module.JournalStats.module.css"

type Props = {
    message: Message
}


export default function JournalMessage({message}:Readonly<Props>){

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