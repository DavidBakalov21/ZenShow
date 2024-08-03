import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, StatusBar, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Link } from "expo-router";
import { lightTheme, darkTheme } from "../other/themes";
import { useIsFocused } from "@react-navigation/native";
import { getData } from "../other/database";
function HeaderLib({ title, destination = "/" }) {
  const isFocused = useIsFocused();
  const [isDark, setIsDark] = useState(false);
  const currentTheme = isDark ? darkTheme : lightTheme;
  useEffect(() => {
    const loadThemePreference = async () => {
      const storedTheme = await getData("theme");
      if (storedTheme !== null) {
        setIsDark(storedTheme.isDark);
      }
    };
    loadThemePreference();
  }, [isFocused]);
  const styles = StyleSheet.create({
    header: {
      flex: 1,
      maxHeight: "6%",
      backgroundColor: currentTheme.ColorHeader,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 10,
      marginTop: StatusBar.currentHeight,
      borderBottomWidth: 1,
      borderBottomColor: currentTheme.headerBottomLine,
    },
    iconButton: {
      marginLeft: "3%",
    },
    titleContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    placeholder: {
      width: "10%",
    },
    text: {
      color: "#FFFFFF",
      fontSize: 18,
      fontWeight: "bold",
    },
  });
  return (
    <View style={styles.header}>
      <Link href={destination} asChild>
        <Pressable style={styles.iconButton}>
          <Icon name="chevron-back" size={24} color="white" />
        </Pressable>
      </Link>

      <View style={styles.titleContainer}>
        <Text style={styles.text}>{title}</Text>
      </View>
      <View style={styles.placeholder} />
    </View>
  );
}

export default HeaderLib;
