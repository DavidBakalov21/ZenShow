import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
const AlarmOption = ({ onChoiceSelect, optionText }) => {
  return (
    <TouchableOpacity
      style={styles.option}
      onPress={() => onChoiceSelect(optionText)}
    >
      <Text style={styles.optionText}>{optionText}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  option: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  optionText: {
    fontSize: 16,
  },
});

export default AlarmOption;
