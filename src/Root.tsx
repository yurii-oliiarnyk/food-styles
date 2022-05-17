import React, { useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RootNavigator from "./navigation/RootNavigator";
import UserContext from "./context/UserContext";
import useLoginWithEmailMutation from "./hooks/mutations/useLoginWithEmailMutation";
import { accessTokenKey, userCredentailsKey } from "./constants/storageKeys";
import Loader from "./components/Loader";
import { User } from "./types";

const Root = () => {
  const [user, setUser] = useState<User>();
  const [initialized, setInitialized] = useState(false);
  const isAuthorized = useMemo(() => !!user, [user]);

  const { loginWithEmail } = useLoginWithEmailMutation();

  const updateUser = (updatedUser: User) => setUser(updatedUser);

  const logOut = () => {
    AsyncStorage.removeItem(accessTokenKey);
    AsyncStorage.removeItem(userCredentailsKey);
    setUser(undefined);
  };

  const signIn = (
    signInUser: User,
    accessToken: string,
    credentials: { email: string; password: string },
  ) => {
    AsyncStorage.setItem(accessTokenKey, accessToken);
    AsyncStorage.setItem(userCredentailsKey, JSON.stringify(credentials));
    setUser(signInUser);
  };

  useEffect(() => {
    if (initialized) {
      return;
    }

    (async () => {
      const storageUserCredentialsJson = await AsyncStorage.getItem(
        userCredentailsKey,
      );
      const storageUserCredentials = storageUserCredentialsJson
        ? JSON.parse(storageUserCredentialsJson)
        : null;

      if (storageUserCredentials) {
        loginWithEmail(
          {
            email: storageUserCredentials.email,
            password: storageUserCredentials.password,
          },
          ({ accessToken, user: signInUser }) => {
            signIn(signInUser, accessToken, storageUserCredentials);
            setInitialized(true);
          },
          () => {
            setInitialized(true);
          },
        );
      } else {
        setInitialized(true);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized]);

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthorized,
        signIn,
        logOut,
        updateUser,
      }}>
      <RootNavigator />
      <Loader visible={!initialized} />
    </UserContext.Provider>
  );
};

export default Root;
