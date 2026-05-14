import { doLogout } from "@/services/userStorage";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { profileStyles } from "./module.profil.style";

type Props = {
  editing: boolean,
  saving: boolean,
  setEditing: (value: boolean) => void,
  saveProfile: () => Promise<void>,
  cancelEdition: () => void,
};
export default function ProfilAction( {editing,saveProfile, saving,cancelEdition,setEditing}:Readonly<Props>){

    return(
        <View style={profileStyles.actions}>
              {editing ? (
                <>
                  <Pressable
                    onPress={saveProfile}
                    disabled={saving}
                    style={({ pressed }) => [
                      profileStyles.primaryButton,
                      pressed ? profileStyles.buttonPressed : null,
                      saving ? profileStyles.buttonDisabled : null,
                    ]}
                  >
                    {saving ? (
                      <ActivityIndicator color="#FFFFFF" />
                    ) : (
                      <Text style={profileStyles.primaryButtonText}>
                        Enregistrer
                      </Text>
                    )}
                  </Pressable>

                  <Pressable
                    onPress={cancelEdition}
                    disabled={saving}
                    style={({ pressed }) => [
                      profileStyles.secondaryButtonLarge,
                      pressed ? profileStyles.buttonPressed : null,
                    ]}
                  >
                    <Text style={profileStyles.secondaryButtonText}>
                      Annuler
                    </Text>
                  </Pressable>
                </>
              ) : (
                <Pressable
                  onPress={() => setEditing(true)}
                  style={({ pressed }) => [
                    profileStyles.primaryButton,
                    pressed ? profileStyles.buttonPressed : null,
                  ]}
                >
                  <Text style={profileStyles.primaryButtonText}>
                    Modifier mon profil
                  </Text>
                </Pressable>
              )}

              <Pressable
                onPress={doLogout}
                style={({ pressed }) => [
                  profileStyles.logoutButton,
                  pressed ? profileStyles.buttonPressed : null,
                ]}
              >
                <Text style={profileStyles.logoutButtonText}>Déconnexion</Text>
              </Pressable>
            </View>
    )
}