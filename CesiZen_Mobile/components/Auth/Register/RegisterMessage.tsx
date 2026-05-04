import { Text, View } from "react-native";

type Props = Readonly<{
  styles: any;
  message: string | null;
  type: "success" | "error" | null;
}>;

export default function RegisterMessage({ styles, message, type }: Props) {
  if (!message || !type) {
    return null;
  }

  const isSuccess = type === "success";

  return (
    <View style={isSuccess ? styles.successBox : styles.errorBox}>
      <Text style={isSuccess ? styles.successText : styles.errorText}>
        {message}
      </Text>
    </View>
  );
}