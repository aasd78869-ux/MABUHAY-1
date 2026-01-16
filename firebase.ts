
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCUJqmcfbBDUGBOCaS3amKTVrsofm60XBg",
  authDomain: "mabuhay-858ef.firebaseapp.com",
  projectId: "mabuhay-858ef",
  storageBucket: "mabuhay-858ef.firebasestorage.app",
  messagingSenderId: "218137795092",
  appId: "1:218137795092:web:38c86b4a499974e108a501",
  measurementId: "G-4PDKQY9GB1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
