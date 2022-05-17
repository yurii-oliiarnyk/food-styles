import React, { useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigator from "./navigation/RootNavigator";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import UserContext, { User } from "./context/UserContext";

const httpLink = createHttpLink({
  uri: "https://api-dev.foodstyles.com/graphql",
});

const authLink = setContext(async (_, { headers }) => {
  const authToken = await AsyncStorage.getItem("accessToken");

  return {
    headers: {
      ...headers,
      authorization: authToken ? `Bearer ${authToken}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const Root = () => {
  const [user, setUser] = useState<User>();
  const isAuthorized = useMemo(() => !!user, [user]);

  const updateUser = (updatedUser: User) => setUser(updatedUser);

  const logOut = () => {
    setUser(undefined);
  };

  const signIn = (signInUser: User, accessToken: string) => {
    AsyncStorage.setItem("accessToken", accessToken);
    setUser(signInUser);
  };

  return (
    <SafeAreaProvider>
      <UserContext.Provider
        value={{
          user,
          isAuthorized,
          signIn,
          logOut,
          updateUser,
        }}>
        <ApolloProvider client={client}>
          <RootNavigator />
        </ApolloProvider>
      </UserContext.Provider>
    </SafeAreaProvider>
  );
};

export default Root;
