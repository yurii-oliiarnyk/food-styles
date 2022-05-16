import React, { useState } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import FormItem from "../../components/FormItem";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { COLORS } from "../../colors";
import { getResponsiveSize } from "../../utils";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ProfileScreen = () => {
  const [name, setName] = useState("Palle Derkert");
  const [email, setEmail] = useState("palle@obviuse.se");

  const { top, bottom } = useSafeAreaInsets();

  return (
    <View style={styles.page}>
      <View style={[styles.view, { padding: top }]}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
          <Text style={styles.title}>PROFILE</Text>
        </View>
        <FormItem label="Name shown on your shared cards">
          <Input value={name} onChange={setName} />
        </FormItem>
        <FormItem label="Email">
          <Input value={email} onChange={setEmail} />
        </FormItem>
        <View style={styles.buttonWrapper}>
          <Button variant="grey" size="small">
            LOG OUT
          </Button>
        </View>
      </View>
      <View style={[styles.controlsBar, { paddingBottom: bottom }]}>
        <View style={styles.controlsBarContent}>
          <Button>DONE</Button>
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
