import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../../components/Button";
import FormItem from "../../components/FormItem";
import Header from "../../components/Header";
import Input from "../../components/Input";
import useForm from "../../hooks/useForm";
import AuthLayout from "../../layouts/AuthLayout";
import { validators } from "../../validators";
import { getResponsiveSize } from "../../utils";

const SignUpScreen = ({ back }: { back: () => void }) => {
  const {
    values: { name, password, email },
    setFieldValue,
    checkValidation,
    errorMessages,
  } = useForm<"name" | "password" | "email">(
    {
      name: "",
      password: "",
      email: "",
    },
    {
      name: validators.name,
      email: validators.email,
      password: validators.password,
    },
  );

  const onSubmit = () => {
    const isFormValid = checkValidation();

    if (isFormValid) {
      console.log(isFormValid);
    }
  };

  return (
    <AuthLayout header={<Header title="Sign up with Email" back={back} />}>
      <FormItem variant="light" label="Your name">
        <Input variant="light" value={name} onChange={setFieldValue("name")} />
      </FormItem>
      <FormItem variant="light" label="Email">
        <Input
          variant="light"
          value={email}
          onChange={setFieldValue("email")}
        />
      </FormItem>
      <FormItem
        variant="light"
        last
        label="Password"
        helper="(min 6 characters)">
        <Input
          type="password"
          variant="light"
          value={password}
          onChange={setFieldValue("password")}
        />
      </FormItem>
      {errorMessages.map(message => (
        <Text key={message}>{message}</Text>
      ))}
      <View style={styles.buttonView}>
        <Button onPress={onSubmit}>SIGN UP</Button>
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

export default SignUpScreen;
