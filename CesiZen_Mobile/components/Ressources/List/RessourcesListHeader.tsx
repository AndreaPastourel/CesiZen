import { Text, View } from "react-native";
import { ressourcesStyles } from "./module.RessourcesList.style";

export default function RessourcesListHeader(){
    return(
        
    <View style={ressourcesStyles.header}>

      <View style={ressourcesStyles.brandPill}>
        <Text style={ressourcesStyles.brandPillText}>CESI ZEN</Text>
      </View>


      <Text style={ressourcesStyles.title}>Ressources</Text>

      <Text style={ressourcesStyles.subtitle}>
        Retrouvez les contenus disponibles pour vous accompagner au quotidien.
      </Text>
    </View>
    )

}