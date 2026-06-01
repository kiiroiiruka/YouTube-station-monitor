// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArL0KjrFfbP48ERPsVZyEpnlriZsVrkX8",
  authDomain: "station-monitor-7f4f1.firebaseapp.com",
  projectId: "station-monitor-7f4f1",
  storageBucket: "station-monitor-7f4f1.firebasestorage.app",
  messagingSenderId: "220936903393",
  appId: "1:220936903393:web:4e39b143d6b2ecc56775a0",
  measurementId: "G-TVQBSGFDFT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);