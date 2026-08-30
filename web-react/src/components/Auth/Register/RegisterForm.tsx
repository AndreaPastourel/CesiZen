import { FormEvent, useState } from "react";

import { apiRegister } from "../../../services/authApi";

import styles from "../module.loginStyle.module.css";

import RegisterAction from "./RegisterAction";
import RegisterFields from "./RegisterFields";
import RegisterMessage from "./RegisterMessage";
import RegisterHeader from "./RegisterHeader";

import Captcha from "../../Captcha/Captcha";

type RegisterMessageState = {
  type: "succes" | "error";
  text: string | null;
} | null;

export default function RegisterForm() {
  const [email, setEmail] = useState<string>("");
  const [prenom, setPrenom] = useState<string>("");
  const [nom, setNom] = useState<string>("");
  const [pseudo, setPseudo] = useState<string>("");

  const [telephone, setTelephone] = useState<string>("");
  const [motDePasse, setMotDePasse] = useState<string>("");
  const [confirmMotDePasse, setConfirmMotDePasse] = useState<string>("");
  const [photoProfil, setPhotoProfil] = useState<string>("");

  const [isCaptchaValid, setIsCaptchaValid] = useState<boolean>(false);

  const [isLoading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<RegisterMessageState>(null);

  async function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage(null);

    const cleanPrenom = prenom.trim();
    const cleanNom = nom.trim();
    const cleanPseudo = pseudo.trim();
    const cleanEmail = email.trim();
    const cleanTelephone = telephone.trim();
    const cleanMotDePasse = motDePasse.trim();
    const cleanConfirmMotDePasse = confirmMotDePasse.trim();
    const cleanPhotoProfil = photoProfil.trim();

    if (!cleanPseudo || !cleanEmail || !cleanMotDePasse || !cleanConfirmMotDePasse) {
      setMessage({
        type: "error",
        text: "Le pseudo, l'email, le mot de passe et la confirmation du mot de passe sont obligatoires.",
      });

      return;
    }

    if (cleanMotDePasse.length < 6) {
      setMessage({
        type: "error",
        text: "Le mot de passe doit contenir au moins 6 caractères.",
      });

      return;
    }

    if (cleanMotDePasse !== cleanConfirmMotDePasse) {
      setMessage({
        type: "error",
        text: "Les mots de passe ne correspondent pas.",
      });

      return;
    }

    if (!isCaptchaValid) {
      setMessage({
        type: "error",
        text: "Veuillez valider la vérification anti-robot.",
      });

      return;
    }

    try {
      setLoading(true);

      await apiRegister({
        email: cleanEmail,
        motDePasse: cleanMotDePasse,
        pseudo: cleanPseudo,
        prenom: cleanPrenom || null,
        nom: cleanNom || null,
        telephone: cleanTelephone || null,
        photo_profil: cleanPhotoProfil || null,
      });

      setMessage({
        type: "succes",
        text: "Compte créé avec succès ✅",
      });

      setPrenom("");
      setNom("");
      setPseudo("");
      setEmail("");
      setTelephone("");
      setPhotoProfil("");
      setMotDePasse("");
      setConfirmMotDePasse("");
      setIsCaptchaValid(false);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Impossible de créer le compte.";

      setMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className={styles.loginForm} onSubmit={handleRegister}>
      <RegisterHeader
        title="Inscription"
        subtitle="Créez votre compte pour accéder à CESI Zen."
      />

      <RegisterMessage message={message} />

      <RegisterFields
        prenom={prenom}
        nom={nom}
        pseudo={pseudo}
        email={email}
        telephone={telephone}
        photoProfil={photoProfil}
        motDePasse={motDePasse}
        ConfirmMotDePasse={confirmMotDePasse}
        setPrenom={setPrenom}
        setNom={setNom}
        setPseudo={setPseudo}
        setEmail={setEmail}
        setTelephone={setTelephone}
        setPhotoProfil={setPhotoProfil}
        setMotDePasse={setMotDePasse}
        setConfirmMotDePasse={setConfirmMotDePasse}
      />

      <Captcha
        onValidationChange={setIsCaptchaValid}
      />

      <RegisterAction isLoading={isLoading} />
    </form>
  );
}