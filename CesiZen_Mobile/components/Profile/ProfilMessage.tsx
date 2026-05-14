import { Message } from "@/types/message";
import { Text, View } from "react-native";
import { profileStyles } from "./module.profil.style";

type Props= {
    message:Message
}

export default function ProfilMessage({message}:Props){

    if (!message) return null;
    return(
        <View style={ message.type === "success"? profileStyles.successBox: profileStyles.errorBox}>
            <Text style={ message.type === "success"? profileStyles.successText: profileStyles.errorText }>
                {message.text}
             </Text>
        </View>
           
    )
}