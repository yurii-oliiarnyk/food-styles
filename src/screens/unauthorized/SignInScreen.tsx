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
import UserContext from "../../context/UserContext";
import useLoginWithEmailMutation from "../../hooks/mutations/useLoginWithEmailMutation";
import Loader from "../../components/Loader";

const SignInScreen = ({ back }: { back: () => void }) => {
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

  const onSubmit = () => {
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
    <View style={styles.view}>
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
      <Loader visible={loading} />
    </View>
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

export default SignInScreen;
