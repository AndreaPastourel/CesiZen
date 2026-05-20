import { StyleSheet } from "react-native";

export const addTrackerStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8F4EC",
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 110,
  },

  loadingBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "#F8F4EC",
  },

  loadingText: {
    color: "#7D766B",
    marginTop: 12,
    fontSize: 15,
    fontWeight: "700",
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

  sectionTitle: {
    color: "#6A645A",
    fontSize: 16,
    fontWeight: "900",
    marginTop: 8,
    marginBottom: 12,
  },

  emotionGrid: {
    gap: 12,
    marginBottom: 18,
  },

  emotionChoice: {
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(106, 100, 90, 0.16)",
    backgroundColor: "rgba(248, 244, 236, 0.7)",
  },

  emotionChoiceSelected: {
    borderColor: "#5D7052",
    backgroundColor: "rgba(93, 112, 82, 0.12)",
  },

  emotionChoiceTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 6,
  },

  emotionDot: {
    width: 18,
    height: 18,
    borderRadius: 999,
  },

  emotionName: {
    color: "#6A645A",
    fontSize: 17,
    fontWeight: "900",
  },

  emotionNameSelected: {
    color: "#5D7052",
  },

  emotionType: {
    color: "#7D766B",
    fontSize: 13,
    fontWeight: "700",
    marginLeft: 28,
    lineHeight: 19,
  },

  intensityRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 18,
  },

  intensityButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(248, 244, 236, 0.9)",
    borderWidth: 1,
    borderColor: "rgba(106, 100, 90, 0.16)",
  },

  intensityButtonSelected: {
    backgroundColor: "#D99A55",
    borderColor: "#D99A55",
  },

  intensityButtonText: {
    color: "#6A645A",
    fontSize: 14,
    fontWeight: "900",
  },

  intensityButtonTextSelected: {
    color: "#FFFFFF",
  },

  detectedEmotionBox: {
    backgroundColor: "rgba(93, 112, 82, 0.10)",
    borderRadius: 18,
    padding: 14,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "rgba(93, 112, 82, 0.22)",
  },

  detectedEmotionLabel: {
    color: "#5D7052",
    fontSize: 13,
    fontWeight: "900",
    marginBottom: 4,
  },

  detectedEmotionText: {
    color: "#6A645A",
    fontSize: 16,
    fontWeight: "900",
    lineHeight: 22,
  },

  textArea: {
    minHeight: 110,
    backgroundColor: "#F3F6FF",
    borderWidth: 1,
    borderColor: "rgba(106, 100, 90, 0.22)",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: "#2F2D29",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
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
    borderRadius: 16,
    padding: 14,
    marginBottom: 18,
  },

  successText: {
    color: "#5D7052",
    fontSize: 14,
    fontWeight: "800",
  },

  errorBox: {
    backgroundColor: "rgba(193, 136, 69, 0.13)",
    borderColor: "rgba(193, 136, 69, 0.35)",
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    marginBottom: 18,
  },

  errorText: {
    color: "#8A4D1D",
    fontSize: 14,
    fontWeight: "800",
  },
});