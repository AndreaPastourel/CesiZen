import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { User } from "../../../../types/users";
import { Ressource } from "../../../../types/ressources";
import { Message } from "../../../../types/message";

import { apiGetProfile } from "../../../../services/profilApi";
import {
  apiGetAllRessources,
  apiUpdateRessourceActive,
} from "../../../../services/ressourcesApi";

import styles from "./module.AdminRessourcesList.module.css";

import AdminRessourcesHeader from "./AdminRessourcesHeader";
import AdminRessourcesMessage from "./AdminRessourcesMessage";
import AdminRessourcesLoading from "./AdminRessourcesLoading";
import AdminRessourcesEmpty from "./AdminRessourcesEmpty";
import AdminRessourcesTab from "./AdminRessourcesTab";

export default function AdminRessourcesList() {
  const [user, setUser] = useState<User | null>(null);
  const [ressources, setRessources] = useState<Ressource[]>([]);

  const [isCheckingAccess, setIsCheckingAccess] =
    useState<boolean>(true);

  const [isLoading, setIsLoading] =
    useState<boolean>(true);

  const [redirectTo, setRedirectTo] =
    useState<string | null>(null);

  const [message, setMessage] =
    useState<Message>(null);

  useEffect(() => {
    async function checkAdminAccess() {
      try {
        const response = await apiGetProfile();
        const connectedUser = response.data;

        const isAdmin =
          connectedUser.role?.code === "ROLE_ADMIN";

        if (!isAdmin) {
          setRedirectTo("/ressources");
          return;
        }

        setUser(connectedUser);

        setIsLoading(true);
        setMessage(null);

        try {
          const ressourcesResponse =
            await apiGetAllRessources();

          setRessources(
            ressourcesResponse.data ?? []
          );
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "Impossible de récupérer les ressources.";

          setMessage({
            type: "error",
            text: errorMessage,
          });
        } finally {
          setIsLoading(false);
        }
      } catch {
        setRedirectTo("/login");
      } finally {
        setIsCheckingAccess(false);
      }
    }

    checkAdminAccess();
  }, []);

  async function handleToggleActive(
    ressource: Ressource
  ) {
    const newValue = !ressource.est_actif;

    setMessage(null);

    try {
      const response =
        await apiUpdateRessourceActive(
          ressource.id,
          newValue
        );

      setRessources((currentRessources) =>
        currentRessources.map((item) =>
          item.id === ressource.id
            ? response.data
            : item
        )
      );

      setMessage({
        type: "success",
        text:
          response.message ||
          (newValue
            ? "La ressource a été activée."
            : "La ressource a été désactivée."),
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Impossible de modifier le statut de la ressource.";

      setMessage({
        type: "error",
        text: errorMessage,
      });
    }
  }

  if (isCheckingAccess) {
    return (
      <p className={styles.loadingPage}>
        Vérification des droits...
      </p>
    );
  }

  if (redirectTo) {
    return (
      <Navigate
        to={redirectTo}
        replace
      />
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/ressources"
        replace
      />
    );
  }

  return (
    <main className={styles.adminPage}>
      <AdminRessourcesHeader />

      <AdminRessourcesMessage
        message={message}
      />

      <AdminRessourcesLoading
        isLoading={isLoading}
      />

      <AdminRessourcesEmpty
        isLoading={isLoading}
        ressources={ressources}
      />

      {!isLoading && ressources.length > 0 && (
        <AdminRessourcesTab
          ressources={ressources}
          handleToggleActive={
            handleToggleActive
          }
        />
      )}
    </main>
  );
}