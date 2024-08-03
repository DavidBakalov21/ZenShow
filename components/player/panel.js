import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
const Panel = ({ onChoiceSelect, onClose }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Icon name="close" size={30} color="black" />
      </TouchableOpacity>
      <Text style={styles.header}>Repeat</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => onChoiceSelect("1")}
        >
          <Text style={styles.optionText}>Once</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => onChoiceSelect("2")}
        >
          <Text style={styles.optionText}>Twice</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => onChoiceSelect("Always")}
        >
          <Text style={styles.optionText}>Always</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.1)", // almost fully transparent background
    borderRadius: 10,
  },
  closeButton: {
    position: "absolute",
    top: "10%",
    right: "10%",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: "7%",
    marginTop: "13%",
  },
  option: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  optionText: {
    fontSize: 16,
  },
  scrollViewContent: {
    alignItems: "center",
  },
});

export default Panel;
