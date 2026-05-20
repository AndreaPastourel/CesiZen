
import { router } from "expo-router";
import { emotionJournalStyles } from "./module.TrackerList.style";
import { Pressable, Text,View} from "react-native";

export default function TrackerListHeader(){

    return(
         <View style={emotionJournalStyles.header}>
            <View style={emotionJournalStyles.brandPill}>
                <Text style={emotionJournalStyles.brandPillText}>CESI ZEN</Text>
            </View>
        
            <Text style={emotionJournalStyles.title}>Journal d’émotion</Text>
        
            <Text style={emotionJournalStyles.subtitle}>
                    Retrouvez vos émotions enregistrées et suivez leur évolution au fil
                    du temps.
            </Text>

            <Pressable
            onPress={() => router.push("/(tabs)/addTracker")}
            style={({ pressed }) => [
                emotionJournalStyles.addButton,
                pressed ? emotionJournalStyles.addButtonPressed : null,
            ]}
            >
            <Text style={emotionJournalStyles.addButtonText}>
                Ajouter une émotion
            </Text>
            </Pressable>
        </View>
    )
}