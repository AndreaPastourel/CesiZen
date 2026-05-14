import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import CreateRessourceForm from "../components/Ressources/Create/CreateRessourceForm";
import { apiGetProfile } from "../services/profilApi";
import { User } from "../types/users";

export default function CreateRessourcePage() {
  const [user, setUser] = useState<User | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  useEffect(() => {
    checkAdminAccess();
  }, []);

  async function checkAdminAccess() {
    try {
      const response = await apiGetProfile();

      const connectedUser = response.data;

      const isAdmin = connectedUser.role?.code === "ROLE_ADMIN";

      console.log("Utilisateur connecté :", connectedUser);
      console.log("Rôle utilisateur :", connectedUser.role);
      console.log("Est admin ?", isAdmin);

      if (!isAdmin) {
        setRedirectTo("/ressources");
        return;
      }

      setUser(connectedUser);
    } catch (error) {
      console.log("Erreur vérification admin :", error);

      setRedirectTo("/login");
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <p>Vérification des droits...</p>;
  }

  if (redirectTo) {
    return <Navigate to={redirectTo} replace />;
  }

  if (!user) {
    return <Navigate to="/ressources" replace />;
  }

  return <CreateRessourceForm />;
}