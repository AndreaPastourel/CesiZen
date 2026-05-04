import { Image, Pressable, Text, View } from "react-native";

type Props = Readonly<{
  styles: any;
  sectionTitle: string;
  avatar: string | null;
  handleAction: () => void;
  loading: boolean;
}>;

export function RegisterAvatar({
  styles,
  sectionTitle,
  avatar,
  handleAction,
  loading,
}: Props) {
  return (
    <View style={styles.avatarSection}>
      <Text style={styles.sectionTitle}>{sectionTitle} optionnelle</Text>

      {avatar ? (
        <Image source={{ uri: avatar }} style={styles.avatarPreview} />
      ) : (
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarPlaceholderText}>Photo</Text>
        </View>
      )}

      <Pressable
        onPress={handleAction}
        style={({ pressed }) => [
          styles.secondaryButton,
          pressed ? styles.buttonPressed : null,
          loading ? styles.buttonDisabled : null,
        ]}
        disabled={loading}
      >
        <Text style={styles.secondaryButtonText}>Choisir une photo</Text>
      </Pressable>
    </View>
  );
}