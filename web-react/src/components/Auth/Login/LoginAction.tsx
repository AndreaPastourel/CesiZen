import { useNavigate } from "react-router-dom";
import styles from "../module.loginStyle.module.css";

type Props = {
  isLoading: boolean;
};


export default function LoginAction({ isLoading }: Readonly<Props>) {
   const navigate = useNavigate();
 
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
        onClick={() => navigate("/register")}
      >
        Créer un compte
      </button>
    </div>
  );
}