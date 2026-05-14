import { StyleSheet } from "react-native";

export const profileStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8F4EC",
  },

  keyboardView: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },

  loadingBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  loadingText: {
    color: "#7D766B",
    marginTop: 12,
    fontSize: 15,
  },

  header: {
    marginBottom: 24,
  },

  brandPill: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(93, 112, 82, 0.14)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    marginBottom: 18,
  },

  brandPillText: {
    color: "#5D7052",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 2,
  },

  title: {
    color: "#6A645A",
    fontSize: 34,
    lineHeight: 39,
    fontWeight: "900",
    marginBottom: 10,
  },

  subtitle: {
    color: "#7D766B",
    fontSize: 15,
    lineHeight: 23,
  },

  card: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 26,
    paddingHorizontal: 20,
    paddingVertical: 22,
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

  avatarSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  avatar: {
    width: 88,
    height: 88,
    borderRadius: 28,
    backgroundColor: "rgba(93, 112, 82, 0.12)",
  },

  avatarPlaceholder: {
    width: 88,
    height: 88,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(93, 112, 82, 0.14)",
    borderWidth: 1,
    borderColor: "rgba(93, 112, 82, 0.24)",
  },

  avatarInitials: {
    color: "#5D7052",
    fontSize: 26,
    fontWeight: "900",
  },

  avatarTextBox: {
    flex: 1,
  },

  avatarTitle: {
    color: "#6A645A",
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 4,
  },

  avatarSubtitle: {
    color: "#7D766B",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },

  separator: {
    height: 1,
    backgroundColor: "rgba(106, 100, 90, 0.12)",
    marginVertical: 22,
  },

  formGroup: {
    marginBottom: 16,
  },

  formRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },

  formRowItem: {
    flex: 1,
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

  inputDisabled: {
    backgroundColor: "rgba(243, 246, 255, 0.55)",
    color: "#7D766B",
  },

  infoBox: {
    backgroundColor: "rgba(93, 112, 82, 0.10)",
    borderRadius: 18,
    padding: 14,
    marginTop: 4,
    marginBottom: 18,
    gap: 6,
  },

  infoText: {
    color: "#7D766B",
    fontSize: 14,
    lineHeight: 20,
  },

  infoStrong: {
    color: "#6A645A",
    fontWeight: "900",
  },

  actions: {
    gap: 12,
  },

  primaryButton: {
    width: "100%",
    minHeight: 54,
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

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
  },

  secondaryButton: {
    alignSelf: "flex-start",
    minHeight: 38,
    borderRadius: 999,
    paddingHorizontal: 14,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderWidth: 1,
    borderColor: "rgba(93, 112, 82, 0.35)",
    alignItems: "center",
    justifyContent: "center",
  },

  secondaryButtonLarge: {
    width: "100%",
    minHeight: 52,
    borderRadius: 17,
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

  logoutButton: {
    width: "100%",
    minHeight: 52,
    borderRadius: 17,
    backgroundColor: "rgba(193, 136, 69, 0.13)",
    borderWidth: 1,
    borderColor: "rgba(193, 136, 69, 0.35)",
    alignItems: "center",
    justifyContent: "center",
  },

  logoutButtonText: {
    color: "#8A4D1D",
    fontSize: 15,
    fontWeight: "900",
  },

  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },

  buttonDisabled: {
    opacity: 0.7,
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
});