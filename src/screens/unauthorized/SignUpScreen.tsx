import React, { useContext, useEffect, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import Button from "../../components/Button";
import FormItem from "../../components/FormItem";
import Header from "../../components/Header";
import Input from "../../components/Input";
import useForm from "../../hooks/useForm";
import AuthLayout from "../../layouts/AuthLayout";
import { validators } from "../../validators";
import { getResponsiveSize } from "../../utils";
import { gql, useMutation } from "@apollo/client";
import Errors from "../../components/Errors";
import UserContext from "../../context/UserContext";

const SIGN_UP_WITH_EMAIL = gql`
  mutation SignUpWithEmail(
    $name: NonEmptyString!
    $email: EmailAddress!
    $password: Password!
  ) {
    signUpWithEmail(name: $name, email: $email, password: $password) {
      user {
        id
        email
        name
      }
      accessToken
      refreshToken
    }
  }
`;

const SignUpScreen = ({ back }: { back: () => void }) => {
  const { signIn } = useContext(UserContext);

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

  const [signUp, { loading, error }] = useMutation(SIGN_UP_WITH_EMAIL);

  const onSubmit = () => {
    if (checkValidation()) {
      signUp({
        variables: { email, name, password },
        onCompleted: ({
          signUpWithEmail: { accessToken, refreshToken, user },
        }) => {
          signIn(user, accessToken, refreshToken);
        },
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
      {visibleErrors.length > 0 && <Errors messages={visibleErrors} />}
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
