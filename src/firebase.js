// Import necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAO1qM9MlFUDWuPK_RKMqI6Fsnl8da0QQU",
  authDomain: "passbot-passwordmanager.firebaseapp.com",
  databaseURL: "https://passbot-passwordmanager-default-rtdb.firebaseio.com",
  projectId: "passbot-passwordmanager",
  storageBucket: "passbot-passwordmanager.firebasestorage.app",
  messagingSenderId: "789059430327",
  appId: "1:789059430327:web:5b4b0963616211e1f3aa32"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore and export
const db = getFirestore(app);

export default db;
