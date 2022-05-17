import React, { useContext, useMemo, useRef } from "react";
import {
  Alert,
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
import useLoginWithEmailMutation from "../../hooks/mutations/useLoginWithEmailMutation";
import Loader from "../../components/Loader";
import Link from "../../components/Link";

const SignInScreen = ({ back }: { back: () => void }) => {
  const passwordInput = useRef<TextInput>(null);
  const { signIn } = useContext(UserContext);
  const { error, loading, loginWithEmail } = useLoginWithEmailMutation();

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

  const submit = () => {
    const isFormValid = checkValidation();

    if (isFormValid) {
      loginWithEmail({ email, password }, ({ accessToken, user }) => {
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
      <AuthLayout header={<Header title="Log in" back={back} />}>
        <FormItem variant="light" label="Email">
          <Input
            type="email"
            autoFocus
            variant="light"
            value={email}
            onChange={setFieldValue("email")}
            onSubmitEditing={() => passwordInput.current?.focus()}
            returnKeyType="next"
            blurOnSubmit={false}
          />
        </FormItem>
        <FormItem variant="light" label="Password">
          <Input
            ref={passwordInput}
            type="password"
            variant="light"
            value={password}
            onChange={setFieldValue("password")}
            onSubmitEditing={submit}
            returnKeyType="send"
            blurOnSubmit={false}
          />
        </FormItem>
        {visibleErrors.length > 0 && <Errors messages={visibleErrors} />}
        <View style={styles.buttonView}>
          <Button onPress={submit}>SIGN IN</Button>
        </View>
        {error?.message && (
          <View style={styles.linkWrapper}>
            <Link
              onPress={() =>
                Alert.alert("Oops... functionality has not ready yet")
              }>
              Forgot my password
            </Link>
          </View>
        )}
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
  linkWrapper: {
    marginTop: getResponsiveSize(21),
  },
});

export default SignInScreen;
