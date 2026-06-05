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
	//ユーザー情報をFirestoreに保存。ユーザーIDをキーにして保存。
	const userDocRef = doc(db, "users", user.uid);
	await setDoc(userDocRef, userDoc, { merge: true });
};
