import { Text, View } from "react-native";
import { profileStyles } from "./module.profil.style";


export default function ProfilHeader(){

    return(
        <View style={profileStyles.header}>
            <View style={profileStyles.brandPill}>
              <Text style={profileStyles.brandPillText}>CESI ZEN</Text>
            </View>
        
            <Text style={profileStyles.title}>Mon profil</Text>
        
            <Text style={profileStyles.subtitle}>
                 Gérez vos informations personnelles et votre accès à l’application.
            </Text>
        </View>
    )
}