import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AlarmOption from "./AlarmOption";
const PanelAlarm = ({ onChoiceSelect, onClose, optionList }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Icon name="close" size={30} color="black" />
      </TouchableOpacity>
      <Text style={styles.header}>When to stop ?</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {optionList.map((i) => (
          <AlarmOption onChoiceSelect={onChoiceSelect} optionText={i} key={i} />
        ))}
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
    backgroundColor: "rgba(255, 255, 255, 0.1)",
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
  scrollViewContent: {
    alignItems: "center",
  },
});

export default PanelAlarm;
