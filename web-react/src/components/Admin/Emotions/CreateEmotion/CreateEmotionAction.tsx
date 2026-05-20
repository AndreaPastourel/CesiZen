import { useNavigate } from "react-router-dom";
import styles from "../module.createEmotion.module.css";

type Props = {
  isLoading: boolean,
  isEditMode: boolean,
};

export default function CreateEmotionAction({isLoading,isEditMode,}: Readonly<Props>) {
  const navigate = useNavigate();

  return (
    <div className={styles.actions}>
      <button
        type="submit"
        className={styles.primaryButton}
        disabled={isLoading}
      >
        {isLoading
          ? "Enregistrement..."
          : isEditMode
            ? "Modifier l’émotion"
            : "Créer l’émotion"}
      </button>

      <button
        type="button"
        className={styles.secondaryButton}
        onClick={() => navigate("/admin/emotions")}
      >
        Retour
      </button>
    </div>
  );
}