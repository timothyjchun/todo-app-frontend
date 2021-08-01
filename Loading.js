import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Loading() {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>No Tasks Yet!🤔</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  textStyle: {
    alignContent: "center",
    justifyContent: "center",
    fontSize: 20,
  },
});
