import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Alert,
} from "react-native";
import { PlayerContext } from "../components/other/PlayerContext";
import MediaControl from "../components/other/mediaController";
import { useIsFocused } from "@react-navigation/native";
import ItemDelete from "../components/delete/deleteItem";
import HeaderLib from "../components/library/headerLib";
import { getData } from "../components/other/database";
import {
  deleteFileByName,
  listZenFiles,
} from "../components/delete/deleteFunctions";
import { lightTheme, darkTheme } from "../components/other/themes";
const deletePage = () => {
  const [fileList, setFileList] = useState([]);
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
    const performOperations = async () => {
      const files = await listZenFiles();
      setFileList(files);
      loadThemePreference();
    };
    performOperations();
  }, [isFocused]);

  const clearTrack = async (name) => {
    await deleteFileByName(name);
    const files = await listZenFiles();
    setFileList(files);
    const normalName = name.split(".");
    Alert.alert(`${normalName[0]} was deleted`);
  };

  const showAlert = (name) => {
    const normalName = name.split(".");
    Alert.alert(
      `Delete ${normalName[0]}`,
      `This action will remove ${normalName[0]}. Are you sure?`,
      [
        {
          text: "Yes",
          onPress: () => clearTrack(name),
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
      alignItems: "center",
    },
    scroll: {
      alignContent: "center",
    },
  });
  return (
    <View style={styles.outerContainer}>
      <SafeAreaView style={styles.safeArea}>
        <HeaderLib title={"Downloaded files"} destination={"settings"} />
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scroll}>
            {fileList.map((i) => (
              <ItemDelete
                key={i}
                trackName={i}
                deleteFunction={() => showAlert(i)}
                currentTheme={currentTheme}
              />
            ))}
          </ScrollView>
        </View>
        {soundRef.current !== null && triggerApear === true && (
          <MediaControl theme={currentTheme} />
        )}
      </SafeAreaView>
    </View>
  );
};

export default deletePage;
