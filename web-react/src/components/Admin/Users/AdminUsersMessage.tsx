import { Message } from "../../../types/message";
import styles from "./module.AdminUsers.module.css";

type Props= {
    message: Message
}

export default function AdminUsersMessage({message}:Readonly<Props>){

        if (!message) return null;

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