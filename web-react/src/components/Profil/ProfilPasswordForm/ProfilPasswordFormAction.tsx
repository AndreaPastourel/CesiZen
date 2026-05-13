import styles from "../module.Profil.module.css";

type Props= {
    isLoading:boolean,
}
export default function ProfilPasswordFormAction({isLoading}:Props){

    return ( <button className={styles.primaryButton} type="submit" disabled={isLoading}>
        {isLoading ? "Modification..." : "Modifier le mot de passe"}
      </button>)
}