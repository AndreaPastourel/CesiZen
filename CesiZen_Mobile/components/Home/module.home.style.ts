import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8F4EC",
  },

  content: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 22,
    paddingTop: 36,
    paddingBottom: 110,
  },

  loadingBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    color: "#7D766B",
    marginTop: 12,
    fontSize: 15,
    fontWeight: "700",
  },

  decorCircleTop: {
    position: "absolute",
    top: 40,
    left: -80,
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: "rgba(227, 205, 139, 0.25)",
  },

  decorCircleBottom: {
    position: "absolute",
    bottom: -90,
    right: -70,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "rgba(93, 112, 82, 0.16)",
  },

  logoBox: {
    width: 130,
    height: 90,
    alignSelf: "flex-start",
    marginBottom: 18,
  },

  logo: {
    width: "100%",
    height: "100%",
  },

  brandPill: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(93, 112, 82, 0.14)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    marginBottom: 20,
  },

  brandPillText: {
    color: "#5D7052",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 2,
  },

  title: {
    color: "#6A645A",
    fontSize: 38,
    lineHeight: 43,
    fontWeight: "900",
    marginBottom: 16,
  },

  subtitle: {
    color: "#7D766B",
    fontSize: 16,
    lineHeight: 25,
    marginBottom: 28,
  },

  card: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 28,
    padding: 22,
    borderWidth: 1,
    borderColor: "rgba(227, 205, 139, 0.65)",
    shadowColor: "#6A645A",
    shadowOpacity: 0.14,
    shadowRadius: 24,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    elevation: 6,
  },

  cardTitle: {
    color: "#6A645A",
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 10,
  },

  cardText: {
    color: "#7D766B",
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 22,
  },

  primaryButton: {
    width: "100%",
    minHeight: 56,
    borderRadius: 17,
    backgroundColor: "#D99A55",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    shadowColor: "#C18845",
    shadowOpacity: 0.24,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 4,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
    textAlign: "center",
  },

  secondaryButton: {
    width: "100%",
    minHeight: 54,
    borderRadius: 17,
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    borderWidth: 1,
    borderColor: "rgba(93, 112, 82, 0.35)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  secondaryButtonText: {
    color: "#5D7052",
    fontSize: 15,
    fontWeight: "900",
    textAlign: "center",
  },

  linkButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },

  linkButtonText: {
    color: "#5D7052",
    fontSize: 15,
    fontWeight: "900",
    textDecorationLine: "underline",
  },

  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
});