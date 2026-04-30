import { useState } from "react";
import { apiLogin } from "../../services/authApi";
import LoginAction from "./LoginAction";
import LoginFields from "./LoginFields";
import LoginHeader from "./LoginHeader";
import LoginMessage from "./LoginMessage";
import styles from "./module.loginStyle.module.css";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  async function handleLogin(event) {
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
      setMessage({
        type: "error",
        text: error.message || "Impossible de se connecter.",
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