import React, { useContext, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import HeaderLib from "../components/library/headerLib";
import { PlayerContext } from "../components/other/PlayerContext";
import MediaControl from "../components/other/mediaController";
import { useIsFocused } from "@react-navigation/native";
import { lightTheme, darkTheme } from "../components/other/themes";
import { Link } from "expo-router";
import { getData } from "../components/other/database";
import clearTracks from "../components/settings/deleteFiles";
const Settings = () => {
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
  const clearAll = async () => {
    await clearTracks();
    Alert.alert("All tracks cleared");
  };

  const showAlert = () => {
    Alert.alert(
      "Clear all tracks",
      "This action will remove all downloaded tracks. Are you sure?",
      [
        {
          text: "Yes",
          onPress: clearAll,
        },
        {
          text: "No",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
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
      fontSize: 18,
      color: "white",
      //marginTop: 10,
    },
  });
  return (
    <View style={styles.outerContainer}>
      <SafeAreaView style={styles.safeArea}>
        <HeaderLib title={"Settings"} />
        <ScrollView style={styles.container}>
          <Link
            href={{
              pathname: "/about",
            }}
            asChild
            style={{ marginTop: "10%" }}
          >
            <Pressable>
              <Text style={styles.textContent}>About</Text>
            </Pressable>
          </Link>

          <Link
            href={{
              pathname: "/themepick",
            }}
            asChild
            style={{ marginTop: "10%" }}
          >
            <Pressable>
              <Text style={styles.textContent}>Change theme</Text>
            </Pressable>
          </Link>
          <Link
            href={{
              pathname: "/deletepage",
            }}
            asChild
            style={{ marginTop: "10%" }}
          >
            <Pressable>
              <Text style={styles.textContent}>Delete tracks</Text>
            </Pressable>
          </Link>
          <TouchableOpacity style={{ marginTop: "10%" }} onPress={showAlert}>
            <Text style={styles.textContent}>Clear all downloaded tracks</Text>
          </TouchableOpacity>
        </ScrollView>
        {soundRef.current !== null && triggerApear === true && (
          <MediaControl theme={currentTheme} />
        )}
      </SafeAreaView>
    </View>
  );
};

export default Settings;
