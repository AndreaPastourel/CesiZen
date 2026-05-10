import { StyleSheet } from "react-native";

export const ressourcesStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8F4EC",
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 36,
  },

  header: {
    marginBottom: 26,
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
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(227, 205, 139, 0.65)",
    shadowColor: "#6A645A",
    shadowOpacity: 0.1,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 4,
  },

  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },

  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },

  badge: {
    backgroundColor: "rgba(93, 112, 82, 0.14)",
    color: "#5D7052",
    fontSize: 12,
    fontWeight: "900",
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 999,
    overflow: "hidden",
  },

  statusActive: {
    backgroundColor: "rgba(93, 112, 82, 0.14)",
    color: "#5D7052",
    fontSize: 12,
    fontWeight: "900",
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 999,
    overflow: "hidden",
  },

  statusInactive: {
    backgroundColor: "rgba(193, 136, 69, 0.13)",
    color: "#8A4D1D",
    fontSize: 12,
    fontWeight: "900",
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 999,
    overflow: "hidden",
  },

  cardContent: {
    marginBottom: 16,
  },

  cardTitle: {
    color: "#6A645A",
    fontSize: 20,
    lineHeight: 25,
    fontWeight: "900",
    marginBottom: 8,
  },

  cardResume: {
    color: "#7D766B",
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 14,
  },

  cardDescription: {
    color: "#7D766B",
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 12,
  },

  cardDescriptionMuted: {
    color: "#9B968B",
    fontSize: 14,
    fontStyle: "italic",
    marginBottom: 12,
  },

  metaList: {
    gap: 6,
  },

  metaText: {
    color: "#7D766B",
    fontSize: 13,
    lineHeight: 19,
  },

  metaStrong: {
    color: "#6A645A",
    fontWeight: "900",
  },

  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  metaPill: {
    backgroundColor: "rgba(193, 136, 69, 0.13)",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: "rgba(106, 100, 90, 0.12)",
    paddingTop: 14,
    gap: 12,
  },

  fileInfo: {
    color: "#9B968B",
    fontSize: 13,
    fontWeight: "700",
  },

  cardButton: {
    minHeight: 48,
    borderRadius: 15,
    backgroundColor: "#D99A55",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },

  cardButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },

  cardButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
  },

  stateBox: {
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(227, 205, 139, 0.65)",
    marginBottom: 18,
  },

  stateTitle: {
    color: "#6A645A",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 6,
  },

  stateText: {
    color: "#7D766B",
    fontSize: 14,
    lineHeight: 21,
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

  loadingBox: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },

  loadingText: {
    color: "#7D766B",
    marginTop: 12,
  },
});