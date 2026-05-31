
import { useEffect, useState } from "react";

import styles from "./module.ressourcesDetail.module.css";
import DetailRetour from "./DetailRetour";
import DetailLoading from "./DetailLoading";
import DetailMessage from "./DetailMessage";
import DetailHeader from "./DetailHeader";
import DetailInfo from "./DetailInfo";
import DetailMedia from "./DetailMedia";
import DetailText from "./DetailText";
import { Ressource } from "../../../types/ressources";
import { apiGetRessourceBySlug } from "../../../services/ressourcesApi";
import { Message } from '../../../types/message';


type Props ={
    slug : string |null; 
}

export default function DetailCard({slug}:Props) {


  const [ressource, setRessource] = useState<Ressource | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<Message>(null);

  useEffect(() => {
   
    loadRessource();
  }, [slug]);


  async function loadRessource() {
  
    setIsLoading(true);
    setMessage(null);

    if (!slug) {
      setMessage({
        type: "error",
        text: "Ressource introuvable.",
      });

      setIsLoading(false);

      return;
    }


    try {

      const response = await apiGetRessourceBySlug(slug);

  
      const data = response.data;

      if (!data.est_actif) {
        setMessage({
          type: "error",
          text: "Cette ressource n’est pas disponible.",
        });

      
        setRessource(null);

      
        return;
      }

      setRessource(data);
    } catch (error) {
  
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Impossible de récupérer la ressource.";

      setMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
    
      setIsLoading(false);
    }
  }

  


  return (
   
    <main className={styles.detailPage}>
        <DetailRetour/>

        <DetailLoading
        isLoading={isLoading}
        />
        
        <DetailMessage
        message={message}
        />


      {!isLoading && ressource && (
        <article className={styles.detailCard}>
        
            <DetailHeader
            ressource={ressource}
            />
          
         <DetailInfo
            ressource={ressource}
            />
         
          <DetailMedia
            ressource={ressource}
            />
          

          <DetailText
            ressource={ressource}
            />
         
        </article>
      )}
    </main>
  );
}