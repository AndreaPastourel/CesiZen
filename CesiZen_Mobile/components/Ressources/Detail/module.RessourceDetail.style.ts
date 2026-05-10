import { StyleSheet } from "react-native";

export const ressourceDetailStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8F4EC",
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },

  centerBox: {
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

  backButton: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(93, 112, 82, 0.14)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    marginBottom: 20,
  },

  backButtonText: {
    color: "#5D7052",
    fontSize: 13,
    fontWeight: "900",
  },

  header: {
    marginBottom: 20,
  },

  badge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(93, 112, 82, 0.14)",
    color: "#5D7052",
    fontSize: 12,
    fontWeight: "900",
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 999,
    overflow: "hidden",
    marginBottom: 14,
  },

  title: {
    color: "#6A645A",
    fontSize: 32,
    lineHeight: 37,
    fontWeight: "900",
    marginBottom: 12,
  },

  resume: {
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

  sectionTitle: {
    color: "#6A645A",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 12,
  },

  metaText: {
    color: "#7D766B",
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 6,
  },

  metaStrong: {
    color: "#6A645A",
    fontWeight: "900",
  },

  contentText: {
    color: "#7D766B",
    fontSize: 15,
    lineHeight: 24,
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

  mediaBox: {
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

mediaHeader: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: 12,
  marginBottom: 16,
},

mediaHeaderText: {
  flex: 1,
},

mediaTitle: {
  color: "#6A645A",
  fontSize: 18,
  fontWeight: "900",
  marginBottom: 6,
},

fileName: {
  color: "#7D766B",
  fontSize: 14,
  fontWeight: "700",
  marginBottom: 4,
},

mediaInfo: {
  color: "#9B968B",
  fontSize: 13,
  fontWeight: "700",
  marginTop: 4,
},

mediaLink: {
  backgroundColor: "#D99A55",
  borderRadius: 999,
  paddingHorizontal: 14,
  paddingVertical: 8,
},

mediaLinkPressed: {
  opacity: 0.85,
  transform: [{ scale: 0.98 }],
},

mediaLinkText: {
  color: "#FFFFFF",
  fontSize: 13,
  fontWeight: "900",
},

imageWrapper: {
  width: "100%",
  borderRadius: 18,
  overflow: "hidden",
  backgroundColor: "rgba(93, 112, 82, 0.12)",
},

mediaImage: {
  width: "100%",
  height: "100%",
},

videoBox: {
  flexDirection: "row",
  gap: 14,
  alignItems: "flex-start",
  backgroundColor: "rgba(93, 112, 82, 0.10)",
  borderRadius: 18,
  padding: 16,
},

documentBox: {
  flexDirection: "row",
  gap: 14,
  alignItems: "flex-start",
  backgroundColor: "rgba(193, 136, 69, 0.10)",
  borderRadius: 18,
  padding: 16,
},

documentIcon: {
  width: 46,
  height: 46,
  borderRadius: 14,
  backgroundColor: "rgba(93, 112, 82, 0.16)",
  color: "#5D7052",
  textAlign: "center",
  textAlignVertical: "center",
  fontSize: 13,
  fontWeight: "900",
  overflow: "hidden",
},

documentContent: {
  flex: 1,
},

documentTitle: {
  color: "#6A645A",
  fontSize: 16,
  fontWeight: "900",
  marginBottom: 4,
},

documentText: {
  color: "#7D766B",
  fontSize: 14,
  lineHeight: 21,
},
});