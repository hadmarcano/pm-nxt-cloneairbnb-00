import { IconType } from "react-icons/lib";

export default interface ButtonProps {
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
	label: string;
	disabled?: boolean;
	outline?: boolean;
	small?: boolean;
	icon?: IconType;
}
