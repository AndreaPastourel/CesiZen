import PropTypes from "prop-types";
import styles from "./module.loginStyle.module.css";

export default function LoginAction({ isLoading }) {
  return (
    <div className={styles.loginActions}>
      <button type="submit" className={styles.authButton} disabled={isLoading}>
        {isLoading ? "Connexion..." : "Se connecter"}
      </button>

      <button type="button" className={styles.authLinkButton}>
        Créer un compte
      </button>
    </div>
  );
}

LoginAction.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};