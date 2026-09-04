import { ComponentProps, useState } from "react";

import { apiDeleteAccount } from "../../services/profilApi";
import { Message } from "../../types/message";

import styles from "./module.Profil.module.css";
import ProfilMessage from "./ProfilMessage";

type Props = Readonly<{
  onAccountDeleted: () => void;
}>;

export default function ProfilAccountDeletion({
  onAccountDeleted,
}: Props) {
  const [motDePasse, setMotDePasse] = useState<string>("");
  const [confirmation, setConfirmation] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<Message>(null);

  const handleSubmit: ComponentProps<"form">["onSubmit"] = async (event) => {
    event.preventDefault();
    setMessage(null);

    /*
     * On ne fait pas trim() sur un mot de passe :
     * les espaces pourraient faire partie du véritable mot de passe.
     */
    if (!motDePasse) {
      setMessage({
        type: "error",
        text: "Saisissez votre mot de passe actuel.",
      });

      return;
    }

    if (!confirmation) {
      setMessage({
        type: "error",
        text: "Vous devez confirmer avoir compris les conséquences.",
      });

      return;
    }

    try {
      setIsLoading(true);

      await apiDeleteAccount({
        motDePasse,
      });

    
      onAccountDeleted();
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Impossible de supprimer le compte.";

      setMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className={`${styles.card} ${styles.dangerCard}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.dangerHeader}>
        <p className={styles.dangerEyebrow}>ZONE SENSIBLE</p>

        <h2>Supprimer mon compte</h2>

        <p id="account-deletion-description">
          Cette action supprimera vos entrées de journal, vos sessions et votre
          photo de profil. Votre compte sera ensuite anonymisé et désactivé.
        </p>
      </div>

      <ProfilMessage message={message} />

      <div className={styles.formGroup}>
        <label htmlFor="delete-account-password">
          Mot de passe actuel
        </label>

        <input
          id="delete-account-password"
          type="password"
          value={motDePasse}
          onChange={(event) => setMotDePasse(event.target.value)}
          autoComplete="current-password"
          disabled={isLoading}
          aria-describedby="account-deletion-description"
          required
        />
      </div>

      <label className={styles.deleteConfirmation}>
        <input
          type="checkbox"
          checked={confirmation}
          onChange={(event) => setConfirmation(event.target.checked)}
          disabled={isLoading}
        />

        <span>
          Je comprends que cette action est définitive et que mes données ne
          pourront pas être récupérées.
        </span>
      </label>

      <button
        type="submit"
        className={styles.deleteButton}
        disabled={isLoading || !motDePasse || !confirmation}
      >
        {isLoading
          ? "Suppression en cours..."
          : "Supprimer définitivement mon compte"}
      </button>
    </form>
  );
}