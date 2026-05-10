import { Text } from "@react-navigation/elements";
import { useState } from "react";
import { Pressable, TextInput, TextInputProps, View } from "react-native";
import { loginStyles } from "./module.login.styles";

type Props = TextInputProps & {
  label: string;
  isPassword?:boolean,
};
export function AppInput({ label, isPassword = false, ...props }: Readonly<Props>) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={loginStyles.inputGroup}>
      <Text style={loginStyles.label}>{label}</Text>

      <View style={loginStyles.inputWrapper}>
        <TextInput
          {...props}
          placeholderTextColor="#9B968B"
          style={loginStyles.inputWithIcon}
          secureTextEntry={isPassword && !passwordVisible}
        />

        {isPassword ? (
          <Pressable
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={loginStyles.passwordToggle}
          >
            <Text style={loginStyles.passwordToggleText}>
              {passwordVisible ? "Masquer" : "Afficher"}
            </Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );


}