import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyB9GTZP4rw_PYQYZS9JgbrOzGyH-YQg6Lk",
  authDomain: "zen-sounds-76129.firebaseapp.com",
  projectId: "zen-sounds-76129",
  storageBucket: "zen-sounds-76129.appspot.com",
  messagingSenderId: "219667697451",
  appId: "1:219667697451:web:44efa6b6bfc825ddcaff6e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export default app;
