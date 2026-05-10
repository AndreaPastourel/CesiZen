import RegisterForm from "@/components/Auth/Register/RegisterForm";
import { loginStyles } from "@/components/Auth/module.login.styles";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen() {
  return (
    <SafeAreaView style={loginStyles.screen}>
      <KeyboardAvoidingView
        style={loginStyles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={loginStyles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={loginStyles.decorCircleTop} />
          <View style={loginStyles.decorCircleBottom} />

          <RegisterForm styles={loginStyles} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}