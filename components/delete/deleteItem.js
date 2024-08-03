import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
function ItemDelete({ trackName, currentTheme, deleteFunction }) {
  const normalName = trackName.split(".")[0];
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      backgroundColor: currentTheme.backgroundColor,
    },
    innerCont: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottomWidth: 1,
      borderBottomColor: currentTheme.ColorHeader,
      width: "93%",
      marginHorizontal: "3.5%",
    },
    trackInfo: {
      flexDirection: "row",
      alignItems: "center",
    },
    image: {
      width: 50,
      height: 50,
      borderRadius: 5,
      marginRight: 10,
    },
    trackName: {
      marginLeft: "3%",
      fontSize: 16,
      color: currentTheme.textColor,
    },
    iconButton: {
      padding: 10,
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.innerCont}>
        <Text style={styles.trackName}>{normalName}</Text>
        <TouchableOpacity style={styles.iconButton} onPress={deleteFunction}>
          <Icon name={"trash-outline"} size={18} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ItemDelete;
