import { Text, View } from "react-native";
import { emotionJournalStyles } from "./module.TrackerList.style";

type Props={
    isEmpty : boolean
}


export default function TrackerListEmpty({isEmpty}:Readonly<Props>){
    if (!isEmpty) return null;
    return(
         
          <View style={emotionJournalStyles.stateBox}>
            <Text style={emotionJournalStyles.stateTitle}>
              Aucune émotion enregistrée
            </Text>

            <Text style={emotionJournalStyles.stateText}>
              Vos futures entrées du journal apparaîtront ici.
            </Text>
          </View>
        
    )
}