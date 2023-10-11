"use client";

import Image from "next/image";
import { AvatarProps } from "./interfaces/avatarProps.interface";

const Avatar: React.FC<AvatarProps> = ({src}) => (
	<Image className="rounded-full " src={src || "/images/user-avatar-icon.png"} width="30" height="30" alt="avatar" />
);

export default Avatar;
