import LoginForm from "@/components/Auth/Login/LoginForm";
import { loginStyles } from "@/components/Auth/module.login.styles";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  return (
    <SafeAreaView style={loginStyles.screen}>
      <KeyboardAvoidingView
        style={loginStyles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={loginStyles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={loginStyles.decorCircleTop} />
          <View style={loginStyles.decorCircleBottom} />

          <LoginForm styles={loginStyles} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}