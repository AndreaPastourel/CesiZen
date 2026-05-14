import { Text, TextInput, View } from "react-native";

import { profileStyles } from "./module.profil.style";

type Props={
    pseudo: string, 
    setPseudo: (text: string) => void,
    editing: boolean,
    email : string, 
    setEmail : (text: string) => void,
    prenom:string, 
    setPrenom: (text: string) => void,
    nom : string, 
    setNom: (text: string) => void,
    telephone : string, 
    setTelephone: (text: string) => void,

}

export default function ProfilFields({pseudo,setPseudo,editing,email,setEmail,prenom,setPrenom,nom,setNom,telephone,setTelephone}:Readonly<Props>){

    return(
        <>
            <View style={profileStyles.formGroup}>
              <Text style={profileStyles.label}>Pseudo</Text>

              <TextInput
                value={pseudo}
                onChangeText={setPseudo}
                editable={editing}
                style={[
                  profileStyles.input,
                  editing ? null : profileStyles.inputDisabled,
                ]}
                placeholder="Votre pseudo"
                placeholderTextColor="#9B968B"
                autoCapitalize="none"
              />
            </View>

            <View style={profileStyles.formGroup}>
              <Text style={profileStyles.label}>Adresse email</Text>

              <TextInput
                value={email}
                onChangeText={setEmail}
                editable={editing}
                style={[
                  profileStyles.input,
                  editing ? null : profileStyles.inputDisabled,
                ]}
                placeholder="Votre email"
                placeholderTextColor="#9B968B"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={profileStyles.formRow}>
              <View style={profileStyles.formRowItem}>
                <Text style={profileStyles.label}>Prénom</Text>

                <TextInput
                  value={prenom}
                  onChangeText={setPrenom}
                  editable={editing}
                  style={[
                    profileStyles.input,
                    editing ? null : profileStyles.inputDisabled,
                  ]}
                  placeholder="Prénom"
                  placeholderTextColor="#9B968B"
                />
              </View>

              <View style={profileStyles.formRowItem}>
                <Text style={profileStyles.label}>Nom</Text>

                <TextInput
                  value={nom}
                  onChangeText={setNom}
                  editable={editing}
                  style={[
                    profileStyles.input,
                    editing ? null : profileStyles.inputDisabled,
                  ]}
                  placeholder="Nom"
                  placeholderTextColor="#9B968B"
                />
              </View>
            </View>

            <View style={profileStyles.formGroup}>
              <Text style={profileStyles.label}>Téléphone</Text>

              <TextInput
                value={telephone}
                onChangeText={setTelephone}
                editable={editing}
                style={[
                  profileStyles.input,
                  editing ? null : profileStyles.inputDisabled,
                ]}
                placeholder="06 00 00 00 00"
                placeholderTextColor="#9B968B"
                keyboardType="phone-pad"
              />
            </View>
        </>
    )
}