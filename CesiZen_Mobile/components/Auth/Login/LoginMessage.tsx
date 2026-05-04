import { Text, View } from "react-native";

type Props = {
  styles: any;
  message: string | null;
};

export function LoginMessage({ styles, message }: Readonly<Props>) {
  if (!message) {
    return null;
  }

  const isSuccess = message.includes("OK");

  return (
    <View style={isSuccess ? styles.successBox : styles.errorBox}>
      <Text style={isSuccess ? styles.successText : styles.errorText}>
        {message}
      </Text>
    </View>
  );
}