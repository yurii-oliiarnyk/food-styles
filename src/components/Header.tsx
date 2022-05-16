import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "../colors";
import { getResponsiveSize } from "../utils";

const Header = ({ title, back }: { title: string; back?: () => void }) => {
  const { top } = useSafeAreaInsets();

  return (
    <View style={[{ marginTop: top }, styles.header]}>
      {typeof back === "function" && (
        <TouchableOpacity
          onPress={back}
          style={styles.backButton}
          activeOpacity={0.8}>
          <Image
            style={styles.backButtonIcon}
            source={require("../assets/icons/back.png")}
          />
        </TouchableOpacity>
      )}
      <Text numberOfLines={1} style={styles.title}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    margin: getResponsiveSize(6),
    height: getResponsiveSize(41),
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  title: {
    paddingHorizontal: getResponsiveSize(41 + 12),
    color: COLORS.WHITE,
    fontSize: getResponsiveSize(20),
    lineHeight: getResponsiveSize(22),
    fontWeight: "bold",
    textAlign: "center",
  },
  backButton: {
    width: getResponsiveSize(41),
    height: getResponsiveSize(41),
    borderRadius: 100,
    backgroundColor: COLORS.WHITE,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 0,
    top: getResponsiveSize(3),
  },
  backButtonIcon: {
    width: getResponsiveSize(20),
    marginLeft: getResponsiveSize(4),
    resizeMode: "contain",
  },
});

export default Header;
