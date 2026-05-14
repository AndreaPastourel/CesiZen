import PublicBottomBar from "@/components/Navigation/PublicBottomBar";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

export default function RootLayout() {
  const segments = useSegments();

  const isPrivateTabs = segments[0] === "(tabs)";
  const isRessourceDetail = segments[0] === "ressources";

  const showPublicBottomBar = !isPrivateTabs && !isRessourceDetail;

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="ressourcesList" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="ressources/[id]" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>

      {showPublicBottomBar ? <PublicBottomBar /> : null}

      <StatusBar style="dark" />
    </ThemeProvider>
  );
}