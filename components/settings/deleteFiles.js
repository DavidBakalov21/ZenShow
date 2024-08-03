import * as FileSystem from "expo-file-system";
/*async function listZenFiles() {
  try {
    const directoryUri = FileSystem.documentDirectory + "Zen/";

    // Check if the directory exists
    const dirInfo = await FileSystem.getInfoAsync(directoryUri);
    if (!dirInfo.exists) {
      console.log("Zen directory does not exist.");
      return [];
    }

    // Read the directory contents
    const files = await FileSystem.readDirectoryAsync(directoryUri);

    console.log("Files in Zen directory:", files);
    return files;
  } catch (error) {
    console.error("Error listing Zen files:", error);
    throw error;
  }
}
*/
const clearTracks = async () => {
  try {
    const directoryUri = FileSystem.documentDirectory + "Zen/";

    // Check if the directory exists
    const dirInfo = await FileSystem.getInfoAsync(directoryUri);
    if (!dirInfo.exists) {
      console.log("Zen directory does not exist.");
      return;
    }

    // Read the directory contents
    const files = await FileSystem.readDirectoryAsync(directoryUri);
    if (files.length === 0) {
      console.log("Zen directory is already empty.");
      return;
    }

    // Filter only .mp3 files
    const mp3Files = files.filter((file) => file.endsWith(".mp3"));
    if (mp3Files.length === 0) {
      console.log("No .mp3 files found in the Zen directory.");
      return;
    }

    // Delete each .mp3 file in the directory
    await Promise.all(
      mp3Files.map((file) => FileSystem.deleteAsync(directoryUri + file))
    );

    console.log("All .mp3 files in the Zen directory have been deleted.");
  } catch (error) {
    console.error("Error cleaning Zen directory:", error);
    throw error;
  }
};
export default clearTracks;
