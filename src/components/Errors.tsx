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
    marginBottom: getResponsiveSize(-6),
    alignItems: "center",
  },
  message: {
    backgroundColor: "red",
    marginBottom: getResponsiveSize(6),
    paddingHorizontal: getResponsiveSize(9),
    paddingVertical: getResponsiveSize(4),
  },
  messageText: {
    color: COLORS.WHITE,
    fontWeight: "bold",
    fontSize: getResponsiveSize(16),
    lineHeight: getResponsiveSize(17),
  },
});

export default Errors;
