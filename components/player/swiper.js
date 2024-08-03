import React from "react";
import { View, StyleSheet } from "react-native";

const Swiper = () => {
  return (
    <View style={styles.container}>
      <View style={styles.indicator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: "3%",
  },
  indicator: {
    width: "10%",
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#ffffff",
  },
});

export default Swiper;
