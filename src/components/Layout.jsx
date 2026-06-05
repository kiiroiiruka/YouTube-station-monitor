import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

const Layout = () => (
	<div className="app-shell relative min-h-screen w-full">
		<div className="relative z-0 min-h-screen w-full">
			<Outlet />
		</div>
		<Sidebar />
	</div>
);

export default Layout;
