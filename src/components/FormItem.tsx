import React, { ReactChild } from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../colors";
import { getResponsiveSize } from "../utils";

const FormItem = ({
  label,
  children,
  variant = "dark",
  helper,
}: {
  label: string;
  children: ReactChild;
  variant?: "light" | "dark";
  helper?: string;
}) => {
  return (
    <View style={styles.view}>
      <View style={styles.labelView}>
        <Text style={[styles.label, styles[variant]]}>
          {label}
          {helper && <Text style={styles.helper}>{helper}</Text>}
        </Text>
      </View>
      <View>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    marginBottom: getResponsiveSize(13),
  },
  labelView: {
    marginBottom: getResponsiveSize(7),
  },
  label: {
    fontSize: getResponsiveSize(16),
    lineHeight: getResponsiveSize(19),
    fontWeight: "600",
    color: COLORS.WHITE,
  },
  light: {
    color: COLORS.WHITE,
  },
  dark: {
    color: COLORS.GREYISH_BROWN,
  },
  helper: {
    fontWeight: "400",
  },
});

export default FormItem;
