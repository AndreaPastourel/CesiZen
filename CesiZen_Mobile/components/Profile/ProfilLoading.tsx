import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { profileStyles } from "./module.profil.style";


export default function ProfilLoading(){
    return(
        <SafeAreaView style={profileStyles.screen}>
        <View style={profileStyles.loadingBox}>
          <ActivityIndicator />
          <Text style={profileStyles.loadingText}>Chargement du profil...</Text>
        </View>
      </SafeAreaView>
    )
}