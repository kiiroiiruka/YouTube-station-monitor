import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase/firebase";
import { syncUserProfile } from "../firebase/users";

const IGNORE = ["auth/popup-closed-by-user", "auth/cancelled-popup-request"];

const MESSAGES = {
	"auth/popup-blocked": "ポップアップがブロックされています。ブラウザの設定を確認してください。",
	"auth/network-request-failed": "通信エラーです。もう一度お試しください。",
	"auth/too-many-requests": "試行回数が多すぎます。しばらく待ってからお試しください。",
};

const toErrorMessage = (code) =>
	MESSAGES[code] ?? "ログインに失敗しました。もう一度お試しください。";

export const useGoogleLogin = () => {
	const [user, setUser] = useState(null);
	const [initializing, setInitializing] = useState(true);
	const [signingIn, setSigningIn] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
			setUser(nextUser);
			setInitializing(false);

			if (nextUser) {
				syncUserProfile(nextUser).catch((err) => {
					console.error("[Firestore]", err);
				});
			}
		});
		return unsubscribe;
	}, []);

	const signIn = async () => {
		setError(null);
		setSigningIn(true);

		try {
			await signInWithPopup(auth, googleProvider);
		} catch (err) {
			const code = err.code ?? "";
			if (IGNORE.includes(code)) return;

			console.error("[Google Login]", code, err.message);
			setError(toErrorMessage(code));
		} finally {
			setSigningIn(false);
		}
	};

	return { user, initializing, signingIn, error, signIn };
};
