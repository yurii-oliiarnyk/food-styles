import React, { useContext, useMemo } from "react";
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
import { gql, useMutation } from "@apollo/client";
import UserContext from "../../context/UserContext";

const LOGIN_WITH_EMAIL = gql`
  mutation LoginWithEmail($email: EmailAddress!, $password: NonEmptyString!) {
    loginWithEmail(email: $email, password: $password) {
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

const SignInScreen = ({ back }: { back: () => void }) => {
  const { signIn } = useContext(UserContext);

  const {
    values: { email, password },
    setFieldValue,
    checkValidation,
    errorMessages,
  } = useForm<"email" | "password">(
    {
      password: "testtest",
      email: "test@test.io",
    },
    { email: validators.email, password: validators.password },
  );

  const [login, { loading, error }] = useMutation(LOGIN_WITH_EMAIL);

  const onSubmit = () => {
    const isFormValid = checkValidation();

    if (isFormValid) {
      login({
        variables: { email, password },
        onCompleted: ({
          loginWithEmail: { accessToken, refreshToken, user },
        }) => {
          signIn(user, accessToken, refreshToken);
        },
      });
    }
  };

  const visibleErrors = useMemo(() => {
    console.log(error);

    if (error?.message) {
      return [error.message];
    }

    return errorMessages;
  }, [error, errorMessages]);

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
      {visibleErrors.length > 0 && <Errors messages={visibleErrors} />}
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
