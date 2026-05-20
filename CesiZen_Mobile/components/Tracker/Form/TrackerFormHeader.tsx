import { Text, View } from "react-native"
import { addTrackerStyles } from "./module.TrackerForm.style"

type Props = {
    isEditMode : boolean,
}
export default function TrackerFormHeader({isEditMode}:Readonly<Props>){

    return(
         <View style={addTrackerStyles.header}>
            <View style={addTrackerStyles.brandPill}>
                <Text style={addTrackerStyles.brandPillText}>CESI ZEN</Text>
            </View>
        
            <Text style={addTrackerStyles.title}>
                {isEditMode ? "Modifier l’émotion" : "Ajouter une émotion"}
             </Text>
        
            <Text style={addTrackerStyles.subtitle}>
            {isEditMode
                    ? "Modifiez l’émotion ressentie, son intensité ou votre note."
                     : "Sélectionnez l’émotion ressentie, ajoutez une intensité et une courte note si besoin."}
             </Text>
        </View>
    )
}