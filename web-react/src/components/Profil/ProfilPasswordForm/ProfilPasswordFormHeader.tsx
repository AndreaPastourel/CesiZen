import styles from "../module.Profil.module.css";

export default function ProfilPasswordFormHeader(){

    return(
        <div className={styles.cardHeader}>
        <h2>Sécurité</h2>

        <p>Modifiez votre mot de passe pour sécuriser votre compte.</p>
      </div>
    )
}