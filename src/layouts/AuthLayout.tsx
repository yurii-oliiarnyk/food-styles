import React, { ReactNode, useMemo } from "react";
import {
  StatusBar,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "../colors";
import { getResponsiveSize } from "../utils";

const AuthLayout = ({
  children,
  header,
}: {
  children: ReactNode;
  header?: ReactNode;
}) => {
  const { top, bottom } = useSafeAreaInsets();

  const offsetStyles = useMemo<StyleProp<ViewStyle>>(
    () => ({
      paddingTop: !header ? top : 0,
      paddingBottom: bottom,
    }),
    [top, bottom, header],
  );

  return (
    <LinearGradient
      colors={[COLORS.MAIZE, COLORS.ORANGISH]}
      angle={230}
      useAngle
      style={[styles.layout, offsetStyles]}>
      <StatusBar barStyle="light-content" />
      {header}
      <View style={styles.content}>{children}</View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: getResponsiveSize(38),
    paddingVertical: getResponsiveSize(12),
  },
});

export default AuthLayout;
