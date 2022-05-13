import React from "react";
import { Text, StyleSheet, SafeAreaView, View } from "react-native";

const App = () => {
  return (
    <SafeAreaView>
      <View style={styles.view}>
        <Text style={styles.text}>Hello world!</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    padding: 16,
  },
  text: {
    fontSize: 32,
    textAlign: "center",
  },
});

export default App;
