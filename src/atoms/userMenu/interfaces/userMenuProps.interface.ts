import { SafeUser } from "@molecules/types";
import { User } from "@prisma/client";


export interface UserMenuProps {
	currentUser?: SafeUser | null;
}
