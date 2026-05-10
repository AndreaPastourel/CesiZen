
import { apiLogin } from "@/services/authApi";
import { saveAccessToken } from "@/services/authStorage";
import { isEmailValid, isPasswordValid } from "@/utils/validators";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useState } from "react";
import { Text, View } from "react-native";
import LoginAction from "./LoginAction";
import { LoginFields } from "./LoginFields";
import LoginHeader from "./LoginHeader";
import { LoginMessage } from "./LoginMessage";

type Props = {
  styles: any;
};

export default function LoginForm({ styles }: Readonly<Props>) {
  //validatioon de la creation de compte
  const params = useLocalSearchParams();
  const initialMessage =
  params.registered === "1"
    ? "Inscription réussie ✅ Vous pouvez maintenant vous connecter."
    : null;


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
 const [message, setMessage] = useState<string | null>(initialMessage);




  const handleLogin = useCallback(async () => {
    setMessage(null);
    setLoading(true);

    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      setLoading(false);
      setMessage("Email et mot de passe obligatoires.");
      return;
    }

    if (!isEmailValid(cleanEmail)) {
      setLoading(false);
      setMessage("Format d'email invalide.");
      return;
    }

    if (!isPasswordValid(cleanPassword)) {
      setLoading(false);
      setMessage("Mot de passe trop court, minimum 6 caractères.");
      return;
    }

    try {
      const result = await apiLogin({
        email: cleanEmail,
        motDePasse: cleanPassword,
      });

      await saveAccessToken(result.data.token);

      setMessage("Connexion OK ✅");

      router.replace("/(tabs)");
    } catch (e: any) {
      setMessage(e?.message ?? "Impossible de se connecter.");
    } finally {
      setLoading(false);
    }
  }, [email, password]);

  return (
    <View style={styles.container}>
      <View style={styles.brandPill}>
        <Text style={styles.brandPillText}>CESI ZEN</Text>
      </View>

      <Text style={styles.heroTitle}>Prenez soin de votre équilibre mental.</Text>

      <Text style={styles.heroSubtitle}>
        Connecte-toi pour accéder à ton espace personnel et retrouver tes ressources.
      </Text>

      <View style={styles.card}>
        <LoginHeader
          styles={styles}
          title="Connexion"
          subtitle="Accédez à votre espace CESI Zen."
        />

        <LoginMessage styles={styles} message={message} />

        <LoginFields
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
        />

        <LoginAction
          styles={styles}
          handleAction={handleLogin}
          buttonTextLogin="Se connecter"
          buttonTextAccount="Créer un compte"
          loading={loading}
        />
      </View>
    </View>
  );
}