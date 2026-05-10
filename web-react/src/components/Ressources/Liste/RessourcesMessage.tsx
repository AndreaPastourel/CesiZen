
import styles from "./module.ressourcesList.module.css";
type Message = {
  type: "success" | "error";
  text: string;
};

type Props = {
  message: Message | null;
};

export default function RessourcesMessage({ message }: Readonly<Props>) {
  if (!message || message.type==="success") return null;

  return (
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
  );
}