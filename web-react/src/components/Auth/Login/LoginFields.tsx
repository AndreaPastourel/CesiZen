import { useState } from "react";
import styles from "../module.loginStyle.module.css";

type Props = {
  email: string;
  password: string;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
};

export default function LoginFields({
  email,
  password,
  setEmail,
  setPassword,
}: Readonly<Props>) {
  const [showPassword, setShowPassword] = useState(false);

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

        <div className={styles.passwordWrapper}>
          <input
            className={styles.formInput}
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Votre mot de passe"
            autoComplete="current-password"
            required
          />

          <button
            type="button"
            className={styles.passwordToggle}
            onClick={() => setShowPassword((previous) => !previous)}
            aria-label={
              showPassword
                ? "Masquer le mot de passe"
                : "Afficher le mot de passe"
            }
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
      </div>
    </>
  );
}