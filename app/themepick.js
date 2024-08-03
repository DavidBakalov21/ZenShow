import React, { useContext, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  Pressable,
  StatusBar,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { Link } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import { PlayerContext } from "../components/other/PlayerContext";
import MediaControl from "../components/other/mediaController";
import { useIsFocused } from "@react-navigation/native";
import { storeData, getData } from "../components/other/database";
import { lightTheme, darkTheme } from "../components/other/themes";
const ThemePick = () => {
  const { soundRef, triggerApear } = useContext(PlayerContext);
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

  const handleThemeChange = async (value) => {
    setIsDark(value);
    await storeData("theme", { isDark: value });
  };
  const styles = StyleSheet.create({
    outerContainer: {
      flex: 1,
      backgroundColor: currentTheme.ColorHeader,
    },
    safeArea: {
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: currentTheme.backgroundColor,
      paddingLeft: "5%",
    },
    textTouchableOpacity: {
      marginTop: "6%",
    },
    text: {
      fontSize: 18,
      color: "white",
    },
    textContent: {
      fontSize: 16,
      color: "white",
      marginTop: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginVertical: 10,
      color: "white",
    },
    radioButton: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 5,
    },
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
    textHeader: {
      color: "#FFFFFF",
      fontSize: 18,
      fontWeight: "bold",
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
  });
  return (
    <View style={styles.outerContainer}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header*/}
        <View style={styles.header}>
          <Link href="/settings" asChild>
            <Pressable style={styles.iconButton}>
              <Icon name="chevron-back" size={24} color="white" />
            </Pressable>
          </Link>

          <View style={styles.titleContainer}>
            <Text style={styles.textHeader}>Theme picker</Text>
          </View>
          <View style={styles.placeholder} />
        </View>
        {/* Header */}

        <ScrollView style={styles.container}>
          <Text style={styles.title}>Choose theme</Text>
          <RadioButton.Group
            onValueChange={(value) => handleThemeChange(value === "true")}
            value={isDark ? "true" : "false"}
          >
            <View style={styles.radioButton}>
              <RadioButton value="false" color="#FFFFFF" />
              <Text style={styles.textContent}>Default Theme</Text>
            </View>
            <View style={styles.radioButton}>
              <RadioButton value="true" color="#FFFFFF" />
              <Text style={styles.textContent}>Dark Theme</Text>
            </View>
          </RadioButton.Group>
        </ScrollView>
        {soundRef.current !== null && triggerApear === true && (
          <MediaControl theme={currentTheme} />
        )}
      </SafeAreaView>
    </View>
  );
};

export default ThemePick;
