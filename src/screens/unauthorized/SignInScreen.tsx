import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Button from "../../components/Button";
import FormItem from "../../components/FormItem";
import Header from "../../components/Header";
import Input from "../../components/Input";
import AuthLayout from "../../layouts/AuthLayout";
import { getResponsiveSize } from "../../utils";

const SignInScreen = ({ back }: { back: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthLayout header={<Header title="Log in" back={back} />}>
      <FormItem variant="light" label="Email">
        <Input variant="light" value={email} onChange={setEmail} />
      </FormItem>
      <FormItem variant="light" label="Password">
        <Input variant="light" value={password} onChange={setPassword} />
      </FormItem>
      <View style={styles.buttonView}>
        <Button>SIGN IN</Button>
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

export default SignInScreen;
