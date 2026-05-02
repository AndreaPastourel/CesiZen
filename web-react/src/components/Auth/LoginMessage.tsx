import styles from "./module.loginStyle.module.css";

type Message = {
  type: "success" | "error";
  text: string;
};

type Props = {
  message: Message | null;
};

export default function LoginMessage({ message }: Readonly<Props>) {
  if (!message) {
    return null;
  }

  const typeClass =
    message.type === "error"
      ? styles.loginMessageError
      : styles.loginMessageSuccess;

  return (
    <p className={`${styles.loginMessage} ${typeClass}`} role="alert">
      {message.text}
    </p>
  );
}