import { Message } from "@/types/message"
import { emotionJournalStyles } from "./module.TrackerList.style";
import { Text,View } from "react-native";

type Props={
    message:Message,
}

export default function TrackerListMessage({message}:Readonly<Props>){

        if(!message) return null;
    return(
    
        <View
           style={
            message.type === "success"
           ? emotionJournalStyles.successBox
            : emotionJournalStyles.errorBox
             }
        >
        <Text
            style={
                message.type === "success"
                ? emotionJournalStyles.successText
                 : emotionJournalStyles.errorText
                }
             >
                {message.text}
            </Text>
             </View>
    )
}