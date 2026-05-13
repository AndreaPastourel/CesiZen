import styles from "./module.Profil.module.css";

type Props = {
    isLoading: boolean,
}

export default function ProfilLoading({isLoading}:Props){
    if (!isLoading) return null;

    return(
        <p className={styles.loadingMessage}>Chargement du profil...</p>
    )
}