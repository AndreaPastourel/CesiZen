import { StyleSheet } from "react-native";

export const navigationStyles = StyleSheet.create({
  publicBar: {
    height: 68,
    backgroundColor: "#FFFDF8",
    borderTopWidth: 1,
    borderTopColor: "rgba(106, 100, 90, 0.12)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 8,
    paddingTop: 8,
  },

  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  navText: {
    color: "#9B968B",
    fontSize: 12,
    fontWeight: "800",
  },

  navTextActive: {
    color: "#5D7052",
  },

  privateTabBar: {
    backgroundColor: "#FFFDF8",
    borderTopColor: "rgba(106, 100, 90, 0.12)",
    height: 68,
    paddingTop: 8,
    paddingBottom: 10,
  },

  privateTabLabel: {
    fontSize: 12,
    fontWeight: "800",
  },


  privateBarContainer: {
  backgroundColor: "#F8F4EC",
  paddingHorizontal: 18,
  paddingBottom: 14,
  paddingTop: 8,
},

privateBar: {
  minHeight: 64,
  backgroundColor: "rgba(255, 255, 255, 0.92)",
  borderRadius: 24,
  borderWidth: 1,
  borderColor: "rgba(227, 205, 139, 0.65)",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-around",
  shadowColor: "#6A645A",
  shadowOpacity: 0.12,
  shadowRadius: 18,
  shadowOffset: {
    width: 0,
    height: 8,
  },
  elevation: 5,
},

privateBarItem: {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  gap: 5,
  paddingVertical: 10,
},

privateIconDot: {
  width: 8,
  height: 8,
  borderRadius: 999,
  backgroundColor: "rgba(155, 150, 139, 0.5)",
},

privateIconDotActive: {
  width: 26,
  backgroundColor: "#5D7052",
},

privateBarText: {
  color: "#9B968B",
  fontSize: 12,
  fontWeight: "800",
},

privateBarTextActive: {
  color: "#5D7052",
},
});