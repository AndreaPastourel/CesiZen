import { router } from "expo-router";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

type Props = {
  styles: any;
  handleAction: () => void;
  buttonTextLogin: string;
  buttonTextAccount: string;
  loading: boolean;
};

export default function LoginAction({
  styles,
  handleAction,
  buttonTextLogin,
  buttonTextAccount,
  loading,
}: Readonly<Props>) {
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
          <Text style={styles.buttonText}>{buttonTextLogin}</Text>
        )}
      </Pressable>

      <Pressable onPress={() => router.push("/register")} disabled={loading}>
        <Text style={styles.link}>{buttonTextAccount}</Text>
      </Pressable>
    </View>
  );
}