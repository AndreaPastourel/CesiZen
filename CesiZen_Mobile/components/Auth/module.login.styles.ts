import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8F4EC",
  },

  keyboardView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 32,
  },

  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },

  decorCircleTop: {
    position: "absolute",
    top: 10,
    left: -95,
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: "rgba(227, 205, 139, 0.22)",
  },

  decorCircleBottom: {
    position: "absolute",
    bottom: -80,
    right: -90,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "rgba(93, 112, 82, 0.14)",
  },

  brandPill: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(93, 112, 82, 0.14)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    marginBottom: 24,
  },

  brandPillText: {
    color: "#5D7052",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 2,
  },

  heroTitle: {
    color: "#6A645A",
    fontSize: 32,
    lineHeight: 35,
    fontWeight: "900",
    marginBottom: 14,
    maxWidth: 350,
  },

  heroSubtitle: {
    color: "#6A645A",
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 24,
    maxWidth: 350,
  },

  card: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 26,
    paddingHorizontal: 22,
    paddingVertical: 24,
    borderWidth: 1,
    borderColor: "rgba(227, 205, 139, 0.65)",
    shadowColor: "#6A645A",
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 5,
  },

  header: {
    marginBottom: 22,
  },

  logoImage: {
    width: 135,
    height: 62,
    marginBottom: 22,
    alignSelf: "flex-start",
  },

  title: {
    color: "#6A645A",
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "900",
    marginBottom: 6,
  },

  subtitle: {
    color: "#7D766B",
    fontSize: 15,
    lineHeight: 22,
  },

  inputGroup: {
    marginBottom: 16,
  },

  label: {
    color: "#6A645A",
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 8,
  },

  input: {
    minHeight: 54,
    backgroundColor: "#F3F6FF",
    borderWidth: 1,
    borderColor: "rgba(106, 100, 90, 0.22)",
    borderRadius: 16,
    paddingHorizontal: 16,
    color: "#2F2D29",
    fontSize: 15,
  },

  actions: {
    marginTop: 8,
    alignItems: "center",
  },

  button: {
    width: "100%",
    minHeight: 56,
    borderRadius: 17,
    backgroundColor: "#D99A55",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#C18845",
    shadowOpacity: 0.22,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    elevation: 4,
  },

  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },

  buttonDisabled: {
    opacity: 0.7,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
  },

  link: {
    marginTop: 18,
    color: "#5D7052",
    fontSize: 15,
    fontWeight: "900",
    textDecorationLine: "underline",
  },

  errorBox: {
    backgroundColor: "rgba(193, 136, 69, 0.13)",
    borderColor: "rgba(193, 136, 69, 0.35)",
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    marginBottom: 18,
  },

  errorText: {
    color: "#8A4D1D",
    fontSize: 14,
    fontWeight: "700",
  },

  successBox: {
    backgroundColor: "rgba(93, 112, 82, 0.13)",
    borderColor: "rgba(93, 112, 82, 0.35)",
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    marginBottom: 18,
  },

  successText: {
    color: "#5D7052",
    fontSize: 14,
    fontWeight: "700",
  },

  sectionTitle: {
    color: "#6A645A",
    fontSize: 16,
    fontWeight: "900",
    marginTop: 10,
    marginBottom: 14,
  },

  avatarSection: {
    marginTop: 8,
    marginBottom: 18,
    alignItems: "flex-start",
  },

  avatarPreview: {
    width: 96,
    height: 96,
    borderRadius: 24,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(227, 205, 139, 0.65)",
  },

  avatarPlaceholder: {
    width: 96,
    height: 96,
    borderRadius: 24,
    marginBottom: 12,
    backgroundColor: "rgba(93, 112, 82, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(93, 112, 82, 0.24)",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarPlaceholderText: {
    color: "#5D7052",
    fontSize: 13,
    fontWeight: "800",
  },

  secondaryButton: {
    minHeight: 46,
    borderRadius: 15,
    paddingHorizontal: 18,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderWidth: 1,
    borderColor: "rgba(93, 112, 82, 0.35)",
    alignItems: "center",
    justifyContent: "center",
  },

  secondaryButtonText: {
    color: "#5D7052",
    fontSize: 14,
    fontWeight: "900",
  },

  inputWrapper: {
  minHeight: 54,
  backgroundColor: "#F3F6FF",
  borderWidth: 1,
  borderColor: "rgba(106, 100, 90, 0.22)",
  borderRadius: 16,
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 16,
},

inputWithIcon: {
  flex: 1,
  minHeight: 54,
  color: "#2F2D29",
  fontSize: 15,
  paddingVertical: 0,
},

passwordToggle: {
  paddingLeft: 12,
  paddingVertical: 8,
},

passwordToggleText: {
  color: "#5D7052",
  fontSize: 13,
  fontWeight: "900",
},
});