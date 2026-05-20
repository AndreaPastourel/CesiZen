import { View, ActivityIndicator, Text } from 'react-native';
import { emotionJournalStyles } from "./module.TrackerList.style";

type Props={
    isloading: boolean,
}

export default function TrackerListLoading({isloading}:Readonly<Props>){

  if(!isloading) return null;

  return (
    <View style={emotionJournalStyles.stateBox}>
          <ActivityIndicator />

          <Text style={emotionJournalStyles.stateText}>
            Chargement du journal...
          </Text>
        </View>
                
    )
}