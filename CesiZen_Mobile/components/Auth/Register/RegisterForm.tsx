import { apiRegister } from "@/services/authApi";
import { saveCurrentUser } from "@/services/userStorage";
import { isEmailValid, isPasswordValid } from "@/utils/validators";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";

import RegisterAction from "./RegisterAction";
import { RegisterAvatar } from "./RegisterAvatar";
import RegisterFields from "./RegisterFields";
import RegisterHeader from "./RegisterHeader";
import RegisterMessage from "./RegisterMessage";

type Props = Readonly<{
  styles: any;
}>;

export default function RegisterForm({ styles }: Props) {
  const [email, setEmail] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [firstname, setFirstname] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(
    null
  );

  async function pickAvatar() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Autorisation requise",
        "Il faut autoriser l'accès à la galerie pour choisir une photo."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  }

  async function handleRegister() {
    setMessage(null);
    setMessageType(null);

    const cleanEmail = email.trim();
    const cleanPseudo = pseudo.trim();
    const cleanPassword = password.trim();
    const cleanConfirm = confirm.trim();

    const cleanFirstname = firstname.trim();
    const cleanName = name.trim();
    const cleanPhone = phone.trim();

    if (!cleanEmail || !cleanPseudo || !cleanPassword || !cleanConfirm) {
      setMessage("Email, pseudo et mots de passe sont obligatoires.");
      setMessageType("error");
      return;
    }

    if (!isEmailValid(cleanEmail)) {
      setMessage("Le format de l'email n'est pas valide.");
      setMessageType("error");
      return;
    }

    if (!isPasswordValid(cleanPassword)) {
      setMessage("Le mot de passe doit faire au moins 6 caractères.");
      setMessageType("error");
      return;
    }

    if (cleanPassword !== cleanConfirm) {
      setMessage("Les mots de passe ne correspondent pas.");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);

      const authResponse = await apiRegister({
        nom: cleanName || null,
        prenom: cleanFirstname || null,
        pseudo: cleanPseudo,
        email: cleanEmail,
        telephone: cleanPhone || null,
        photo_profil: avatar,
        motDePasse: cleanPassword,
      });

      if (authResponse.user) {
        await saveCurrentUser(authResponse.user);
      }

      setMessage("Compte créé ✅ Tu peux maintenant te connecter.");
      setMessageType("success");

      setTimeout(() => {
        router.replace("/login");
      }, 800);
    } catch (e: any) {
      setMessage(e?.message || "Une erreur est survenue.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.brandPill}>
        <Text style={styles.brandPillText}>CESI ZEN</Text>
      </View>

      <Text style={styles.heroTitle}>Créez votre espace bien-être.</Text>

      <Text style={styles.heroSubtitle}>
        Quelques informations suffisent pour accéder à votre espace personnel.
      </Text>

      <View style={styles.card}>
        <RegisterHeader
          styles={styles}
          title="Inscription"
          subtitle="Créez votre compte CESI Zen."
        />

        <RegisterMessage
          styles={styles}
          message={message}
          type={messageType}
        />

        <RegisterFields
          styles={styles}
          sectionTitle="Informations du compte"
          email={email}
          setEmail={setEmail}
          pseudo={pseudo}
          setPseudo={setPseudo}
          password={password}
          setPassword={setPassword}
          confirm={confirm}
          setConfirm={setConfirm}
          firstname={firstname}
          setFirstname={setFirstname}
          name={name}
          setName={setName}
          phone={phone}
          setPhone={setPhone}
        />

        <RegisterAvatar
          styles={styles}
          sectionTitle="Photo de profil"
          avatar={avatar}
          handleAction={pickAvatar}
          loading={loading}
        />

        <RegisterAction
          styles={styles}
          handleAction={handleRegister}
          loading={loading}
          buttonPrimaryText="Créer mon compte"
          linkText="J’ai déjà un compte"
        />
      </View>
    </View>
  );
}