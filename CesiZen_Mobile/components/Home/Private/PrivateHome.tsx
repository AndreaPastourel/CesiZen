import { getCurrentUser } from "@/services/userStorage";
import { User } from "@/types/users";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator,Image,Pressable,ScrollView,Text,View,} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { homeStyles } from "@/components/Home/module.home.style";

export default function PrivateHome() {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  async function loadUser() {
    const currentUser = await getCurrentUser();

    setUser(currentUser);

    setLoading(false);
  }

  useEffect(() => {
    loadUser();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={homeStyles.screen}>
        <View style={homeStyles.loadingBox}>
          <ActivityIndicator />

          <Text style={homeStyles.loadingText}>Chargement...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={homeStyles.screen}>
      <ScrollView
        contentContainerStyle={homeStyles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={homeStyles.decorCircleTop} />

        <View style={homeStyles.decorCircleBottom} />

        <View style={homeStyles.logoBox}>
          <Image
            source={require("../../../assets/images/logo-cesi-zen.png")}
            style={homeStyles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={homeStyles.brandPill}>
          <Text style={homeStyles.brandPillText}>CESI ZEN</Text>
        </View>

        <Text style={homeStyles.title}>
          Bon retour{user?.pseudo ? `, ${user.pseudo}` : ""}.
        </Text>

        <Text style={homeStyles.subtitle}>
          Retrouvez vos ressources, suivez votre journal d’émotion et prenez un
          instant pour faire le point sur votre équilibre mental.
        </Text>

        <View style={homeStyles.card}>
          <Text style={homeStyles.cardTitle}>Votre espace personnel</Text>

          <Text style={homeStyles.cardText}>
            CESI Zen vous aide à garder une trace de vos émotions, à mieux
            comprendre vos ressentis et à accéder à des ressources adaptées à
            votre bien-être.
          </Text>

          <Pressable
            onPress={() => router.replace("/(tabs)/ressourcesList")}
            style={({ pressed }) => [
              homeStyles.primaryButton,
              pressed ? homeStyles.buttonPressed : null,
            ]}
          >
            <Text style={homeStyles.primaryButtonText}>
              Continuer vers les ressources
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.replace("/(tabs)/trackerEmotion")}
            style={({ pressed }) => [
              homeStyles.secondaryButton,
              pressed ? homeStyles.buttonPressed : null,
            ]}
          >
            <Text style={homeStyles.secondaryButtonText}>
              Ouvrir mon journal d’émotion
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.replace("/(tabs)/profil")}
            style={({ pressed }) => [
              homeStyles.linkButton,
              pressed ? homeStyles.buttonPressed : null,
            ]}
          >
            <Text style={homeStyles.linkButtonText}>Voir mon profil</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}