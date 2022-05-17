import React from "react";
import { StyleSheet, Text } from "react-native";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";
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
    fontFamily: FONTS["ProximaNovaA-Bold"],
  },
});

export default Link;
