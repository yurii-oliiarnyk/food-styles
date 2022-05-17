import React, { useContext } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import FormItem from "../../components/FormItem";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { COLORS } from "../../colors";
import { getResponsiveSize } from "../../utils";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useForm from "../../hooks/useForm";
import { gql, useMutation } from "@apollo/client";
import { validators } from "../../validators";
import Errors from "../../components/Errors";
import UserContext from "../../context/UserContext";

const UPDATE_USER = gql`
  mutation UpdateUser($name: NonEmptyString!, $email: EmailAddress!) {
    updateUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

const ProfileScreen = () => {
  const { top, bottom } = useSafeAreaInsets();
  const { logOut, user, updateUser } = useContext(UserContext);

  const {
    values: { name, email },
    setFieldValue,
    checkValidation,
    errorMessages,
  } = useForm<"name" | "email">(
    {
      name: user?.name ?? "",
      email: user?.email ?? "",
    },
    {
      name: validators.name,
      email: validators.email,
    },
  );

  const [updateUserInfo, { loading, error }] = useMutation(UPDATE_USER);

  const onSubmit = () => {
    if (checkValidation()) {
      updateUserInfo({
        variables: { name, email },
        onCompleted: ({ updateUser: updatedUser }) => {
          updateUser(updatedUser);
        },
      });
    }
  };

  return (
    <View style={styles.page}>
      <View style={[styles.view, { padding: top }]}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
          <Text style={styles.title}>PROFILE</Text>
        </View>
        <FormItem label="Name shown on your shared cards">
          <Input value={name} onChange={setFieldValue("name")} />
        </FormItem>
        <FormItem label="Email">
          <Input value={email} onChange={setFieldValue("email")} />
        </FormItem>
        {errorMessages.length > 0 && <Errors messages={errorMessages} />}
        <View style={styles.buttonWrapper}>
          <Button variant="grey" size="small" onPress={logOut}>
            LOG OUT
          </Button>
        </View>
      </View>
      <View style={[styles.controlsBar, { paddingBottom: bottom }]}>
        <View style={styles.controlsBarContent}>
          <Button onPress={onSubmit}>DONE</Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  view: {
    backgroundColor: COLORS.WHITE_TWO,
    paddingHorizontal: getResponsiveSize(18),
    paddingBottom: getResponsiveSize(50),
    flex: 1,
  },
  header: {
    paddingTop: getResponsiveSize(13),
    paddingBottom: getResponsiveSize(20),
  },
  title: {
    fontSize: getResponsiveSize(15),
    letterSpacing: getResponsiveSize(0.75),
    fontWeight: "bold",
    color: COLORS.GREYISH_BROWN,
  },
  buttonWrapper: {
    alignItems: "center",
    marginTop: "auto",
  },
  controlsBar: {
    backgroundColor: "#fff",
    alignItems: "center",
    shadowColor: "#000000",
    shadowRadius: 15,
    shadowOpacity: 0.1,
  },
  controlsBarContent: {
    marginTop: getResponsiveSize(-8),
  },
});

export default ProfileScreen;
