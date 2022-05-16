import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Root from "./src/Root";

const App = () => (
  <SafeAreaProvider>
    <Root />
  </SafeAreaProvider>
);

export default App;
