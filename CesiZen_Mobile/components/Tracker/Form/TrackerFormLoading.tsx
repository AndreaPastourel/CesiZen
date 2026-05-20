import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { addTrackerStyles } from "./module.TrackerForm.style";

export default function TrackerFormLoading() {
  return (
    <SafeAreaView style={addTrackerStyles.screen}>
      <View style={addTrackerStyles.loadingBox}>
        <ActivityIndicator />

        <Text style={addTrackerStyles.loadingText}>
          Chargement des émotions...
        </Text>
      </View>
    </SafeAreaView>
  );
}