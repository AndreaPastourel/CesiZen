
import { ActivityIndicator, Text, View } from "react-native";
import { ressourcesStyles } from "./module.RessourcesList.style";

type Props = Readonly<{
  loading: boolean;
  message: string | null;
  empty: boolean;
}>;

export default function RessourceListMessage({loading,message,empty }: Props) {


 if (loading) {
   
    return (
    
      <View style={ressourcesStyles.loadingBox}>
        <ActivityIndicator />

        <Text style={ressourcesStyles.loadingText}>
          Chargement des ressources...
        </Text>
      </View>
    );
  }


  if (message) {
  
    return (
  
      <View style={ressourcesStyles.errorBox}>
        <Text style={ressourcesStyles.errorText}>{message}</Text>
      </View>
    );
  }


  if (empty) {
  
    return (
   
      <View style={ressourcesStyles.stateBox}>
        <Text style={ressourcesStyles.stateTitle}>Aucune ressource</Text>

        <Text style={ressourcesStyles.stateText}>
          Les ressources apparaîtront ici dès qu’elles seront disponibles.
        </Text>
      </View>
    );
  }

  return null;
}