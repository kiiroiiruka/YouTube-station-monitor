import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export const syncUserProfile = async (user) => {
	const userDoc = {
		id: user.uid,
		displayName: user.displayName ?? "",
		email: user.email ?? "",
		photoURL: user.photoURL ?? "",
		updatedAt: serverTimestamp(),
	};

	await setDoc(doc(db, "users", user.uid), userDoc, { merge: true });
};
