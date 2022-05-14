import React, { useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { COLORS } from "../colors";
import Button from "../components/Button";
import FormItem from "../components/FormItem";
import Input from "../components/Input";
import { getResponsiveSize } from "../utils";

const SignUp = ({ back }: { back: () => void }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  return (
    <LinearGradient
      colors={[COLORS.MAIZE, COLORS.ORANGISH]}
      style={styles.view}>
      <StatusBar barStyle="light-content" />
      <FormItem label="Your name">
        <Input value={name} onChange={setName} />
      </FormItem>
      <FormItem label="Email">
        <Input value={email} onChange={setEmail} />
      </FormItem>
      <FormItem last label="Password" helper="(min 6 characters)">
        <Input value={password} onChange={setPassword} />
      </FormItem>
      <View style={styles.buttonView}>
        <Button>SIGN UP</Button>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: getResponsiveSize(38),
    paddingVertical: getResponsiveSize(38),
    flex: 1,
  },
  buttonView: {
    alignItems: "center",
    marginTop: getResponsiveSize(26),
  },
});

export default SignUp;
