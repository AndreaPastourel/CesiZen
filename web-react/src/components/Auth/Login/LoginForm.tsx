import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import LoginAction from "./LoginAction";
import LoginFields from "./LoginFields";
import LoginHeader from "./LoginHeader";
import LoginMessage from "./LoginMessage";
import Captcha from "../../Captcha/Captcha";

import styles from "../module.loginStyle.module.css";

import { apiLogin } from "../../../services/authApi";

type LoginMessageState = {
  type: "success" | "error";
  text: string;
} | null;

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isCaptchaValid, setIsCaptchaValid] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<LoginMessageState>(null);
  const [captchaResetKey, setCaptchaResetKey] = useState<number>(0);

  const navigate = useNavigate();

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

    if (!isCaptchaValid) {
      setMessage({
        type: "error",
        text: "Veuillez valider la vérification anti-robot.",
      });

      setCaptchaResetKey((previousKey) => previousKey + 1);
      setIsCaptchaValid(false);
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

      navigate("/profil", { replace: true });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Impossible de se connecter.";

      setMessage({
        type: "error",
        text: errorMessage,
      });
      setCaptchaResetKey((previousKey) => previousKey + 1);
      setIsCaptchaValid(false);

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

      <Captcha
          key={captchaResetKey}
          onValidationChange={setIsCaptchaValid}
        />

      <LoginAction isLoading={isLoading} />
    </form>
  );
}