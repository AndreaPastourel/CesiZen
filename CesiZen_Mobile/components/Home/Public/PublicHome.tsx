import { router } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { homeStyles } from "../module.home.style";


export default function PublicHome() {
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
          Prenez soin de votre équilibre mental.
        </Text>

        <Text style={homeStyles.subtitle}>
          CESI Zen vous accompagne avec des ressources, un journal d’émotion et
          un espace personnel pour mieux comprendre vos ressentis au quotidien.
        </Text>

        <View style={homeStyles.card}>
          <Text style={homeStyles.cardTitle}>Découvrir l’application</Text>

          <Text style={homeStyles.cardText}>
            Consultez librement les ressources disponibles, puis connectez-vous
            pour enregistrer vos émotions, suivre votre journal et accéder à
            votre profil.
          </Text>

          <Pressable
            onPress={() => router.replace("/ressourcesList")}
            style={({ pressed }) => [
              homeStyles.primaryButton,
              pressed ? homeStyles.buttonPressed : null,
            ]}
          >
            <Text style={homeStyles.primaryButtonText}>
              Voir les ressources
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.replace("/login")}
            style={({ pressed }) => [
              homeStyles.secondaryButton,
              pressed ? homeStyles.buttonPressed : null,
            ]}
          >
            <Text style={homeStyles.secondaryButtonText}>Se connecter</Text>
          </Pressable>

          <Pressable
            onPress={() => router.replace("/register")}
            style={({ pressed }) => [
              homeStyles.linkButton,
              pressed ? homeStyles.buttonPressed : null,
            ]}
          >
            <Text style={homeStyles.linkButtonText}>Créer un compte</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}