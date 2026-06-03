import { Navigate, Route, Routes } from "react-router-dom";
import { useGoogleLogin } from "./hooks/useGoogleLogin";
import Upload from "./pages/upload";

function App() {
	const { user, initializing, signingIn, error, signIn } = useGoogleLogin();

	if (initializing) {
		return (
			<div className="flex min-h-screen items-center justify-center text-sm text-gray-500">
				読み込み中...
			</div>
		);
	}

	if (!user) {
		return (
			<div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6">
				<h1 className="text-xl font-semibold">Station Monitor</h1>
				<button
					type="button"
					onClick={signIn}
					disabled={signingIn}
					className="rounded bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-800 disabled:opacity-50"
				>
					{signingIn ? "ログイン中..." : "Google でログイン"}
				</button>
				{error && (
					<p className="max-w-md text-center text-sm text-red-600">{error}</p>
				)}
			</div>
		);
	}

	return (
		<Routes>
			<Route path="/" element={<Navigate to="/upload" replace />} />
			<Route path="/upload" element={<Upload />} />
		</Routes>
	);
}

export default App;
