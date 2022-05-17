import React, { ReactElement, useMemo } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";
import { getResponsiveSize } from "../utils";

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  onPress,
  icon,
}: {
  children: string;
  onPress?: () => void;
  variant?: "primary" | "white" | "grey";
  size?: "medium" | "small";
  icon?: ReactElement;
}) => {
  const { variantButtonStyle, varaintTextStyle } = useMemo<{
    variantButtonStyle: StyleProp<ViewStyle>;
    varaintTextStyle: StyleProp<TextStyle>;
  }>(() => {
    switch (variant) {
      case "primary": {
        return {
          variantButtonStyle: styles.buttonPrimary,
          varaintTextStyle: styles.buttonPrimaryText,
        };
      }

      case "white": {
        return {
          variantButtonStyle: styles.buttonWhite,
          varaintTextStyle: styles.buttonWhiteText,
        };
      }

      case "grey": {
        return {
          variantButtonStyle: styles.buttonGrey,
          varaintTextStyle: styles.buttonGreyText,
        };
      }
    }
  }, [variant]);

  const sizeTextStyle = useMemo(() => {
    switch (size) {
      case "medium": {
        return styles.buttonMediumText;
      }

      case "small": {
        return styles.buttonSmallText;
      }
    }
  }, [size]);

  return (
    <TouchableOpacity
      style={[
        styles.button,
        variantButtonStyle,
        !!icon && styles.buttonWithIcon,
      ]}
      activeOpacity={0.8}
      onPress={onPress}>
      {icon &&
        React.cloneElement(icon, {
          style: styles.icon,
        })}
      <Text style={[styles.buttonText, sizeTextStyle, varaintTextStyle]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const getButtonShadow = () => ({
  shadowColor: COLORS.GREYISH_BROWN,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowRadius: 7,
  shadowOpacity: 0.2,
});

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: getResponsiveSize(100),
    paddingHorizontal: getResponsiveSize(39),
    height: getResponsiveSize(43),
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "transparent",
  },
  buttonWithIcon: {
    paddingHorizontal: getResponsiveSize(11),
  },
  buttonPrimary: {
    backgroundColor: COLORS.AQUA_GREEN,
    ...getButtonShadow(),
  },
  buttonWhite: {
    backgroundColor: COLORS.WHITE,
    ...getButtonShadow(),
  },
  buttonGrey: {
    backgroundColor: COLORS.WHITE_TWO,
    borderColor: COLORS.WHITE_THREE,
  },
  buttonText: {
    textAlign: "center",
    fontFamily: FONTS["ProximaNovaA-Bold"],
  },
  buttonPrimaryText: {
    color: COLORS.WHITE,
  },
  buttonWhiteText: {
    color: COLORS.GREYISH_BROWN,
  },
  buttonGreyText: {
    color: COLORS.GREYISH_BROWN,
  },
  buttonMediumText: {
    fontSize: getResponsiveSize(16),
  },
  buttonSmallText: {
    fontSize: getResponsiveSize(13),
  },
  icon: {
    marginRight: getResponsiveSize(10),
    width: getResponsiveSize(17),
    height: getResponsiveSize(17),
  },
});

export default Button;
