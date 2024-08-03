import * as FileSystem from "expo-file-system";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import app from "../other/firebaseConfig";
async function downloadFile(fileName, setProgres) {
  try {
    console.log(1);
    const storage = getStorage(app);
    const fileRef = ref(storage, `${fileName}.mp3`);
    const url = await getDownloadURL(fileRef);
    console.log(2);
    const directoryUri = FileSystem.documentDirectory + "Zen/";
    const tempFileUri = directoryUri + fileName + ".mp3.tmp";
    const fileUri = directoryUri + fileName + ".mp3";

    // Check if the directory exists, if not create it
    const dirInfo = await FileSystem.getInfoAsync(directoryUri);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(directoryUri, {
        intermediates: true,
      });
      console.log("Directory created at:", directoryUri);
    }
    console.log(3);
    // Always delete any existing temporary file to enforce a fresh download
    const tempFileInfo = await FileSystem.getInfoAsync(tempFileUri);
    if (tempFileInfo.exists) {
      await FileSystem.deleteAsync(tempFileUri);
      console.log("Deleted existing temporary file:", tempFileUri);
    }
    console.log(4);
    // Check if the final file already exists
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (fileInfo.exists) {
      console.log("File already exists at:", fileUri);
      return fileUri;
    }
    console.log(5);
    // Create and download to the temporary file
    const downloadResumable = FileSystem.createDownloadResumable(
      url,
      tempFileUri,
      {},
      (downloadProgress) => {
        const progress =
          downloadProgress.totalBytesWritten /
          downloadProgress.totalBytesExpectedToWrite;
        // console.log(`Download progress: ${(progress * 100).toFixed(2)}%`);
        const result = `${(progress * 100).toFixed(0)}%`;
        setProgres(result);
      }
    );
    console.log(6);
    const { uri } = await downloadResumable.downloadAsync();
    console.log(7);
    // Rename the temporary file to the final file name
    await FileSystem.moveAsync({
      from: uri,
      to: fileUri,
    });

    console.log("File downloaded successfully to:", fileUri);
    return fileUri;
  } catch (error) {
    console.error("Error downloading file:", error);

    // Ensure the temporary file is deleted in case of error
    const tempFileInfo = await FileSystem.getInfoAsync(tempFileUri);
    if (tempFileInfo.exists) {
      await FileSystem.deleteAsync(tempFileUri);
      console.log(
        "Deleted partially downloaded file after error:",
        tempFileUri
      );
    }

    throw error;
  }
}

export default downloadFile;
