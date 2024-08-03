import React, { useEffect, useState, useRef, useContext } from "react";
import Slider from "@react-native-community/slider";
import { BlurView } from "expo-blur";
import { useKeepAwake } from "expo-keep-awake";
import { PanGestureHandler } from "react-native-gesture-handler";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Animated,
  Easing,
} from "react-native";
import { useRouter } from "expo-router";
import getMp3Url from "../components/player/stream";
import PanelAlarm from "../components/player/panelAlarm";
import { Audio } from "expo-av";
import Icon from "react-native-vector-icons/Ionicons";
import { mediaResources } from "../components/other/mediaMapping";
import Panel from "../components/player/panel";
import { storeData, getData } from "../components/other/database";
import { PlayerContext } from "../components/other/PlayerContext";
import Download from "../components/other/downloadComponent";
import Swiper from "../components/player/swiper";
import ShareComponent from "../components/player/share";
import * as FileSystem from "expo-file-system";
import { useIsFocused } from "@react-navigation/native";
import { useLocalSearchParams, Link } from "expo-router";
function Player() {
  const {
    isPlaying,
    soundRef,
    setIsPlaying,
    setTriggerAppear,
    trackListRef,
    trackNameRef,
    albumRef,
    setPosition,
    position,
    repeatRef,
    selectedChoice,
  } = useContext(PlayerContext);
  const router = useRouter();
  const isFocused = useIsFocused();
  //Keeping phone awake
  useKeepAwake();
  //Keeping phone awake
  const { trackName, album, trackList } = useLocalSearchParams();
  const trackListConverted = JSON.parse(trackList);
  const [currentTrack, setCurrentTrack] = useState(trackName);
  const media = mediaResources[currentTrack] || {};
  const backgroundImage = media.background;
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [repeaterColor, setRepeaterColor] = useState("#fff");
  const panelAnim = useRef(new Animated.Value(0)).current;
  const [rerender, setRerender] = useState(false);
  const [liked, setLiked] = useState(false);
  const [AlarmColor, setAlarmColor] = useState("#fff");
  const AlarmRef = useRef(false);
  const panelAlarmAnim = useRef(new Animated.Value(0)).current;
  const selectedAlarmChoice = useRef(null);
  const [isBlurred, setIsBlurred] = useState(false);
  const [isSharable, setIsSharable] = useState(false);
  const handleSharable = (completed) => {
    setIsSharable(completed);
  };
  const handleGesture = (event) => {
    //  console.log("Gesture");
    if (event.nativeEvent.translationY > 50) {
      router.push({
        pathname: "/library",
        params: { libName: album },
      });
    }
  };
  useEffect(() => {
    const configureAudio = async () => {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
    };

    configureAudio();
  }, []);
  useEffect(() => {
    if (isFocused) {
      setCurrentTrack(trackName);
      setRepeaterColor(repeatRef.current ? "#008000" : "#fff");
      setAlarmColor("#fff");
      AlarmRef.current = false;
      selectedAlarmChoice.current = null;
    }
  }, [isFocused]);
  useEffect(() => {
    const configureTrack = async () => {
      if (soundRef.current === null) {
        setTriggerAppear(true);
        const directoryUri = FileSystem.documentDirectory + "Zen/";
        const fileUri = directoryUri + currentTrack + ".mp3";
        const fileInfo = await FileSystem.getInfoAsync(fileUri);
        let url = fileUri;
        if (!fileInfo.exists) {
          console.log("File doesn't exist");
          url = await getMp3Url(currentTrack);
          if (url === null) {
            Alert.alert("Error: maybe it's your internet");
            return;
          }
        }
        const { sound: newSound } = await Audio.Sound.createAsync({ uri: url });
        soundRef.current = newSound;
        await soundRef.current.setPositionAsync(position);
        await soundRef.current.setVolumeAsync(volume);
        soundRef.current.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        if (selectedAlarmChoice.current !== currentTrack) {
          await soundRef.current.playAsync();
          setIsPlaying(true);
        } else {
          setIsPlaying(false);
          const newAlarm = !AlarmRef.current;
          AlarmRef.current = newAlarm;
          setAlarmColor(newAlarm ? "#008000" : "#fff");
          selectedAlarmChoice.current = null;
        }
      } else {
        setTriggerAppear(true);
        //  await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
        soundRef.current = null;
        setIsPlaying(true);
        const directoryUri = FileSystem.documentDirectory + "Zen/";
        const fileUri = directoryUri + currentTrack + ".mp3";
        const fileInfo = await FileSystem.getInfoAsync(fileUri);
        let url = fileUri;
        if (!fileInfo.exists) {
          console.log("File doesn't exist");
          url = await getMp3Url(currentTrack);
          if (url === null) {
            Alert.alert("Error: maybe it's your internet");
            return;
          }
        }
        const { sound: newSound } = await Audio.Sound.createAsync({ uri: url });
        soundRef.current = newSound;
        if (currentTrack !== trackNameRef.current) {
          //  console.log("different tracks");
          await soundRef.current.setPositionAsync(0);
        } else {
          //console.log("same track");
          await soundRef.current.setPositionAsync(position);
        }
        await soundRef.current.setVolumeAsync(volume);
        soundRef.current.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        await soundRef.current.playAsync();
      }
    };
    const checkLikedStatus = async () => {
      const storedTracks = await getData("likedTracks");
      if (storedTracks && storedTracks.includes(currentTrack)) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    };
    const combiner = async () => {
      checkLikedStatus();
      await configureTrack();
      trackListRef.current = trackListConverted;
      trackNameRef.current = currentTrack;
      albumRef.current = album;
      //console.log("we're done");
    };
    combiner();
  }, [currentTrack]);

  const playSound = async () => {
    if (soundRef.current) {
      if (isPlaying) {
        await soundRef.current.pauseAsync();
        setIsPlaying(false);
      } else {
        await soundRef.current.playAsync();
        setIsPlaying(true);
      }
    }
  };
  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis);

      if (status.didJustFinish) {
        if (repeatRef.current) {
          if (selectedChoice.current === "Always") {
            setPosition(0);
            soundRef.current.replayAsync();
          } else if (selectedChoice.current > 0) {
            setPosition(0);
            soundRef.current.replayAsync();
            selectedChoice.current -= 1;
          } else {
            const newRepeat = !repeatRef.current;
            repeatRef.current = newRepeat;
            selectedChoice.current = null;
            setRepeaterColor(newRepeat ? "#008000" : "#fff");
            setTriggerAppear(false);
            moveForward();
          }
        } else {
          setTriggerAppear(false);
          moveForward();
        }
      }
    }
  };

  const formatTime = (millis) => {
    const minutes = Math.floor(millis / 1000 / 60);
    const seconds = Math.floor((millis / 1000) % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  const handleRepeater = () => {
    if (!selectedChoice.current) {
      const newRepeat = !repeatRef.current;
      repeatRef.current = newRepeat;
      setRepeaterColor(newRepeat ? "#008000" : "#fff");
      Animated.timing(panelAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
      setIsBlurred(true);
    } else {
      const newRepeat = !repeatRef.current;
      repeatRef.current = newRepeat;
      setRepeaterColor(newRepeat ? "#008000" : "#fff");
      selectedChoice.current = null;
    }
  };
  const handleChoiceSelect = (choice) => {
    setIsBlurred(false);
    selectedChoice.current = choice;
    setRerender(!rerender);
  };
  const closePanel = () => {
    setIsBlurred(false);
    const newRepeat = !repeatRef.current;
    repeatRef.current = newRepeat;
    selectedChoice.current = null;
    setRepeaterColor(newRepeat ? "#008000" : "#fff");
  };
  const handleLikePress = async () => {
    const storedTracks = await getData("likedTracks");
    let updatedTracks = [];

    if (storedTracks) {
      if (storedTracks.includes(currentTrack)) {
        updatedTracks = storedTracks.filter((track) => track !== currentTrack);
        setLiked(false);
      } else {
        updatedTracks = [...storedTracks, currentTrack];
        setLiked(true);
      }
    } else {
      updatedTracks = [currentTrack];
      setLiked(true);
    }
    await storeData("likedTracks", updatedTracks);
  };

  const clearTracksAndMove = async (elemet) => {
    setPosition(0);
    // await soundRef.current.stopAsync();
    await soundRef.current.unloadAsync();
    soundRef.current = null;
    setCurrentTrack(elemet);
  };
  const moveForward = () => {
    if (trackListConverted.length > 1 && soundRef.current) {
      const currentIndex = trackListConverted.indexOf(currentTrack);
      if (currentIndex !== -1) {
        const nextIndex = (currentIndex + 1) % trackListConverted.length;
        const nextElement = trackListConverted[nextIndex];
        clearTracksAndMove(nextElement);
      }
    }
  };

  const moveBackward = () => {
    if (trackListConverted.length > 1 && soundRef.current) {
      const currentIndex = trackListConverted.indexOf(currentTrack);
      if (currentIndex !== -1) {
        const prevIndex =
          (currentIndex - 1 + trackListConverted.length) %
          trackListConverted.length;
        const prevElement = trackListConverted[prevIndex];
        clearTracksAndMove(prevElement);
      }
    }
  };
  //!!!!ALARM CODE!!!!
  const handleAlarmChoiceSelect = (choice) => {
    setIsBlurred(false);
    selectedAlarmChoice.current = choice;
    setRerender(!rerender);
  };
  const handleAlarm = () => {
    if (!selectedAlarmChoice.current) {
      const newAlarm = !AlarmRef.current;
      AlarmRef.current = newAlarm;
      setAlarmColor(newAlarm ? "#008000" : "#fff");
      Animated.timing(panelAlarmAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
      setIsBlurred(true);
    } else {
      const newAlarm = !AlarmRef.current;
      AlarmRef.current = newAlarm;
      setAlarmColor(newAlarm ? "#008000" : "#fff");
      selectedAlarmChoice.current = null;
    }
  };
  const closeAlarmPanel = () => {
    setIsBlurred(false);
    const newAlarm = !AlarmRef.current;
    AlarmRef.current = newAlarm;
    setAlarmColor(newAlarm ? "#008000" : "#fff");
    selectedAlarmChoice.current = null;
  };
  //!!!!ALARM CODE!!!!
  return (
    <View style={styles.container}>
      <Image
        source={backgroundImage}
        style={styles.backgroundImage}
        blurRadius={10}
      />
      <View style={styles.overlay} />
      <SafeAreaView style={styles.content}>
        <PanGestureHandler onHandlerStateChange={handleGesture}>
          <View style={styles.artworkContainer}>
            <Swiper />

            <Image source={backgroundImage} style={styles.artwork} />
          </View>
        </PanGestureHandler>
        <View style={styles.heartTextContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.trackName}>{currentTrack}</Text>
            <Text style={styles.albumTitle}>{album}</Text>
          </View>
          <TouchableOpacity onPress={handleLikePress}>
            <Icon
              name={liked ? "heart" : "heart-outline"}
              size={24}
              color="#FFFFFF"
            />
          </TouchableOpacity>
          {isSharable && <ShareComponent filePath={currentTrack} />}
        </View>
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            minimumTrackTintColor="#fff"
            thumbTintColor="#fff"
            maximumValue={duration}
            value={position}
            onSlidingComplete={async (value) => {
              setPosition(value);
              if (soundRef.current !== null) {
                await soundRef.current.setPositionAsync(value);
              }
            }}
          />
          {/*
          <View style={styles.timeContainer}>
            <Text style={styles.time}>{formatTime(position)}</Text>
            <Text style={styles.time}>{formatTime(duration)}</Text>
          </View>
          */}
        </View>
        <View style={styles.controlsContainer}>
          <TouchableOpacity onPress={moveBackward}>
            <Icon name="play-back" size={40} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={playSound}>
            <Icon name={isPlaying ? "pause" : "play"} size={40} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={moveForward}>
            <Icon name="play-forward" size={40} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.volumeContainer}>
          <Icon name="volume-low" size={24} color="#FFFFFF" />
          <Slider
            style={styles.VolumeSlider}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#fff"
            thumbTintColor="#fff"
            value={volume}
            onSlidingComplete={async (value) => {
              setVolume(value);
              if (soundRef.current !== null) {
                await soundRef.current.setVolumeAsync(value);
              }
            }}
          />

          <Icon name="volume-high" size={24} color="#FFFFFF" />
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={handleAlarm}>
            <Icon name="bed" size={40} color={AlarmColor} />
          </TouchableOpacity>
          <Download filePath={currentTrack} handleFinished={handleSharable} />
          <TouchableOpacity onPress={handleRepeater}>
            <Icon name="repeat" size={40} color={repeaterColor} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {repeatRef.current && selectedChoice.current === null && (
        <Animated.View style={[styles.panelContainer, { opacity: panelAnim }]}>
          <Panel onChoiceSelect={handleChoiceSelect} onClose={closePanel} />
        </Animated.View>
      )}
      {AlarmRef.current && selectedAlarmChoice.current === null && (
        <Animated.View
          style={[styles.panelContainer, { opacity: panelAlarmAnim }]}
        >
          <PanelAlarm
            onChoiceSelect={handleAlarmChoiceSelect}
            onClose={closeAlarmPanel}
            optionList={trackListConverted}
          />
        </Animated.View>
      )}
      {isBlurred && (
        <BlurView style={styles.absolute} blurType="light" intensity={50} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  bottomContainer: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "7%",
  },
  heartTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  volumeContainer: {
    width: "80%",
    marginTop: "3%",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  artworkContainer: {
    width: "100%",
    maxHeight: "40%",
    marginBottom: "13%",
  },
  artwork: {
    width: "100%",
    height: "100%",
    borderRadius: 17,
  },
  infoContainer: {
    marginBottom: 20,
  },
  trackName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  albumTitle: {
    color: "#fff",
    fontSize: 14,
  },
  sliderContainer: {
    width: "80%",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  VolumeSlider: {
    width: "80%",
    height: 40,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  time: {
    color: "#fff",
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginTop: 20,
  },

  panelContainer: {
    position: "absolute",
    bottom: 0, // Position the panel at the bottom
    left: 0,
    right: 0,
    height: "50%", // Adjust this value as needed
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    zIndex: 10, // Ensures the Panel component is on top
  },
});

export default Player;
