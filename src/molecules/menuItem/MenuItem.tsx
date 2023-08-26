"use client";

import MenuItemProps from "./interface/menuItemProps.interface";

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => (
	<div onClick={onClick} className="px-4 py-3 hover:bg-neutral-100 transition font-semibold">
		{label}
	</div>
);

export default MenuItem;
