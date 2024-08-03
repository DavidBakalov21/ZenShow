import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import downloadFile from "../player/download";
import * as FileSystem from "expo-file-system";
const Download = ({ filePath, handleFinished }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloaded, setisDownloaded] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const checkFile = async () => {
      const directoryUri = FileSystem.documentDirectory + "Zen/";
      const fileUri = directoryUri + filePath + ".mp3";
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      // Check if the directory exists, if not create it
      if (fileInfo.exists) {
        setisDownloaded(true);
        handleFinished(true);
      } else {
        setisDownloaded(false);
        handleFinished(false);
      }
    };
    checkFile();
  }, [isDownloaded, filePath]);
  const downloadFunc = async () => {
    setIsLoading(true);
    try {
      await downloadFile(filePath, setProgress);
      setisDownloaded(true);
      setIsLoading(false);
      handleFinished(true);
    } catch (error) {
      setIsLoading(false);
      //  console.error("Failed to download file:", error);
      Alert.alert("Error: maybe it's your internet");
    }
  };

  return (
    <TouchableOpacity
      onPress={downloadFunc}
      disabled={isLoading || isDownloaded}
    >
      <View>
        {isLoading ? (
          <View style={styles.container}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={{ color: "#fff" }}>{progress}</Text>
          </View>
        ) : (
          <Icon
            name={isDownloaded ? "checkmark" : "download"}
            size={40}
            color={isDownloaded ? "#008000" : "#fff"}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Download;
