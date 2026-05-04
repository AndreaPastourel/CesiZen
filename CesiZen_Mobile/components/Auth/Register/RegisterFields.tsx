
import { Text } from "react-native";
import { AppInput } from "../AppInput";

type Props = Readonly<{
  styles: any;
  sectionTitle: string;

  email: string;
  setEmail: (text: string) => void;

  pseudo: string;
  setPseudo: (text: string) => void;

  password: string;
  setPassword: (text: string) => void;

  confirm: string;
  setConfirm: (text: string) => void;

  firstname: string;
  setFirstname: (text: string) => void;

  name: string;
  setName: (text: string) => void;

  phone: string;
  setPhone: (text: string) => void;
}>;

export default function RegisterFields({
  styles,
  sectionTitle,
  email,
  setEmail,
  pseudo,
  setPseudo,
  password,
  setPassword,
  confirm,
  setConfirm,
  firstname,
  setFirstname,
  name,
  setName,
  phone,
  setPhone,
}: Props) {
  return (
    <>
      <Text style={styles.sectionTitle}>{sectionTitle}</Text>

      <AppInput
        label="Adresse email"
        placeholder="exemple@mail.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <AppInput
        label="Pseudo"
        placeholder="ex: cesi_zen"
        value={pseudo}
        onChangeText={setPseudo}
        autoCapitalize="none"
      />

      <AppInput
        label="Mot de passe"
        placeholder="••••••••"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <AppInput
        label="Confirmer le mot de passe"
        placeholder="••••••••"
        value={confirm}
        onChangeText={setConfirm}
        secureTextEntry
      />

      <Text style={styles.sectionTitle}>Informations du profil</Text>

      <AppInput
        label="Prénom"
        placeholder="ex: Pierre"
        value={firstname}
        onChangeText={setFirstname}
      />

      <AppInput
        label="Nom"
        placeholder="ex: Dupont"
        value={name}
        onChangeText={setName}
      />

      <AppInput
        label="Téléphone"
        placeholder="ex: 06 00 00 00 00"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
    </>
  );
}