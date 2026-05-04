import { router } from "expo-router";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

type Props = Readonly<{
  styles: any;
  handleAction: () => void;
  loading: boolean;
  buttonPrimaryText: string;
  linkText: string;
}>;

export default function RegisterAction({
  styles,
  handleAction,
  loading,
  buttonPrimaryText,
  linkText,
}: Props) {
  return (
    <View style={styles.actions}>
      <Pressable
        onPress={handleAction}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
          loading ? styles.buttonDisabled : null,
        ]}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>{buttonPrimaryText}</Text>
        )}
      </Pressable>

      <Pressable onPress={() => router.push("/login")} disabled={loading}>
        <Text style={styles.link}>{linkText}</Text>
      </Pressable>
    </View>
  );
}