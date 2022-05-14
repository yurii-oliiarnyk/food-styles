import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { COLORS } from "../colors";
import { getResponsiveSize } from "../utils";

const Input = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <TextInput style={styles.input} value={value} onChangeText={onChange} />
  );
};

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: getResponsiveSize(11),
    backgroundColor: COLORS.WHITE,
    height: getResponsiveSize(35),
    color: COLORS.GREYISH_BROWN,
    fontWeight: "600",
    borderRadius: 4,
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
