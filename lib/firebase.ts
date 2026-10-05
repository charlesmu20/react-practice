import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCBThR9OtkRkV4JA1xhZDto_RlEOQoSY4U",
  authDomain: "react-practice-32597.firebaseapp.com",
  projectId: "react-practice-32597",
  storageBucket: "react-practice-32597.firebasestorage.app",
  messagingSenderId: "1087553066075",
  appId: "1:1087553066075:web:973a91dd971594caa71b7e"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);