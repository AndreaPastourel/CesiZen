import {  useNavigate } from "react-router-dom"
import styles from "./module.typeRessourcesForm.module.css"


type Props = {
    isLoading : boolean,
    isEditMode:boolean,
}


export default function TypesRessourcesFormAction({isLoading,isEditMode}:Readonly<Props>){
     const navigate = useNavigate();

    return(
          <div className={styles.actions}>
          <button
            type="submit"
            className={styles.primaryButton}
            disabled={isLoading}
          >
            {isLoading
              ? "Enregistrement..."
              : isEditMode
                ? "Modifier le type"
                : "Créer le type"}
          </button>

          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => navigate("/admin/ressources/types")}
          >
            Retour
          </button>
        </div>
    )
}