import React, { ReactElement, useMemo } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { COLORS } from "../colors";
import { getResponsiveSize } from "../utils";

const Button = ({
  children,
  variant = "primary",
  onPress,
  icon,
}: {
  children: string;
  onPress?: () => void;
  variant?: "primary" | "white";
  icon?: ReactElement;
}) => {
  const { buttonStyle, buttonStyleText } = useMemo<{
    buttonStyle: StyleProp<ViewStyle>;
    buttonStyleText: StyleProp<TextStyle>;
  }>(() => {
    switch (variant) {
      case "primary": {
        return {
          buttonStyle: styles.buttonPrimary,
          buttonStyleText: styles.buttonPrimaryText,
        };
      }

      case "white": {
        return {
          buttonStyle: styles.buttonWhite,
          buttonStyleText: styles.buttonWhiteText,
        };
      }
    }
  }, [variant]);

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle, !!icon && styles.buttonWithIcon]}
      activeOpacity={0.8}
      onPress={onPress}>
      {icon &&
        React.cloneElement(icon, {
          style: styles.icon,
        })}
      <Text style={[styles.buttonText, buttonStyleText]}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: getResponsiveSize(100),
    paddingHorizontal: getResponsiveSize(40),
    height: getResponsiveSize(43),
    shadowColor: COLORS.GREYISH_BROWN,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 7,
    shadowOpacity: 0.2,
  },
  buttonWithIcon: {
    paddingHorizontal: getResponsiveSize(12),
  },
  buttonPrimary: {
    backgroundColor: COLORS.AQUA_GREEN,
  },
  buttonWhite: {
    backgroundColor: COLORS.WHITE,
  },
  buttonText: {
    fontSize: getResponsiveSize(16),
    lineHeight: getResponsiveSize(18),
    textAlign: "center",
    fontWeight: "500",
  },
  buttonPrimaryText: {
    color: COLORS.WHITE,
  },
  buttonWhiteText: {
    color: COLORS.GREYISH_BROWN,
  },
  icon: {
    marginRight: getResponsiveSize(10),
    width: getResponsiveSize(17),
    height: getResponsiveSize(17),
  },
});

export default Button;
