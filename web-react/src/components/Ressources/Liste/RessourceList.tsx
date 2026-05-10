import { useEffect, useState } from "react";
import { apiGetAllRessources } from "../../../services/ressourcesApi";
import { Ressource } from "../../../types/ressources";
import styles from "./module.ressourcesList.module.css";
import RessourcesHeader from "./RessourcesHeader";
import RessourcesMessage from "./RessourcesMessage";
import RessourceCard from "./RessourceCard";

type Message = {
  type: "error" | "success";
  text: string;
} | null;

export default function RessourcesList() {
  const [ressources, setRessources] = useState<Ressource[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<Message>(null);

  useEffect(() => {
    loadRessources();
  }, []);

  async function loadRessources() {
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await apiGetAllRessources();

      const ressourcesActives = response.data.filter(
        (ressource) => ressource.est_actif === true
        );

        setRessources(ressourcesActives);

      if (response.message) {
        setMessage({
          type: "success",
          text: response.message,
        });
      }
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
  }

  

  return (

   
    <main className={styles.ressourcesPage}>
         <RessourcesHeader
         isLoading={isLoading}
        />
        <RessourcesMessage
        message={message}
        />

      {!isLoading && ressources.length > 0 && (
        <section className={styles.grid} aria-label="Liste des ressources">
          {ressources.map((ressource) => (
            <RessourceCard key={ressource.id} ressource={ressource} />
          ))}
        </section>
      )}
    </main>
  );
}