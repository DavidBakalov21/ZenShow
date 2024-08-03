import * as FileSystem from "expo-file-system";
import { Share } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { TouchableOpacity, Alert } from "react-native";
const ShareComponent = ({ filePath }) => {
  async function shareFile() {
    try {
      const directoryUri = FileSystem.documentDirectory + "Zen/";
      const fileUri = directoryUri + filePath + ".mp3";

      // Ensure file exists before sharing
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (!fileInfo.exists) {
        Alert.alert(
          "File not found",
          "The file you are trying to share does not exist."
        );
        return;
      }

      await Share.share({
        url: fileUri,
        message: `Check out this track: ${filePath}`,
      });
    } catch (error) {
      console.error("Error sharing file:", error);
      Alert.alert("Error", "There was an error trying to share the file.");
    }
  }
  return (
    <TouchableOpacity onPress={shareFile}>
      <Icon name="share-outline" size={24} color="#FFFFFF" />
    </TouchableOpacity>
  );
};
export default ShareComponent;
