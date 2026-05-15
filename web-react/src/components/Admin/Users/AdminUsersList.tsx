import { useEffect, useState } from "react";
import styles from "./module.AdminUsers.module.css";
import { User } from "../../../types/users";
import { Message } from "../../../types/message";
import { apiGetAdminUsers, apiUpdateUserActive, apiUpdateUserRole } from "../../../services/usersApi";
import AdminUsersHeader from "./AdminUsersHeader";
import AdminUsersMessage from "./AdminUsersMessage";
import AdminUsersLoading from "./AdminUsersLoading";
import AdminUsersTab from "./AdminUsersTab";

export default function AdminUsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<Message>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await apiGetAdminUsers();

      setUsers(response.data);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Impossible de récupérer les utilisateurs.";

      setMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleToggleActive(user: User) {
    const newValue = !user.est_actif;

    setMessage(null);

    try {
      const response = await apiUpdateUserActive(user.id, newValue);

      setUsers((currentUsers) =>
        currentUsers.map((item) =>
          item.id === user.id ? response.data : item
        )
      );

      setMessage({
        type: "success",
        text:
          response.message ||
          (newValue
            ? "Le compte utilisateur a été activé."
            : "Le compte utilisateur a été désactivé."),
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Impossible de modifier le statut du compte.";

      setMessage({
        type: "error",
        text: errorMessage,
      });
    }
  }

  async function handleToggleAdmin(user: User) {
    const isCurrentlyAdmin = user.role?.code === "ROLE_ADMIN";

    const newRole = isCurrentlyAdmin ? "ROLE_USER" : "ROLE_ADMIN";

    setMessage(null);

    try {
      const response = await apiUpdateUserRole(user.id, newRole);

      setUsers((currentUsers) =>
        currentUsers.map((item) =>
          item.id === user.id ? response.data : item
        )
      );

      setMessage({
        type: "success",
        text:
          response.message ||
          (newRole === "ROLE_ADMIN"
            ? "L’utilisateur est maintenant administrateur."
            : "Les droits administrateur ont été retirés."),
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Impossible de modifier le rôle de l’utilisateur.";

      setMessage({
        type: "error",
        text: errorMessage,
      });
    }
  }

  return (
    <main className={styles.adminPage}>
      <AdminUsersHeader/>

     <AdminUsersMessage 
     message={message}/>

   <AdminUsersLoading 
    isLoading={isLoading}/>

      {!isLoading && users.length === 0 && (
        <p className={styles.emptyMessage}>Aucun utilisateur trouvé.</p>
      )}

      {!isLoading && users.length > 0 && (
      <AdminUsersTab
      users={users}
      handleToggleActive={handleToggleActive}
      handleToggleAdmin={handleToggleAdmin}
      />
      )}
    </main>
  );
}