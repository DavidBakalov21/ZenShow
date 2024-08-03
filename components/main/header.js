import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import * as MailComposer from "expo-mail-composer";
import { useIsFocused } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { lightTheme, darkTheme } from "../other/themes";
import { getData } from "../other/database";
const Header = () => {
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
      marginTop: StatusBar.currentHeight,
      alignItems: "center",
      paddingHorizontal: 10,
      borderBottomWidth: 1,
      borderBottomColor: currentTheme.headerBottomLine,
    },
    PlayList: {
      color: "white",
      fontSize: 24,
      marginRight: "23%",
    },
    iconsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
    iconButton: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: "1%",
    },

    buttonContainer: {
      flex: 1,
      maxHeight: "85%",
      maxWidth: "29%",
      borderRadius: 30,
      overflow: "hidden",
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 30,
      borderWidth: 2,
      borderColor: "#FFFFFF",
    },
    text: {
      color: "#322F2F",
      fontSize: 14,
      //  fontFamily: "Inter",
      fontWeight: "400",
      lineHeight: 24,
      flexWrap: "wrap",
    },
  });
  const sendEmail = async () => {
    const options = {
      recipients: ["alex@flipifymedia.com"],
      subject: "Feedback",
      body: "Write your feedback here",
    };

    try {
      const result = await MailComposer.composeAsync(options);
    } catch (error) {
      console.error("An error occurred:", error);
      Alert.alert("Error", "No email account is configured.");
    }
  };

  return (
    <View style={styles.header}>
      <View style={styles.iconsContainer}>
        <TouchableOpacity style={styles.buttonContainer} onPress={sendEmail}>
          <LinearGradient
            colors={["#d1d1d1", "#e1e1e1"]}
            style={styles.button}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.text}>Feedback</Text>
          </LinearGradient>
        </TouchableOpacity>
        <Text style={styles.PlayList}>Playlists</Text>
        <Link href="/settings" asChild>
          <Pressable style={styles.iconButton}>
            <Icon name="settings-outline" size={24} color="white" />
          </Pressable>
        </Link>
      </View>
    </View>
  );
};

export default Header;
