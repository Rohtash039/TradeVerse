// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";  
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyB_89ZQCa28ReZe2S_5yiB8sC8pKZ5umjE",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "trading-app-7ebb7.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "trading-app-7ebb7",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "trading-app-7ebb7.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "54575011933",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:54575011933:web:e8f9c2e6e43e1de9e815b4",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-4X68NLD5MB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);