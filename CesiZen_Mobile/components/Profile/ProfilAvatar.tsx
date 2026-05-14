import { User } from "@/types/users";
import { Image, Pressable, Text, View } from "react-native";
import { profileStyles } from "./module.profil.style";

type Props= {
   photoUrl: string | null,
  getInitials: (user: User | null) => string |undefined,
  user: User | null,
  editing: boolean,
  pickProfilePhoto: () => Promise<void>,
  email:string, 
  pseudo:string

}

export default function ProfilAvatar({photoUrl,getInitials,user,editing,pickProfilePhoto,email,pseudo}:Readonly<Props>){
    return (
        <View style={profileStyles.avatarSection}>
             {photoUrl ? (
                <Image
                      source={{ uri: photoUrl }}
                      style={profileStyles.avatar}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={profileStyles.avatarPlaceholder}>
                      <Text style={profileStyles.avatarInitials}>
                        {getInitials(user)}
                      </Text>
                    </View>
                  )}
    
                  <View style={profileStyles.avatarTextBox}>
                    <Text style={profileStyles.avatarTitle}>{pseudo}</Text>
    
                    <Text style={profileStyles.avatarSubtitle}>{email}</Text>
    
                    {editing ? (
                      <Pressable
                        onPress={pickProfilePhoto}
                        style={({ pressed }) => [
                          profileStyles.secondaryButton,
                          pressed ? profileStyles.buttonPressed : null,
                        ]}
                      >
                        <Text style={profileStyles.secondaryButtonText}>
                          Modifier la photo
                        </Text>
                      </Pressable>
                    ) : null}
                  </View>
                </View>
                )

}