import { useNavigate } from "react-router-dom";
import styles from "../module.loginStyle.module.css";




type Props= {
    isLoading: boolean,
}


export default function RegisterAction({isLoading}: Readonly<Props>){
     const navigate = useNavigate();
    return(
        <div className={styles.LoginAction}>
            <button type="submit" className={styles.authButton} disabled={isLoading}>
                {isLoading ? "Création..." : "Créer mon compte"}
            </button>

        <button  
        type="button"
        className={styles.authLinkButton}
        onClick={() => navigate("/login")}
        >
            J’ai déjà un compte
        </button>
        </div>
    )
}