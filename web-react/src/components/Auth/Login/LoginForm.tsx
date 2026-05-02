import { FormEvent, useState } from "react";
import LoginAction from "./LoginAction";
import LoginFields from "./LoginFields";
import LoginHeader from "./LoginHeader";
import LoginMessage from "./LoginMessage";
import styles from "../module.loginStyle.module.css";
import { apiLogin } from "../../../services/authApi";

type LoginMessageState = {
  type: "success" | "error";
  text: string;
} | null;

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<LoginMessageState>(null);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage(null);

    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      setMessage({
        type: "error",
        text: "Email et mot de passe obligatoires.",
      });
      return;
    }

    try {
      setIsLoading(true);

      await apiLogin({
        email: cleanEmail,
        password: cleanPassword,
      });

      setMessage({
        type: "success",
        text: "Connexion réussie ✅",
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Impossible de se connecter.";

      setMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className={styles.loginForm} onSubmit={handleLogin}>
      <LoginHeader
        title="Connexion"
        subtitle="Accédez à votre espace CESI Zen."
      />

      <LoginMessage message={message} />

      <LoginFields
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
      />

      <LoginAction isLoading={isLoading} />
    </form>
  );
}