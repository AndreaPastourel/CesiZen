

import { ActivityIndicator, SafeAreaViewBase, Text, View } from "react-native";
import { ressourceDetailStyles } from "./module.RessourceDetail.style";


 type Props={
    isLoading : boolean,
}

export default function DetailLoading({isLoading}:Readonly<Props>){
    if (!isLoading) return null;

    return(
        <SafeAreaViewBase style={ressourceDetailStyles.screen}>
            <View style={ressourceDetailStyles.centerBox}>
                <ActivityIndicator />
                <Text style={ressourceDetailStyles.loadingText}>
                    Chargement de la ressource...
                  </Text>
                </View>
              </SafeAreaViewBase>
            
    )
}