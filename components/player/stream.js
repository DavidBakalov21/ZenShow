import app from "../other/firebaseConfig";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import NetInfo from "@react-native-community/netinfo";
const storage = getStorage(app);
async function getMp3Url(fileName) {
  try {
    const state = await NetInfo.fetch();
    if (!state.isConnected) {
      console.error("No internet connection");
      return null;
    }
    const fileRef = ref(storage, `${fileName}.mp3`);
    console.log(fileName);
    const url = await getDownloadURL(fileRef);
    return url;
  } catch (error) {
    console.error("Error getting download URL: ", error);
    return null;
  }
}
export default getMp3Url;
