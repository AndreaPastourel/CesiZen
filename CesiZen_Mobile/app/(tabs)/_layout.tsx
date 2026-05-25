
import PrivateBottomBar from "@/components/Navigation/PrivateBottomBar";

import { Stack } from "expo-router";

import { View } from "react-native";

export default function TabsLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ressourcesList" />
        <Stack.Screen name="home" />
        <Stack.Screen name="trackerEmotion" />
         <Stack.Screen name="profil" />
        <Stack.Screen name="addTracker" />
         <Stack.Screen name="UpdateTracker/[id]" />

      </Stack>

      <PrivateBottomBar />
    </View>
  );
}