import { useState } from "react";
import { NavLink } from "react-router-dom";

export const NAV_ITEMS = [
	{ id: 1, name: "Upload", path: "/upload" },
	{ id: 2, name: "About", path: "/about" },
	{ id: 3, name: "Contact", path: "/contact" },
];

const ItemsList = ({ items, onSelect }) => (
	<ul className="flex flex-col gap-1 p-4">
		{items.map((item) => (
			<li key={item.id}>
				<NavLink
					to={item.path}
					onClick={onSelect}
					className={({ isActive }) =>
						isActive ? "sidebar-nav-link sidebar-nav-link-active" : "sidebar-nav-link"
					}
				>
					{item.name}
				</NavLink>
			</li>
		))}
	</ul>
);

const Sidebar = ({ items = NAV_ITEMS }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			{isOpen && (
				<button
					type="button"
					aria-label="サイドバーを閉じる"
					onClick={() => setIsOpen(false)}
					className="fixed inset-0 z-30 bg-brand/40 backdrop-blur-sm"
				/>
			)}

			<aside
				className={`fixed top-0 left-0 z-40 flex h-full w-64 transition-transform duration-300 ease-out ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<div className="sidebar-panel">
					<div className="sidebar-header">
						<p className="sidebar-brand">Station Monitor</p>
						<p className="sidebar-title">Menu</p>
					</div>
					<ItemsList items={items} onSelect={() => setIsOpen(false)} />
				</div>

				{isOpen && (
					<button
						type="button"
						onClick={() => setIsOpen(false)}
						aria-label="サイドバーを閉じる"
						className="sidebar-handle absolute top-1/2 -right-8 -translate-y-1/2"
					>
						‹
					</button>
				)}
			</aside>

			{!isOpen && (
				<button
					type="button"
					onClick={() => setIsOpen(true)}
					aria-label="サイドバーを開く"
					className="sidebar-handle fixed top-1/2 left-0 z-50 -translate-y-1/2"
				>
					›
				</button>
			)}
		</>
	);
};

export default Sidebar;
