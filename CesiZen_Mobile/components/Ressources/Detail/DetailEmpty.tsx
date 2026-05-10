import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DetailRetour from "./DetailRetour";
import { ressourceDetailStyles } from "./module.RessourceDetail.style";

export default function DetailEmpty(){

    return(
        <SafeAreaView style={ressourceDetailStyles.screen}>
                <View style={ressourceDetailStyles.content}>
                 <DetailRetour/>

                  <View style={ressourceDetailStyles.errorBox}>
                    <Text style={ressourceDetailStyles.errorText}>Ressource introuvable.</Text>
                  </View>
                </View>
              </SafeAreaView>
    )
}