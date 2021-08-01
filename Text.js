import React from "react";
import { TouchableOpacity, StyleSheet, Text, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import PropTypes from "prop-types";
import axios from "axios";

export default function ShowData({ data }) {
  const color = data["color"];
  const text = data["text"];
  const colorOption = {
    blue: ["rgba(7,207,255,0.7)", "rgba(161,38,250,0.7)"],
    red: ["rgba(255,7,226,0.7)", "rgba(0,10,255,0.7)"],
    green: ["rgba(7,255,7,0.7)", "rgba(255,0,235,0.7)"],
  };
  return (
    <LinearGradient
      style={styles.container}
      colors={colorOption[color]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 1 }}
    >
      <Text style={styles.textStyle}>{text}</Text>
    </LinearGradient>
  );
}

ShowData.propTypes = {
  data: PropTypes.shape({
    color: PropTypes.string,
    id: PropTypes.number,
    text: PropTypes.string,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    height: 70,
    width: 350,
  },
  textStyle: {
    flex: 1,
    textAlignVertical: "center",
    textAlign: "center",
    color: "white",
    fontSize: 15,
  },
});
