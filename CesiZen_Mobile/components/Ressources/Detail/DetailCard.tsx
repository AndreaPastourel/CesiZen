
import { Ressource } from "@/types/ressources";

import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { apiGetRessourceById } from "@/services/ressourcesApi";
import DetailEmpty from "./DetailEmpty";
import DetailHeader from "./DetailHeader";
import DetailInfo from "./DetailInfo";
import DetailLoading from "./DetailLoading";
import DetailMedia from "./DetailMedia";
import DetailMessage from "./DetailMessage";
import DetailRetour from "./DetailRetour";
import DetailText from "./DetailText";
import { ressourceDetailStyles } from "./module.RessourceDetail.style";


type Props= {
    id:number |null,
}

export default function DetailCard({id}:Readonly<Props>) {


  const [ressource, setRessource] = useState<Ressource | null>(null);
  const [isloading, setIsloading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  
  async function loadRessource() {

    if (!id) {
      setMessage("Ressource introuvable.");
      setIsloading(false);

      return;
    }

    try {
    
      setMessage(null);

    
      const response = await apiGetRessourceById(id);

      setRessource(response.data);
    } catch (e: any) {
  
      setMessage(e?.message || "Impossible de charger la ressource.");
    } finally {
      setIsloading(false);
    }
  }


  useEffect(() => {
    loadRessource();
  }, [id]);




  if (!ressource) {
 
    return (
      <DetailEmpty/>
    );
  }

  return (

        

    <SafeAreaView style={ressourceDetailStyles.screen}>
      <ScrollView contentContainerStyle={ressourceDetailStyles.content}>
        
        <DetailRetour/>

        <DetailLoading 
        isLoading={isloading}
        />

        <DetailMessage 
        message={message}
        />

       <DetailHeader 
         ressource={ressource}
         />

      <DetailInfo
        ressource={ressource}
        />

        <DetailText
        ressource={ressource}
        />

        <DetailMedia
        ressource={ressource}
        />
      </ScrollView>
    </SafeAreaView>
  );
}