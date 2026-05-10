import styles from "./module.ressourcesDetail.module.css";
type Message = {
  type: "success" | "error";
  text: string;
};

type Props = {
  message: Message |null;
};

export default function DetailMessage({message}:Readonly<Props>){
  if (!message || message.type==="success") return null;

  return (
    <p className={styles.errorMessage} role="alert">{message.text} </p>
  );
}