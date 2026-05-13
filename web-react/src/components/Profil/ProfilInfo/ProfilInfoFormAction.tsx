import styles from "../module.Profil.module.css";

type Props= {
    isLoading:boolean,
}

export default function ProfilInfoFormAction({isLoading}:Props){

    return(
         <button className={styles.primaryButton} type="submit" disabled={isLoading}>
        {isLoading ? "Enregistrement..." : "Enregistrer les modifications"}
      </button>
    )
}