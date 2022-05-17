import {
  createHttpLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Root from "./src/Root";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FlashMessage from "react-native-flash-message";

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

const App = () => (
  <ApolloProvider client={client}>
    <SafeAreaProvider>
      <Root />
      <FlashMessage position="top" />
    </SafeAreaProvider>
  </ApolloProvider>
);

export default App;
