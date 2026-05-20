
import { useEffect, useState } from "react";
import {RefreshControl,ScrollView,} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { emotionJournalStyles } from "./module.TrackerList.style";
import TrackerListHeader from "./TrackerListHeader";
import { Message } from "@/types/message";
import TrackerListLoading from "./TrackerListLoading";
import TrackerListMessage from "./TrackerListMessage";
import TrackerListEmpty from "./TrackerListEmpty";
import { API_BASE_URL } from "@/config/api";
import { EntreeJournal } from "@/types/entreesJournal";
import TrackerListCard from "./TrackerListCard";
import { apiGetAllTracker } from "@/services/trackerApi";





export default function TrackerList() {


  const [entries, setEntries] = useState<EntreeJournal[]>([]);
  const [isloading, setIsloading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);


  async function loadEmotionJournal() {
    try {

      setMessage(null);

      const response = await apiGetAllTracker();


      setEntries(response.data);
    } catch (e: any) {
    
      setMessage({
      type: "error",
      text: e?.message || "Impossible de charger le journal d'émotion.",
    });
    } finally {
      setIsloading(false);

      setRefreshing(false);
    }
  }


  async function handleRefresh() {
    setRefreshing(true);
    await loadEmotionJournal();
  }


  useEffect(() => {
   
    loadEmotionJournal();
  }, []);


  function buildIconUrl(icone: string | null) {
  if (!icone) {
    return null;
  }

  const backendBaseUrl = API_BASE_URL.replace(/\/api\/?$/, "").replace(
    /\/$/,
    ""
  );

  if (icone.startsWith("http")) {
    return icone;
  }

  const formattedIcon = icone.startsWith("/") ? icone : "/" + icone;
  return backendBaseUrl + formattedIcon;
}


  

  const isEmpty = !isloading && !message && entries.length === 0;

 
  return (
    <SafeAreaView style={emotionJournalStyles.screen}>
      <ScrollView
        contentContainerStyle={emotionJournalStyles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
       <TrackerListHeader/>

      <TrackerListLoading 
      isloading={isloading}/>

      
      <TrackerListMessage
      message={message}/>

      <TrackerListEmpty
      isEmpty={isEmpty}/>
       

        {!isloading &&
          !message &&
          entries.map((entry) => {
           
            const emotionColor = entry.emotion?.couleur ?? "#5D7052";

  

            const emotionIcon =entry.emotion.icone
            const emotionIconUrl = buildIconUrl(emotionIcon);
            return (
              <TrackerListCard
              key={entry.id}
              entry={entry}
              emotionColor={emotionColor}
              emotionIconUrl={emotionIconUrl}

              />
              
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
}