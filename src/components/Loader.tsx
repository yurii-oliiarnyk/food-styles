import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

const Loader = ({ visible }: { visible: boolean }) => {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.view}>
      <ActivityIndicator color={COLORS.ORANGISH} size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loader;
