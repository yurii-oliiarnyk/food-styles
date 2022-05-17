import React, { useContext, useMemo, useRef } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import Button from "../../components/Button";
import FormItem from "../../components/FormItem";
import Header from "../../components/Header";
import Input from "../../components/Input";
import useForm from "../../hooks/useForm";
import AuthLayout from "../../layouts/AuthLayout";
import { validators } from "../../validators";
import { getResponsiveSize } from "../../utils";
import Errors from "../../components/Errors";
import UserContext from "../../context/UserContext";
import useSignUpWithEmailMutation from "../../hooks/mutations/useSignUpWithEmailMutation";
import Loader from "../../components/Loader";

const SignUpScreen = ({ back }: { back: () => void }) => {
  const emailInput = useRef<TextInput>(null);
  const passwordInput = useRef<TextInput>(null);

  const { signIn } = useContext(UserContext);
  const { signUpWithEmail, error, loading } = useSignUpWithEmailMutation();

  const {
    values: { name, password, email },
    setFieldValue,
    checkValidation,
    errorMessages,
  } = useForm<"name" | "password" | "email">(
    {
      name: "test",
      password: "testtest",
      email: "test@test.io",
    },
    {
      name: validators.name,
      email: validators.email,
      password: validators.password,
    },
  );

  const submit = () => {
    if (checkValidation()) {
      signUpWithEmail({ email, name, password }, ({ accessToken, user }) => {
        signIn(user, accessToken, { email, password });
      });
    }
  };

  const visibleErrors = useMemo(() => {
    if (error?.message) {
      return [error.message];
    }

    return errorMessages;
  }, [error, errorMessages]);

  return (
    <KeyboardAvoidingView style={styles.view} behavior="height">
      <AuthLayout header={<Header title="Sign up with Email" back={back} />}>
        <FormItem variant="light" label="Your name">
          <Input
            variant="light"
            value={name}
            onChange={setFieldValue("name")}
            onSubmitEditing={() => emailInput.current?.focus()}
            blurOnSubmit={false}
            returnKeyType="next"
            autoFocus
          />
        </FormItem>
        <FormItem variant="light" label="Email">
          <Input
            ref={emailInput}
            type="email"
            variant="light"
            value={email}
            onChange={setFieldValue("email")}
            blurOnSubmit={false}
            returnKeyType="next"
            onSubmitEditing={() => passwordInput.current?.focus()}
          />
        </FormItem>
        <FormItem variant="light" label="Password" helper="(min 6 characters)">
          <Input
            ref={passwordInput}
            type="password"
            variant="light"
            value={password}
            onChange={setFieldValue("password")}
            blurOnSubmit={false}
            returnKeyType="send"
            onSubmitEditing={submit}
          />
        </FormItem>
        {visibleErrors.length > 0 && <Errors messages={visibleErrors} />}
        <View style={styles.buttonView}>
          <Button onPress={submit}>SIGN UP</Button>
        </View>
      </AuthLayout>
      <Loader visible={loading} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  buttonView: {
    alignItems: "center",
    marginTop: getResponsiveSize(13),
  },
});

export default SignUpScreen;
