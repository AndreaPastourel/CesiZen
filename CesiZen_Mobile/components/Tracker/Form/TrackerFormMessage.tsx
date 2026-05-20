import { Message } from "@/types/message"
import { Text, View } from "react-native";
import { addTrackerStyles } from "./module.TrackerForm.style";

type Props = {
    message : Message
}
export default function TrackerFormMessage({message}:Readonly<Props>){
    if (!message) return null;

    return(
        <View
        style={
            message.type === "success"
            ? addTrackerStyles.successBox
            : addTrackerStyles.errorBox
        }
        >
        <Text
            style={
            message.type === "success"
                ? addTrackerStyles.successText
                : addTrackerStyles.errorText
            }
        >
            {message.text}
        </Text>
        </View>
    )
    
}