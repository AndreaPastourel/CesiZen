import { router } from "expo-router";

import { Pressable, SafeAreaViewBase, Text, View } from "react-native";
import { ressourceDetailStyles } from "./module.RessourceDetail.style";

type Props ={
    message: string|null
}

export default function DetailMessage({message}:Readonly<Props>){
    if (!message) return null;

    return (
    <SafeAreaViewBase style={ressourceDetailStyles.screen}>
        <View style={ressourceDetailStyles.content}>
            <Pressable style={ressourceDetailStyles.backButton} onPress={() => router.back()}>
             <Text style={ressourceDetailStyles.backButtonText}>Retour</Text>
            </Pressable>
        
        <View style={ressourceDetailStyles.errorBox}>
            <Text style={ressourceDetailStyles.errorText}>{message}</Text>
        </View>
        </View>
     </SafeAreaViewBase>
    )
}