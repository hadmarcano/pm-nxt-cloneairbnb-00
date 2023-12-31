"use client";
import React from "react";
import { CategoryBoxProps } from "./interfaces/categoryBox.interface";

const CategoryBox: React.FC<CategoryBoxProps> = ({
	icon: Icon,
	label,
	selected
}) => {
	return <div
	className={`
		flex
		flex-col
		items-center
		justify-center
		gap-2
		p-3
		border-b-2
		hover:text-neutral-800
		transition
		cursor-pointer
		${selected ? "border-b-neutral-800" : "border-transparent"}
		${selected ? "text-neutral-800" : "border-neutral-500"}
	`}
		// onClick={()=>{}}

	>
		<Icon size={26}/>
		<div className="font-medium text-sm">{label}</div>
	</div>;
};

export default CategoryBox;
