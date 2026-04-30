import PropTypes from "prop-types";
import styles from "./module.loginStyle.module.css";

export default function LoginFields({ email, password, setEmail, setPassword }) {
  return (
    <>
      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="email">
          Adresse email
        </label>

        <input
          className={styles.formInput}
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="exemple@email.com"
          autoComplete="email"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="password">
          Mot de passe
        </label>

        <input
          className={styles.formInput}
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Votre mot de passe"
          autoComplete="current-password"
          required
        />
      </div>
    </>
  );
}

LoginFields.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
};