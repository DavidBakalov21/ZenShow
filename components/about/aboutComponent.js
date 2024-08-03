import React from "react";
import { View, StyleSheet, Text } from "react-native";

const AboutComponent = ({ title, textContent, theme }) => {
  let CompMargin = "10%";
  if (title === "") {
    CompMargin = "1%";
  }
  //console.log(CompMargin);
  const styles = StyleSheet.create({
    textContent: {
      marginTop: "3%",
      fontSize: 16,
      color: "white",
    },
    textTitle: {
      fontSize: 18,
      color: "white",
    },
    AboutComp: {
      marginTop: CompMargin,
    },
    line: {
      height: "0.7%",
      backgroundColor: theme.ColorHeader,
      marginVertical: "2%",
      width: "100%",
    },
  });
  return (
    <View style={styles.AboutComp}>
      <Text style={styles.textTitle}>{title}</Text>
      <Text style={styles.textContent}>{textContent}</Text>
      <View style={styles.line} />
    </View>
  );
};

export default AboutComponent;
