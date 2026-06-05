import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { useGoogleLogin } from "./hooks/useGoogleLogin";
import About from "./pages/about";
import Contact from "./pages/contact";
import Upload from "./pages/upload";

function App() {
	const { user, initializing, signingIn, error, signIn } = useGoogleLogin();

	if (initializing) {
		return (
			<div className="app-shell flex min-h-screen items-center justify-center">
				<p className="loading-text">読み込み中...</p>
			</div>
		);
	}

	if (!user) {
		return (
			<div className="app-shell flex min-h-screen items-center justify-center p-6">
				<div className="auth-card flex flex-col items-center gap-5">
					<div>
						<p className="text-center text-xs font-semibold tracking-[0.2em] text-accent uppercase">
							Station Monitor
						</p>
						<h1 className="auth-title mt-1">Googleサインイン</h1>
					</div>
					<button
						type="button"
						onClick={signIn}
						disabled={signingIn}
						className="btn-primary w-full"
					>
						{signingIn ? "ログイン中..." : "Google でログイン"}
					</button>
					{error && <p className="error-text text-center">{error}</p>}
				</div>
			</div>
		);
	}

	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Navigate to="upload" replace />} />
				<Route path="upload" element={<Upload />} />
				<Route path="about" element={<About />} />
				<Route path="contact" element={<Contact />} />
			</Route>
		</Routes>
	);
}

export default App;
