import { Text } from "@react-navigation/elements";
import { TextInput, TextInputProps, View } from "react-native";
import { loginStyles } from "./module.login.styles";

type Props = TextInputProps & {
  label: string;
};

export function AppInput({ label, ...props }: Readonly<Props>) {
  return (
    <View style={loginStyles.inputGroup}>
      <Text style={loginStyles.label}>{label}</Text>

      <TextInput
        {...props}
        placeholderTextColor="#9B968B"
        style={loginStyles.input}
      />
    </View>
  );
}