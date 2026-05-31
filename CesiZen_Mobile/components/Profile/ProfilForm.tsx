import { API_BASE_URL } from "@/config/api";
import { apiUpdateUser } from "@/services/profileApi";
import { getCurrentUser, saveCurrentUser } from "@/services/userStorage";
import { Message } from "@/types/message";
import { User } from "@/types/users";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ProfilAction from "./ProfilAction";
import ProfilAvatar from "./ProfilAvatar";
import ProfilFields from "./ProfilField";
import ProfilHeader from "./ProfilHeader";
import ProfilLoading from "./ProfilLoading";
import ProfilMessage from "./ProfilMessage";
import { profileStyles } from "./module.profil.style";

export default function ProfilForm() {
  const [user, setUser] = useState<User | null>(null);

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [photoProfil, setPhotoProfil] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);

  const [message, setMessage] = useState<Message | null>(null);

  function fillFieldsWithUser(currentUser: User) {
    setNom(currentUser.nom ?? "");
    setPrenom(currentUser.prenom ?? "");
    setPseudo(currentUser.pseudo ?? "");
    setEmail(currentUser.email ?? "");
    setTelephone(currentUser.telephone ?? "");
    setPhotoProfil(currentUser.photo_profil ?? null);
  }

  function getInitials(currentUser: User | null) {
    const firstInitial = currentUser?.pseudo?.charAt(0)?.toUpperCase() ?? "";
    const lastInitial = currentUser?.pseudo?.charAt(1)?.toUpperCase() ?? "";

    if (firstInitial || lastInitial) {
      return `${firstInitial}${lastInitial}`;
    }

    return "CZ";
  }

  function getProfilePhotoUrl(photo: string | null) {
    if (!photo) {
      return null;
    }

    if (photo.startsWith("http") || photo.startsWith("file://")) {
      return photo;
    }

    const backendBaseUrl = API_BASE_URL.replace(/\/api\/?$/, "").replace(
      /\/$/,
      ""
    );

    const formattedPhoto = photo.startsWith("/") ? photo : `/${photo}`;

    return `${backendBaseUrl}${formattedPhoto}`;
  }

  async function loadUser() {
    setLoading(true);
    setMessage(null);

    const storedUser = await getCurrentUser();

    if (!storedUser) {
      setLoading(false);
      router.replace("/login");
      return;
    }

    setUser(storedUser);
    fillFieldsWithUser(storedUser);
    setLoading(false);
  }

  async function pickProfilePhoto() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Autorisation requise",
        "Il faut autoriser l'accès à la galerie pour choisir une photo."
      );

      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setPhotoProfil(result.assets[0].uri);
    }
  }

  function cancelEdition() {
    if (user) {
      fillFieldsWithUser(user);
    }

    setEditing(false);
    setMessage(null);
  }

  async function saveProfile() {
    if (!user) {
      return;
    }

    setMessage(null);

    const cleanNom = nom.trim();
    const cleanPrenom = prenom.trim();
    const cleanPseudo = pseudo.trim();
    const cleanEmail = email.trim();
    const cleanTelephone = telephone.trim();

    if (!cleanPseudo) {
      setMessage({
        type: "error",
        text: "Le pseudo est obligatoire.",
      });

      return;
    }

    if (!cleanEmail) {
      setMessage({
        type: "error",
        text: "L'adresse email est obligatoire.",
      });

      return;
    }

    const payload = {
      prenom: cleanPrenom || null,
      nom: cleanNom || null,
      pseudo: cleanPseudo,
      email: cleanEmail,
      telephone: cleanTelephone || null,
      photo_profil: photoProfil,
    };

    try {
      setSaving(true);

      const response = await apiUpdateUser(user.id, payload);

      const updatedUser = response.data;

      await saveCurrentUser(updatedUser);

      setUser(updatedUser);
      fillFieldsWithUser(updatedUser);

      setEditing(false);

      setMessage({
        type: "success",
        text: "Profil mis à jour avec succès ✅",
      });
    } catch (e: any) {
      setMessage({
        type: "error",
        text: e?.message || "Impossible de mettre à jour le profil.",
      });
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  if (loading) {
    return <ProfilLoading />;
  }

  const photoUrl = getProfilePhotoUrl(photoProfil);

  return (
    <SafeAreaView style={profileStyles.screen}>
      <KeyboardAvoidingView
        style={profileStyles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={profileStyles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <ProfilHeader />

          <ProfilMessage message={message} />

          <View style={profileStyles.card}>
            <ProfilAvatar
              photoUrl={photoUrl}
              getInitials={getInitials}
              user={user}
              editing={editing}
              pickProfilePhoto={pickProfilePhoto}
              email={email}
              pseudo={pseudo}
            />

            <View style={profileStyles.separator} />

            <ProfilFields
              pseudo={pseudo}
              setPseudo={setPseudo}
              editing={editing}
              email={email}
              setEmail={setEmail}
              prenom={prenom}
              setPrenom={setPrenom}
              nom={nom}
              setNom={setNom}
              telephone={telephone}
              setTelephone={setTelephone}
            />

            <ProfilAction
              editing={editing}
              saveProfile={saveProfile}
              saving={saving}
              cancelEdition={cancelEdition}
              setEditing={setEditing}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}