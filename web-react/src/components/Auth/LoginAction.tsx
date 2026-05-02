import styles from "./loginStyle.module.css";

type Props = {
  isLoading: boolean;
};


export default function LoginAction({ isLoading }: Readonly<Props>) {
 
  return (
 
    <div className={styles.loginActions}>
      <button
        type="submit"
        className={styles.authButton}
        disabled={isLoading}
      >
        {isLoading ? "Connexion..." : "Se connecter"}
      </button>

      <button
        type="button"
        className={styles.authLinkButton}
      >
        Créer un compte
      </button>
    </div>
  );
}