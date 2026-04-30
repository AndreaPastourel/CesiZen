import PropTypes from "prop-types";
import styles from "./module.loginStyle.module.css";

export default function LoginMessage({ message }) {
  if (!message) {
    return null;
  }

  const typeClass =
    message.type === "error"
      ? styles.loginMessageError
      : styles.loginMessageSuccess;

  return (
    <p className={`${styles.loginMessage} ${typeClass}`} role="alert">
      {message.text}
    </p>
  );
}

LoginMessage.propTypes = {
  message: PropTypes.shape({
    type: PropTypes.string,
    text: PropTypes.string,
  }),
};