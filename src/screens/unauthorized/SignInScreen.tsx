import React from "react";
import { StyleSheet, View } from "react-native";
import Button from "../../components/Button";
import FormItem from "../../components/FormItem";
import Header from "../../components/Header";
import Input from "../../components/Input";
import useForm from "../../hooks/useForm";
import AuthLayout from "../../layouts/AuthLayout";
import { validators } from "../../validators";
import { getResponsiveSize } from "../../utils";
import Errors from "../../components/Errors";

const SignInScreen = ({ back }: { back: () => void }) => {
  const {
    values: { email, password },
    setFieldValue,
    checkValidation,
    errorMessages,
  } = useForm<"email" | "password">(
    { email: "", password: "" },
    { email: validators.email, password: validators.password },
  );

  const onSubmit = () => {
    const isFormValid = checkValidation();

    if (isFormValid) {
      console.log(isFormValid);
    }
  };

  return (
    <AuthLayout header={<Header title="Log in" back={back} />}>
      <FormItem variant="light" label="Email">
        <Input
          variant="light"
          value={email}
          onChange={setFieldValue("email")}
        />
      </FormItem>
      <FormItem variant="light" label="Password">
        <Input
          type="password"
          variant="light"
          value={password}
          onChange={setFieldValue("password")}
        />
      </FormItem>
      {errorMessages.length > 0 && <Errors messages={errorMessages} />}
      <View style={styles.buttonView}>
        <Button onPress={onSubmit}>SIGN IN</Button>
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
