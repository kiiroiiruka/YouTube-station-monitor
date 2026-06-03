import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
	apiKey: "AIzaSyArL0KjrFfbP48ERPsVZyEpnlriZsVrkX8",
	authDomain: "station-monitor-7f4f1.firebaseapp.com",
	projectId: "station-monitor-7f4f1",
	storageBucket: "station-monitor-7f4f1.firebasestorage.app",
	messagingSenderId: "220936903393",
	appId: "1:220936903393:web:4e39b143d6b2ecc56775a0",
	measurementId: "G-TVQBSGFDFT",
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();