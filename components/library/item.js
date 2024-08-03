import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Link } from "expo-router";
import { PlayerContext } from "../other/PlayerContext";
import Icon from "react-native-vector-icons/Ionicons";
import { storeData, getData } from "../other/database";
import { useIsFocused } from "@react-navigation/native";
function Item({ trackName, album, rerenderTriger, trackList, currentTheme }) {
  const [liked, setLiked] = useState(false);
  const isFocused = useIsFocused();
  const { trackNameRef } = useContext(PlayerContext);
  const isCurrent = trackNameRef.current === trackName;
  useEffect(() => {
    const checkLikedStatus = async () => {
      const storedTracks = await getData("likedTracks");
      if (storedTracks && storedTracks.includes(trackName)) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    };
    checkLikedStatus();
  }, [isFocused]);
  const handleLikePress = async () => {
    const storedTracks = await getData("likedTracks");
    let updatedTracks = [];

    if (storedTracks) {
      if (storedTracks.includes(trackName)) {
        // Remove the track
        updatedTracks = storedTracks.filter((track) => track !== trackName);
        setLiked(false);
      } else {
        // Add the track
        updatedTracks = [...storedTracks, trackName];
        setLiked(true);
      }
    } else {
      // If no tracks are stored, add the first track
      updatedTracks = [trackName];
      setLiked(true);
    }

    await storeData("likedTracks", updatedTracks);
    rerenderTriger();
  };
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
      color: isCurrent ? currentTheme.currentTrack : currentTheme.textColor,
    },
    iconButton: {
      padding: 10,
    },
  });
  return (
    <Link
      href={{
        pathname: "/player",
        params: {
          trackName: trackName,
          album: album,
          trackList: JSON.stringify(trackList),
        },
      }}
      asChild
    >
      <Pressable style={styles.container}>
        <View style={styles.innerCont}>
          <Text style={styles.trackName}>{trackName}</Text>
          <TouchableOpacity style={styles.iconButton} onPress={handleLikePress}>
            <Icon
              name={liked ? "heart" : "heart-outline"}
              size={18}
              color="#ffffff"
            />
          </TouchableOpacity>
        </View>
      </Pressable>
    </Link>
  );
}

export default Item;
