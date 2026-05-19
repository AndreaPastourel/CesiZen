import { useNavigate } from "react-router-dom";
import styles from "../module.createEmotion.module.css";

type Props = {
    isLoading : boolean,
}

export default function CreateTypeEmotionAction({isLoading}:Readonly<Props>){
   const  navigate=useNavigate()

    return(
        <div className={styles.actions}>
          <button type="submit" className={styles.primaryButton} disabled={isLoading}>
            {isLoading ? "Création..." : "Créer le type"}
          </button>

          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => navigate("/admin/emotions")}
          >
            Retour
          </button>
        </div>
    )
}