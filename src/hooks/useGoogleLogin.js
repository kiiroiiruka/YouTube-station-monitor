import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { auth, googleProvider } from "../firebase/firebase";
import { syncUserProfile } from "../firebase/users";

//無視するエラー
const IGNORE = ["auth/popup-closed-by-user", "auth/cancelled-popup-request"];
//エラーメッセージ
const MESSAGES = {
	"auth/popup-blocked": "ポップアップがブロックされています。ブラウザの設定を確認してください。",
	"auth/network-request-failed": "通信エラーです。もう一度お試しください。",
	"auth/too-many-requests": "試行回数が多すぎます。しばらく待ってからお試しください。",
};

const toErrorMessage = (code) =>
	MESSAGES[code] ?? "ログインに失敗しました。もう一度お試しください。";

export const useGoogleLogin = () => {
	const [user, setUser] = useState(null);//ログインユーザー情報
	const [initializing, setInitializing] = useState(true);
	const [signingIn, setSigningIn] = useState(false);
	const [error, setError] = useState(null);
	//ポップアップ閉じたら強制終了させる
	const signingInRef = useRef(false);

	//ログイン完了後にフラグを解除
	const finishSigningIn = () => {
		signingInRef.current = false;
		setSigningIn(false);
	};

	useEffect(() => {
		//ユーザー情報を取得、ログイン状態が変化したらその情報もその都度セットさせる。
		const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
			setUser(nextUser);
			setInitializing(false);

			if (nextUser) {
				finishSigningIn();//ログイン中状態の解除

				//ユーザー情報をFirestoreに保存
				syncUserProfile(nextUser).catch((err) => {
					console.error("[Firestore]", err);
				});
			}
		});
		return unsubscribe;//アンマウント実行
	}, []);

	// ポップアップを閉じたとき、Promise が返る前にメイン画面にフォーカスが戻ることがある
	useEffect(() => {
		if (!signingIn) return;

		const resetIfPopupClosed = () => {
			//200ms後にポップアップ閉じたら強制処理中断
			window.setTimeout(() => {
				if (signingInRef.current && !auth.currentUser) {
					finishSigningIn();
				}
			}, 200);
		};
		//ポップアップ閉じたら強制処理中断
		window.addEventListener("focus", resetIfPopupClosed);
		document.addEventListener("visibilitychange", resetIfPopupClosed);
		return () => {
			//ポップアップ閉じたら強制処理中断
			window.removeEventListener("focus", resetIfPopupClosed);
			document.removeEventListener("visibilitychange", resetIfPopupClosed);
		};
	}, [signingIn]);

	const signIn = async () => {
		setError(null);
		signingInRef.current = true;
		setSigningIn(true);

		try {
			await signInWithPopup(auth, googleProvider);
		} catch (err) {
			const code = err.code ?? "";
			if (IGNORE.includes(code)) return;

			console.error("[Google Login]", code, err.message);
			setError(toErrorMessage(code));
		} finally {
			finishSigningIn();
		}
	};
	//ユーザー情報、読み込み中...の表示フラグ、ログイン中の状態、エラー情報、ログイン処理を返す
	return { user, initializing, signingIn, error, signIn };
};
