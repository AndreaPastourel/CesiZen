import PropTypes from "prop-types";
import styles from "./module.loginStyle.module.css";

export default function LoginHeader({ title, subtitle }) {
  return (
    <div className={styles.loginHeader}>
      <h1 className={styles.authTitle}>{title}</h1>
      <p className={styles.authIntro}>{subtitle}</p>
    </div>
  );
}

LoginHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};