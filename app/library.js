import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import Item from "../components/library/item";
import HeaderLib from "../components/library/headerLib";
import { getData } from "../components/other/database";
import { PlayerContext } from "../components/other/PlayerContext";
import MediaControl from "../components/other/mediaController";
import { useIsFocused } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { lightTheme, darkTheme } from "../components/other/themes";
function Library() {
  const [like, setLiked] = useState([]);
  const [trigger, setTrigger] = useState(false);
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
  useEffect(() => {
    const fillList = async () => {
      try {
        const storedTracks = await getData("likedTracks");
        if (storedTracks) {
          setLiked(storedTracks);
        } else {
          setLiked([]);
        }
      } catch (e) {
        console.error("Failed to load liked tracks.", e);
      }
    };
    fillList();
  }, [trigger]);
  const triggerUpdate = () => {
    setTrigger((prev) => !prev);
  };
  const dictionary = {
    Forest: [
      "Birds in the forest",
      "Campfire in the forest",
      "Colorado mountains",
      "Forest at night",
      "Rain in a bamboo grove",
      "Spring meadow",
      "Summer meadow",
      "Woodland birdsong",
    ],
    Ocean: [
      "Calm tropical ocean",
      "Ocean waves",
      "Soft ocean currents",
      "Tropical beach",
    ],
    "Running water": [
      "Bustling river stream",
      "Calm night river",
      "Gentle river",
      "Gentle stream",
      "River in the jungle",
      "Waterfall in the forest",
    ],
    Manmade: ["Evening in New York City", "Farmyard", "Quiet fireplace"],
    Seasons: [
      "First snow",
      "Heavy rain and thunder",
      "Heavy rain",
      "Light rain",
      "Snowstorm in the night",
    ],
    Liked: like,
  };

  const { libName = "Seasons" } = useLocalSearchParams();
  //console.log(libName);
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
        <HeaderLib title={libName} />
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scroll}>
            {dictionary[libName].map((i) => (
              <Item
                key={i}
                trackName={i}
                album={libName}
                trackList={dictionary[libName]}
                rerenderTriger={triggerUpdate}
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
}

export default Library;
