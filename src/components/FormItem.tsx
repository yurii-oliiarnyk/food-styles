import React, { ReactChild } from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../colors";
import { getResponsiveSize } from "../utils";

const FormItem = ({
  label,
  helper,
  children,
  last,
}: {
  label: string;
  children: ReactChild;
  helper?: string;
  last?: boolean;
}) => {
  return (
    <View style={!last && styles.view}>
      <View style={styles.labelView}>
        <Text style={styles.label}>
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
  helper: {
    fontWeight: "400",
  },
});

export default FormItem;
