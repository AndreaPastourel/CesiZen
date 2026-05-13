import styles from "./module.Profil.module.css";

type Props={
     handleLogout: () => Promise<void>,
    isLoading:boolean,
}


export default function ProfilLogoutButton({handleLogout,isLoading}:Props){

    return(
         
    <button
      type="button"
      className={styles.logoutButton}
      onClick={handleLogout}
      disabled={isLoading}
    >
      {isLoading ? "Déconnexion..." : "Se déconnecter"}
    </button>
    )

}