import { Ressource } from "@/types/ressources"
import { Text, View } from "react-native"
import { ressourceDetailStyles } from "./module.RessourceDetail.style"


type Props={
    ressource:Ressource,
}

export default function DetailHeader({ressource}:Readonly<Props>){

    return(
        <View style={ressourceDetailStyles.header}>
            <Text style={ressourceDetailStyles.badge}>
                {ressource.type?.libelle ?? "Ressource"}
            </Text>
        
            <Text style={ressourceDetailStyles.title}>{ressource.titre}</Text>
        
            <Text style={ressourceDetailStyles.resume}>
                 {ressource.resume || "Aucun résumé disponible."}
            </Text>
        </View>
    )
}