import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../colors";
import { getResponsiveSize } from "../utils";

const Errors = ({ messages }: { messages: string[] }) => {
  return (
    <View style={styles.view}>
      {messages.map(message => (
        <View key={message} style={styles.message}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    marginBottom: getResponsiveSize(-8),
  },
  message: {
    backgroundColor: "red",
    marginBottom: getResponsiveSize(8),
    padding: getResponsiveSize(4),
  },
  messageText: {
    color: COLORS.WHITE,
    fontWeight: "bold",
    fontSize: getResponsiveSize(14),
  },
});

export default Errors;
