import { StyleSheet, SafeAreaView, View, ScrollView } from "react-native";
import Block from "../components/main/Block";
import Header from "../components/main/header";
import { PlayerContext } from "../components/other/PlayerContext";
import MediaControl from "../components/other/mediaController";
import React, { useContext, useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { lightTheme, darkTheme } from "../components/other/themes";
import { getData } from "../components/other/database";
export default function Main() {
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
  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: currentTheme.backgroundColor,
      alignItems: "center",
      justifyContent: "center",
    },
    outerContainer: {
      flex: 1,
      backgroundColor: currentTheme.ColorHeader,
    },
  });
  return (
    <View style={styles.outerContainer}>
      <SafeAreaView style={styles.safeArea}>
        <Header />
        <View style={styles.container}>
          <ScrollView style={{ width: "100%", marginTop: "1.5%" }}>
            <Block title={"LIKED"} libName={"Liked"} theme={currentTheme} />
            <Block
              title={"FOREST"}
              image={require("../img/forest.jpg")}
              libName={"Forest"}
              theme={currentTheme}
            />
            <Block
              title={"OCEAN"}
              image={require("../img/ocean.jpg")}
              libName={"Ocean"}
              theme={currentTheme}
            />
            <Block
              title={"RUNNING \n WATER"}
              image={require("../img/water.jpg")}
              libName={"Running water"}
              theme={currentTheme}
            />
            <Block
              title={"MANMADE"}
              image={require("../img/manmade.jpg")}
              libName={"Manmade"}
              theme={currentTheme}
            />
            <Block
              title={"SEASONS"}
              image={require("../img/seasons.jpg")}
              libName={"Seasons"}
              theme={currentTheme}
            />
          </ScrollView>
        </View>
        {soundRef.current !== null && triggerApear === true && (
          <MediaControl theme={currentTheme} />
        )}
      </SafeAreaView>
    </View>
  );
}
