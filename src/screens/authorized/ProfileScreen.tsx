import React, { useContext, useMemo, useRef } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import FormItem from "../../components/FormItem";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { COLORS } from "../../constants/colors";
import { getResponsiveSize } from "../../utils";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useForm from "../../hooks/useForm";
import { validators } from "../../validators";
import Errors from "../../components/Errors";
import UserContext from "../../context/UserContext";
import useUpdateUserMutation from "../../hooks/mutations/useUpdateUserMutation";
import Loader from "../../components/Loader";
import { showMessage } from "react-native-flash-message";
import { FONTS } from "../../constants/fonts";

const ProfileScreen = () => {
  const refEmailInput = useRef<TextInput>(null);

  const { top, bottom } = useSafeAreaInsets();
  const { logOut, user, updateUser } = useContext(UserContext);
  const {
    updateUser: updateUserMutate,
    loading,
    error,
  } = useUpdateUserMutation();

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

  const submit = () => {
    if (checkValidation()) {
      updateUserMutate({ name, email }, updatedUser => {
        showMessage({
          message: "User's information successfully updated!",
          type: "info",
        });

        updateUser(updatedUser);
        Keyboard.dismiss();
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
    <KeyboardAvoidingView style={styles.page} behavior="height">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.page}>
          <View style={[styles.view, { padding: top }]}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
              <Text style={styles.title}>PROFILE</Text>
            </View>
            <FormItem label="Name shown on your shared cards">
              <Input
                value={name}
                onChange={setFieldValue("name")}
                returnKeyType="next"
                onSubmitEditing={() => refEmailInput.current?.focus()}
                blurOnSubmit={false}
              />
            </FormItem>
            <FormItem label="Email">
              <Input
                type="email"
                value={email}
                onChange={setFieldValue("email")}
                ref={refEmailInput}
                onSubmitEditing={submit}
                blurOnSubmit={false}
                returnKeyType="send"
              />
            </FormItem>
            {visibleErrors.length > 0 && <Errors messages={visibleErrors} />}
            <View style={styles.buttonWrapper}>
              <Button variant="grey" size="small" onPress={logOut}>
                LOG OUT
              </Button>
            </View>
          </View>
          <View style={[styles.controlsBar, { paddingBottom: bottom }]}>
            <View style={styles.controlsBarContent}>
              <Button onPress={submit}>DONE</Button>
            </View>
          </View>
          <Loader visible={loading} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
    fontFamily: FONTS["ProximaNovaA-Bold"],
    color: COLORS.GREYISH_BROWN,
  },
  buttonWrapper: {
    alignItems: "center",
    marginTop: "auto",
    paddingTop: getResponsiveSize(13),
  },
  controlsBar: {
    backgroundColor: "#fff",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000000",
        shadowRadius: 15,
        shadowOpacity: 0.1,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  controlsBarContent: {
    marginTop: getResponsiveSize(-8),
  },
});

export default ProfileScreen;
