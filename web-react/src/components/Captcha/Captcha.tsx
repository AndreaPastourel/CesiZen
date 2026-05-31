import { useEffect, useState } from "react";

import styles from "./module.Captcha.module.css";

type Props = {
  onValidationChange: (isValid: boolean) => void;
  resetKey: number;
};

export default function Captcha({
  onValidationChange,
  resetKey,
}: Readonly<Props>) {
  const [firstNumber, setFirstNumber] = useState<number>(0);
  const [secondNumber, setSecondNumber] = useState<number>(0);
  const [answer, setAnswer] = useState<string>("");

  useEffect(() => {
    generateCaptcha();
  }, [resetKey]);

  useEffect(() => {
    const expectedAnswer = firstNumber + secondNumber;
    const userAnswer = Number(answer);

    const isValid =
      answer.trim() !== "" &&
      !Number.isNaN(userAnswer) &&
      userAnswer === expectedAnswer;

    onValidationChange(isValid);
  }, [answer, firstNumber, secondNumber, onValidationChange]);

  function generateCaptcha() {
    const randomFirstNumber = Math.floor(Math.random() * 9) + 1;
    const randomSecondNumber = Math.floor(Math.random() * 9) + 1;

    setFirstNumber(randomFirstNumber);
    setSecondNumber(randomSecondNumber);
    setAnswer("");

    onValidationChange(false);
  }

  return (
    <div className={styles.captchaBox}>
      <div className={styles.captchaHeader}>
        <label htmlFor="captcha">Vérification anti-robot</label>

        <button
          type="button"
          className={styles.refreshButton}
          onClick={generateCaptcha}
          aria-label="Générer un nouveau captcha"
        >
          ↻
        </button>
      </div>

      <p className={styles.question}>
        Combien font <strong>{firstNumber}</strong> +{" "}
        <strong>{secondNumber}</strong> ?
      </p>

      <input
        id="captcha"
        type="number"
        value={answer}
        onChange={(event) => setAnswer(event.target.value)}
        placeholder="Votre réponse"
        className={styles.input}
        required
      />
    </div>
  );
}