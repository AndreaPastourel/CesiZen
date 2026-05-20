
import { router, usePathname } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { navigationStyles } from "./module.navigation.style";

export default function PrivateBottomBar() {

  const pathname = usePathname();


  const isRessourcesActive = pathname === "/ressourcesList" || pathname === "/(tabs)/ressourcesList";
  const isTrackerEmotionActive = pathname === "/TrackerEmotion" || pathname === "/(tabs)/TrackerEmotion";
  const isProfileActive = pathname === "/profile" || pathname === "/(tabs)/profile";


  return (
    <View style={navigationStyles.privateBarContainer}>
      <View style={navigationStyles.privateBar}>
        <Pressable
          onPress={() => router.replace("/(tabs)/ressourcesList")}
          style={navigationStyles.privateBarItem}
        >
          <View
            style={[
              navigationStyles.privateIconDot,
              isRessourcesActive ? navigationStyles.privateIconDotActive : null,
            ]}
          />

          <Text
            style={[
              navigationStyles.privateBarText,
              isRessourcesActive ? navigationStyles.privateBarTextActive : null,
            ]}
          >
            Ressources
          </Text>
        </Pressable>


          <Pressable
          onPress={() => router.replace("/(tabs)/trackerEmotion")}
          style={navigationStyles.privateBarItem}
        >
          <View
            style={[
              navigationStyles.privateIconDot,
              isTrackerEmotionActive ? navigationStyles.privateIconDotActive : null,
            ]}
          />

          <Text
            style={[
              navigationStyles.privateBarText,
              isTrackerEmotionActive ? navigationStyles.privateBarTextActive : null,
            ]}
          >
            Journal des emotions
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.replace("/(tabs)/profil")}
          style={navigationStyles.privateBarItem}
        >
          <View
            style={[
              navigationStyles.privateIconDot,
              isProfileActive ? navigationStyles.privateIconDotActive : null,
            ]}
          />

          <Text
            style={[
              navigationStyles.privateBarText,
              isProfileActive ? navigationStyles.privateBarTextActive : null,
            ]}
          >
            Profil
          </Text>
        </Pressable>
      </View>
    </View>
  );
}