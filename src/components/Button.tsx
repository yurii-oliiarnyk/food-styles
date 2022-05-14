import React, { ReactElement } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../colors";
import { getResponsiveSize } from "../utils";

const Button = ({
  children,
  onPress,
  icon,
}: {
  children: string;
  onPress?: () => void;
  icon?: ReactElement;
}) => {
  return (
    <TouchableOpacity style={styles.view} activeOpacity={0.8} onPress={onPress}>
      {icon &&
        React.cloneElement(icon, {
          style: styles.icon,
        })}
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: COLORS.WHITE,
    borderRadius: getResponsiveSize(100),
    paddingHorizontal: getResponsiveSize(12),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: getResponsiveSize(43),
    shadowColor: COLORS.GREYISH_BROWN,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 7,
    shadowOpacity: 0.3,
  },
  text: {
    fontSize: getResponsiveSize(16),
    lineHeight: getResponsiveSize(18),
    textAlign: "center",
    color: COLORS.GREYISH_BROWN,
    fontWeight: "500",
  },
  icon: {
    marginRight: getResponsiveSize(10),
    width: getResponsiveSize(17),
    height: getResponsiveSize(17),
  },
});

export default Button;
