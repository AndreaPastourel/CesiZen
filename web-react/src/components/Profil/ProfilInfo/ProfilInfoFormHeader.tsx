import styles from "../module.Profil.module.css";

export default function ProfilInfoFormHeader(){

    return(
        <div className={styles.cardHeader}>
        <h2>Informations personnelles</h2>

        <p>Modifiez les informations liées à votre compte.</p>
      </div>
    )
}