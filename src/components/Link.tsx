import React from "react";
import { StyleSheet, Text } from "react-native";
import { COLORS } from "../colors";
import { getResponsiveSize } from "../utils";

const Link = ({
  children,
  onPress,
}: {
  children: string;
  onPress?: () => void;
}) => {
  return (
    <Text style={styles.link} onPress={onPress}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  link: {
    textAlign: "center",
    color: COLORS.WHITE,
    fontSize: getResponsiveSize(16),
    lineHeight: getResponsiveSize(18),
    fontWeight: "600",
  },
});

export default Link;
