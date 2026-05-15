import { User } from "../../../types/users";
import styles from "./module.AdminUsers.module.css";

type Props= {
    user: User,
    handleToggleActive: (user: User) => Promise<void>;
    handleToggleAdmin: (user: User) => Promise<void>;
    isAdmin : boolean
}



export default function AdminUsersCard({user,handleToggleActive,handleToggleAdmin,isAdmin }:Readonly<Props>){


return(
     <article className={styles.tableRow} key={user.id}>
                <div className={styles.userCell}>
                  <strong>{user.pseudo}</strong>

                  <small>
                    {[user.prenom, user.nom].filter(Boolean).join(" ") ||
                      "Nom non renseigné"}
                  </small>
                </div>

                <span>{user.email}</span>

                <span>{user.role?.libelle ?? user.role?.code}</span>

                <label className={styles.switch} aria-label={`Compte actif pour ${user.pseudo}`}>
                  <input
                    type="checkbox"
                    checked={user.est_actif}
                    onChange={() => handleToggleActive(user)}
                    aria-label={`Compte actif pour ${user.pseudo}`}
                  />

                  <span className={styles.slider}></span>
                </label>

                <label className={styles.switch} aria-label={`Admin pour ${user.pseudo}`}>
                  <input
                    type="checkbox"
                    checked={isAdmin}
                    onChange={() => handleToggleAdmin(user)}
                    aria-label={`Admin pour ${user.pseudo}`}
                  />

                  <span className={styles.slider}></span>
                </label>
              </article>
)
}