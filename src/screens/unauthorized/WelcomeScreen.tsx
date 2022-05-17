import React from "react";
import { Text, StyleSheet, View, Image, Alert } from "react-native";
import { getResponsiveSize } from "../../utils";
import Button from "../../components/Button";
import { COLORS } from "../../constants/colors";
import AuthLayout from "../../layouts/AuthLayout";
import Link from "../../components/Link";
import { FONTS } from "../../constants/fonts";

const WelcomeScreen = ({
  signUpWithEmail,
  signInWithEmail,
}: {
  signUpWithEmail: () => void;
  signInWithEmail: () => void;
}) => {
  return (
    <View style={styles.view}>
      <AuthLayout>
        <View style={styles.content}>
          <View style={styles.logoWrapper}>
            <Image
              style={styles.logo}
              source={require("../../assets/images/logo.png")}
            />
          </View>
          <Text style={styles.title}>
            Sign in to be able to save your preferences and settings.
          </Text>
          <View style={styles.buttonWrapper}>
            <Button
              variant="white"
              icon={<Image source={require("../../assets/icons/apple.png")} />}>
              Sign in with Apple
            </Button>
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              variant="white"
              icon={
                <Image source={require("../../assets/icons/facebook.png")} />
              }>
              Sign in with Facebook
            </Button>
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              variant="white"
              icon={
                <Image source={require("../../assets/icons/google.png")} />
              }>
              Sign in with Google
            </Button>
          </View>
          <View style={styles.buttonWrapper}>
            <Button variant="white" onPress={signUpWithEmail}>
              Sign up with Email
            </Button>
          </View>
          <View style={styles.linkWrapper}>
            <Link onPress={signInWithEmail}>Log in with Email</Link>
          </View>
          <View style={styles.privacy}>
            <Text style={styles.privacyText} allowFontScaling>
              By signing in you accept the {"\n"}
              <Text
                style={styles.privacyLink}
                onPress={() => Alert.alert("General terms")}>
                General Terms
              </Text>{" "}
              and{" "}
              <Text
                style={styles.privacyLink}
                onPress={() => Alert.alert("Privacy policy")}>
                Privacy Policy
              </Text>
            </Text>
          </View>
        </View>
      </AuthLayout>
      <View style={styles.labelWrapper}>
        <Text style={styles.labelText}>BETA VERSION</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  content: {
    justifyContent: "center",
    flex: 1,
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
    fontFamily: FONTS["ProximaNovaA-Regular"],
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
  privacy: {
    marginTop: getResponsiveSize(38),
  },
  privacyText: {
    textAlign: "center",
    fontSize: getResponsiveSize(13),
    lineHeight: getResponsiveSize(16),
    color: COLORS.WHITE,
    opacity: 0.8,
    fontFamily: FONTS["ProximaNovaA-Semibold"],
  },
  privacyLink: {
    textDecorationLine: "underline",
  },
  labelWrapper: {
    backgroundColor: COLORS.TOMATO,
    shadowColor: COLORS.GREYISH_BROWN,
    paddingVertical: getResponsiveSize(9),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 10,
    shadowOpacity: 0.3,
    position: "absolute",
    left: "-33%",
    top: getResponsiveSize(45),
    width: "100%",
    transform: [{ rotate: "-30deg" }],
  },
  labelText: {
    color: COLORS.WHITE,
    fontFamily: FONTS["ProximaNovaA-Bold"],
    fontSize: getResponsiveSize(17),
    letterSpacing: getResponsiveSize(0.77),
    textAlign: "center",
  },
});

export default WelcomeScreen;
