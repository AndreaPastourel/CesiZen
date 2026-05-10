import { formatDate } from "@/config/Format";
import { Ressource } from "@/types/ressources";

import { Text, View } from "react-native";
import { ressourceDetailStyles } from "./module.RessourceDetail.style";

type Props = {
    ressource:Ressource
}

export default function DetailInfo({ressource}:Readonly<Props>){


    return (
        <View style={ressourceDetailStyles.card}>
            <Text style={ressourceDetailStyles.sectionTitle}>Informations</Text>
        
            <Text style={ressourceDetailStyles.metaText}>
            <Text style={ressourceDetailStyles.metaStrong}>Catégorie : </Text>
                {ressource.categorie?.nom ?? "Non renseignée"}
            </Text>
        
            <Text style={ressourceDetailStyles.metaText}>
            <Text style={ressourceDetailStyles.metaStrong}>Auteur : </Text>
                {ressource.auteur?.pseudo ?? "Non renseigné"}
            </Text>
        
            <Text style={ressourceDetailStyles.metaText}>
            <Text style={ressourceDetailStyles.metaStrong}>Publié le : </Text>
                {formatDate(ressource.date_publication)}
            </Text>
        
            <Text style={ressourceDetailStyles.metaText}>
            <Text style={ressourceDetailStyles.metaStrong}>Statut : </Text>
                {ressource.est_actif ? "Active" : "Inactive"}
            </Text>
        </View>
    )
}