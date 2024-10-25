import { SafeUser } from "@molecules/types";
import { User } from "@prisma/client";

export interface NavbarProps {
	currentUser?: SafeUser | null;
}
