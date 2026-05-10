import { router } from "expo-router";
import { Pressable, Text } from "react-native";
import { ressourceDetailStyles } from "./module.RessourceDetail.style";

export default function DetailRetour(){

    return(
        <Pressable style={ressourceDetailStyles.backButton} onPress={() => router.back()}>
          <Text style={ressourceDetailStyles.backButtonText}>Retour</Text>
        </Pressable>
    )
}