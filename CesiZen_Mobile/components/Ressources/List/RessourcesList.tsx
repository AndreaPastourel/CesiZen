import { apiGetAllRessources } from "@/services/ressourcesApi";
import { Ressource } from "@/types/ressources";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ressourcesStyles } from "./module.RessourcesList.style";
import RessourceListCard from "./RessourceListCard";
import RessourcesListHeader from "./RessourcesListHeader";
import RessourceListMessage from "./RessourcesListMessage";


export default function RessourcesList() {

  const [ressources, setRessources] = useState<Ressource[]>([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  async function loadRessources() {
    try {
   
      setError(null);

      const res = await apiGetAllRessources();

      setRessources(res.data);
    } catch (e: any) {
      setError(e?.message || "Impossible de charger les ressources.");
    } finally {
      setLoading(false);
    }
  }

  
  useEffect(() => {
   
    loadRessources();
  }, []);


  

  const isEmpty = !loading && !error && ressources.length === 0;

  return (
    <SafeAreaView style={ressourcesStyles.screen}>
      <ScrollView
        contentContainerStyle={ressourcesStyles.content}
      >
        <RessourcesListHeader />

        <RessourceListMessage
          loading={loading}
          message={error}
          empty={isEmpty}
        />

        {!loading &&
          !error &&
          ressources.map((ressource) => (
            <RessourceListCard
              key={ressource.id}
              ressource={ressource}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}