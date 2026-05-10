import { Ressource } from "@/types/ressources"
import { Text, View } from "react-native"
import { ressourceDetailStyles } from "./module.RessourceDetail.style"

type Props={
    ressource:Ressource
}

export default function DetailText({ressource}:Readonly<Props>){
    if (!ressource.contenu_texte) return null 

    return(
        
        <View style={ressourceDetailStyles.card}>
            <Text style={ressourceDetailStyles.sectionTitle}>Contenu</Text>
            <Text style={ressourceDetailStyles.contentText}>
             {ressource.contenu_texte}
            </Text>
            </View>
    )
}