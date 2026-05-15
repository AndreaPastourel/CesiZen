import { Message } from "../../../../types/message"
import styles from "./module.AdminRessourcesList.module.css"

type  Props={
    message:Message,
}

export default function AdminRessourcesMessage({message}:Readonly<Props>){

    if (!message)return null;

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