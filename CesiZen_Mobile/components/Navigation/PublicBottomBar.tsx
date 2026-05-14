import { router, usePathname } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { navigationStyles } from "./module.navigation.style";



export default function PublicBottomBar() {
  const pathname = usePathname();

  const isRessourcesActive = pathname === "/ressourcesList";
  const isLoginActive = pathname === "/login";

  return (
    <View style={navigationStyles.publicBar}>
      <Pressable
        onPress={() => router.replace("/ressourcesList")}
        style={navigationStyles.navItem}
      >
        <Text
          style={[
            navigationStyles.navText,
            isRessourcesActive ? navigationStyles.navTextActive : null,
          ]}
        >
          Ressources
        </Text>
      </Pressable>

      <Pressable
        onPress={() => router.replace("/login")}
        style={navigationStyles.navItem}
      >
        <Text
          style={[
            navigationStyles.navText,
            isLoginActive ? navigationStyles.navTextActive : null,
          ]}
        >
          Connexion
        </Text>
      </Pressable>
    </View>
  );
}