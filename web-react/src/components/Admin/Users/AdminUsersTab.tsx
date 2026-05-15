
import { User } from "../../../types/users";
import AdminUsersCard from "./AdminUsersCard";
import styles from "./module.AdminUsers.module.css";

type Props= {
    users: User[],
    handleToggleActive: (user: User) => Promise<void>;
    handleToggleAdmin: (user: User) => Promise<void>;
}




export default function AdminUsersTab({users,handleToggleActive,handleToggleAdmin}:Readonly<Props>){


    return(

          <section className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <span>Utilisateur</span>
            <span>Email</span>
            <span>Rôle</span>
            <span>Compte actif</span>
            <span>Admin</span>
          </div>

          {users.map((user) => {
            const isAdmin = user.role?.code === "ROLE_ADMIN";

            return (
                <AdminUsersCard
                key={user.id}
                user={user}
                handleToggleActive={handleToggleActive}
                handleToggleAdmin={handleToggleAdmin}
                isAdmin={isAdmin}
                />

            );
          })}
        </section>
    )
}