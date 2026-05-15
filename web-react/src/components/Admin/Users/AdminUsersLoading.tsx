
import styles from "./module.AdminUsers.module.css";

type Props= {
    isLoading: boolean,
}


export default function AdminUsersLoading({isLoading}:Props){

    if(!isLoading) return null 
    return(
        <p className={styles.loadingMessage}>Chargement des utilisateurs...</p>

    )
}