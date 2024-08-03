import React, { useContext } from "react";
import { FAB } from "react-native-paper";
import { PlayerContext } from "./PlayerContext";
import { Link } from "expo-router";
import { StyleSheet, View, Pressable } from "react-native";
const MeadiaControll = ({ theme }) => {
  const {
    isPlaying,
    soundRef,
    setIsPlaying,
    trackListRef,
    trackNameRef,
    albumRef,
  } = useContext(PlayerContext);
  const HandlePlay = async () => {
    if (isPlaying) {
      //console.log(isPlaying);
      setIsPlaying(false);
      await soundRef.current.pauseAsync();
    } else {
      //  console.log(isPlaying);
      setIsPlaying(true);
      await soundRef.current.playAsync();
    }
  };
  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      right: "5%",
      bottom: "5%",
      alignItems: "center",
    },
    fab: {
      backgroundColor: "black",
      borderWidth: 1,
      width: 66,
      height: 66,
      borderRadius: 33,
      borderColor: theme.fabBorder,
      opacity: 0.55,
      alignItems: "center",
      justifyContent: "center",
    },
    upFab: {
      backgroundColor: "black",
      borderWidth: 1,
      width: 66,
      height: 66,
      borderRadius: 33,
      borderColor: theme.fabBorder,
      opacity: 0.55,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "4%",
    },
  });
  return (
    <View style={styles.container}>
      <FAB
        icon={isPlaying ? "pause" : "play"}
        onPress={HandlePlay}
        style={[styles.upFab]}
        color="white"
      />
      <Link
        href={{
          pathname: "/player",
          params: {
            trackName: trackNameRef.current,
            album: albumRef.current,
            trackList: JSON.stringify(trackListRef.current),
          },
        }}
        asChild
      >
        <Pressable>
          <FAB icon={"chevron-up"} style={styles.fab} color="white" />
        </Pressable>
      </Link>
    </View>
  );
};

export default MeadiaControll;
