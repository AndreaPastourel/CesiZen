import { StyleSheet } from "react-native";

export const emotionJournalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8F4EC",
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 96,
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

  

  colorDot: {
    width: 14,
    height: 14,
    borderRadius: 999,
  },

  dateText: {
    color: "#9B968B",
    fontSize: 13,
    fontWeight: "800",
  },

  cardTitle: {
    color: "#6A645A",
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 4,
  },

  cardSubtitle: {
    color: "#7D766B",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 12,
  },

  intensityPill: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(193, 136, 69, 0.13)",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 10,
  },

  intensityText: {
    color: "#8A4D1D",
    fontSize: 13,
    fontWeight: "900",
  },

  noteText: {
    color: "#7D766B",
    fontSize: 14,
    lineHeight: 21,
  },

  stateBox: {
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(227, 205, 139, 0.65)",
    marginBottom: 18,
    alignItems: "center",
  },

  stateTitle: {
    color: "#6A645A",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 6,
    textAlign: "center",
  },

  stateText: {
    color: "#7D766B",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    marginTop: 8,
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

cardTop: {
  flexDirection: "row",
  alignItems: "center",
  gap: 12,
  marginBottom: 14,
},

emotionIconBubble: {
  width: 54,
  height: 54,
  borderRadius: 18,
  alignItems: "center",
  justifyContent: "center",
  shadowColor: "#6A645A",
  shadowOpacity: 0.12,
  shadowRadius: 10,
  shadowOffset: {
    width: 0,
    height: 5,
  },
  elevation: 3,
},

emotionIcon: {
  width: 30,
  height: 30,
},

emotionIconFallback: {
  color: "#FFFFFF",
  fontSize: 22,
  fontWeight: "900",
},

cardTopText: {
  flex: 1,
},

addButton: {
  width: "100%",
  minHeight: 54,
  borderRadius: 17,
  backgroundColor: "#D99A55",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 18,
  shadowColor: "#C18845",
  shadowOpacity: 0.22,
  shadowRadius: 14,
  shadowOffset: {
    width: 0,
    height: 7,
  },
  elevation: 4,
},

addButtonPressed: {
  opacity: 0.9,
  transform: [{ scale: 0.99 }],
},

addButtonText: {
  color: "#FFFFFF",
  fontSize: 15,
  fontWeight: "900",
},
editButton: {
  alignSelf: "flex-start",
  marginTop: 14,
  minHeight: 42,
  borderRadius: 14,
  paddingHorizontal: 18,
  backgroundColor: "rgba(93, 112, 82, 0.14)",
  borderWidth: 1,
  borderColor: "rgba(93, 112, 82, 0.28)",
  alignItems: "center",
  justifyContent: "center",
},

editButtonPressed: {
  opacity: 0.9,
  transform: [{ scale: 0.98 }],
},

editButtonText: {
  color: "#5D7052",
  fontSize: 14,
  fontWeight: "900",
},
});