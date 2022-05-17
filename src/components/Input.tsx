import React from "react";
import { ReturnKeyTypeOptions, StyleSheet, TextInput } from "react-native";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";
import { getResponsiveSize } from "../utils";

type Props = {
  value: string;
  onChange: (value: string) => void;
  variant?: "light" | "dark";
  type?: "text" | "password" | "email";
  autoFocus?: boolean;
  returnKeyType?: ReturnKeyTypeOptions;
  onSubmitEditing?: () => void;
  blurOnSubmit?: boolean;
};

const Input = React.forwardRef<TextInput, Props>(
  (
    {
      value,
      onChange,
      variant = "dark",
      type = "text",
      autoFocus,
      returnKeyType,
      onSubmitEditing,
      blurOnSubmit,
    },
    ref,
  ) => {
    return (
      <TextInput
        ref={ref}
        style={[styles.input, styles[variant]]}
        value={value}
        onChangeText={onChange}
        autoCapitalize="none"
        secureTextEntry={type === "password"}
        autoFocus={autoFocus}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        blurOnSubmit={blurOnSubmit}
        {...(type === "email" && {
          autoComplete: "email",
          keyboardType: "email-address",
          textContentType: "emailAddress",
        })}
      />
    );
  },
);

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: getResponsiveSize(11),
    height: getResponsiveSize(35),
    color: COLORS.GREYISH_BROWN,
    fontFamily: FONTS["ProximaNovaA-Bold"],
    borderRadius: 4,
  },
  dark: {
    backgroundColor: COLORS.SECONDARY,
  },
  light: {
    backgroundColor: COLORS.WHITE,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.05,
  },
});

export default Input;
