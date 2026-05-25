
import { useEffect, useState } from "react";
import { TypeResources } from "../../../../../types/types";
import { Message } from '../../../../../types/message';
import { apiGetAllTypes } from "../../../../../services/typesRessourcesApi";
import styles from "./module.typeRessourcesList.module.css"
import TypesRessourcesListHeader from "./TypesRessourcesListHeader";
import TypesRessourcesListMessage from "./TypesRessourcesListMessage";
import TypesRessourcesListLoading from "./TypesRessourcesListLoading";
import TypesRessourcesListEmpty from "./TypesRessourcesListEmpty";
import TypesRessourcesListCard from "./TypesRessourcesListCard";



export default function TypesRessourcesList() {

  const [typesRessources, setTypesRessources] = useState<TypeResources[]>([]);
  const [message, setMessage] = useState<Message>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    loadTypesRessources();
  }, []);


  async function loadTypesRessources() {
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await apiGetAllTypes();

      setTypesRessources(response.data);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Impossible de récupérer les types de ressources.";

      setMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className={styles.listPage}>
     
     <TypesRessourcesListHeader/>
     
    <TypesRessourcesListMessage
    message={message}
    />

     <TypesRessourcesListLoading
     isLoading={isLoading} />

    <TypesRessourcesListEmpty
    isLoading={isLoading}
    typesRessources={typesRessources}
    />

      {!isLoading && typesRessources.length > 0 && (
       <TypesRessourcesListCard
       typesRessources={typesRessources}
       />
      )}
    </main>
  );
}