
import { loginStyles } from "@/components/Auth/module.login.styles";
import RegisterForm from "@/components/Auth/Register/RegisterForm";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

export default function RegisterScreen() {
  return (
    <KeyboardAvoidingView
      style={loginStyles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={loginStyles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={loginStyles.decorCircleTop} />
        <View style={loginStyles.decorCircleBottom} />

        <RegisterForm styles={loginStyles} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}