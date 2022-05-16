import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Button from "../components/Button";
import FormItem from "../components/FormItem";
import Header from "../components/Header";
import Input from "../components/Input";
import AuthLayout from "../layouts/AuthLayout";
import { getResponsiveSize } from "../utils";

const SignUp = ({ back }: { back: () => void }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  return (
    <AuthLayout header={<Header title="Sign up with Email" back={back} />}>
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
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    alignItems: "center",
    marginTop: getResponsiveSize(26),
  },
});

export default SignUp;
