import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { Text, StyleSheet, View, StatusBar, Image } from "react-native";
import { getResponsiveSize } from "../utils";
import Button from "../components/Button";
import { COLORS } from "../colors";

const SignInOptions = () => {
  return (
    <LinearGradient
      colors={[COLORS.MAIZE, COLORS.ORANGISH]}
      style={styles.view}>
      <StatusBar barStyle="light-content" />
      <View style={styles.logoWrapper}>
        <Image
          style={styles.logo}
          source={require("../assets/images/logo.png")}
        />
      </View>
      <Text style={styles.title}>
        Sign in to be able to save your preferences and settings.
      </Text>
      <View style={styles.buttonWrapper}>
        <Button icon={<Image source={require("../assets/icons/apple.png")} />}>
          Sign in with Apple
        </Button>
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          icon={<Image source={require("../assets/icons/facebook.png")} />}>
          Sign in with Facebook
        </Button>
      </View>
      <View style={styles.buttonWrapper}>
        <Button icon={<Image source={require("../assets/icons/google.png")} />}>
          Sign in with Google
        </Button>
      </View>
      <View style={styles.buttonWrapper}>
        <Button>Sign in with Email</Button>
      </View>
      <View style={styles.linkWrapper}>
        <Text style={styles.link} onPress={() => console.log("log in")}>
          Log in with Email
        </Text>
      </View>
      <View style={styles.privacy}>
        <Text style={styles.privacyText} allowFontScaling>
          By signing in you accept the {"\n"}
          <Text
            style={styles.privacyLink}
            onPress={() => console.log("general terms")}>
            General Terms
          </Text>{" "}
          and{" "}
          <Text
            style={styles.privacyLink}
            onPress={() => console.log("privacy policy")}>
            Privacy Policy
          </Text>
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: getResponsiveSize(38),
    paddingVertical: getResponsiveSize(38),
    flex: 1,
    justifyContent: "center",
  },
  logoWrapper: {
    alignItems: "center",
    marginBottom: getResponsiveSize(32),
  },
  logo: {
    width: getResponsiveSize(150),
    height: getResponsiveSize(150) * 0.85,
  },
  title: {
    fontSize: getResponsiveSize(18),
    lineHeight: getResponsiveSize(22),
    textAlign: "center",
    color: COLORS.WHITE,
    marginBottom: getResponsiveSize(30),
  },
  buttonWrapper: {
    marginBottom: getResponsiveSize(15),
    paddingHorizontal: getResponsiveSize(31),
  },
  linkWrapper: {
    marginTop: getResponsiveSize(5),
  },
  link: {
    textAlign: "center",
    color: COLORS.WHITE,
    fontSize: getResponsiveSize(16),
    lineHeight: getResponsiveSize(18),
    fontWeight: "600",
  },
  privacy: {
    marginTop: getResponsiveSize(38),
  },
  privacyText: {
    textAlign: "center",
    fontSize: getResponsiveSize(13),
    lineHeight: getResponsiveSize(16),
    color: COLORS.WHITE,
    opacity: 0.8,
  },
  privacyLink: {
    textDecorationLine: "underline",
  },
});

export default SignInOptions;
