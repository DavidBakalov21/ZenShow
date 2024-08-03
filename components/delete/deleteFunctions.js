import * as FileSystem from "expo-file-system";
async function listZenFiles() {
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

const deleteFileByName = async (fileName) => {
  try {
    const directoryUri = FileSystem.documentDirectory + "Zen/";
    const fileUri = directoryUri + fileName;

    // Check if the directory exists
    const dirInfo = await FileSystem.getInfoAsync(directoryUri);
    if (!dirInfo.exists) {
      console.log("Zen directory does not exist.");
      return;
    }

    // Check if the file exists
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (!fileInfo.exists) {
      console.log(`File "${fileName}" does not exist in the Zen directory.`);
      return;
    }

    // Delete the specified file
    await FileSystem.deleteAsync(fileUri);

    console.log(`File "${fileName}" has been deleted from the Zen directory.`);
  } catch (error) {
    console.error(`Error deleting file "${fileName}":`, error);
    throw error;
  }
};
export { deleteFileByName, listZenFiles };
