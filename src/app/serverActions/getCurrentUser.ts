import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/prismaContext/prismadb";

export async function getSession() {
	const session = await getServerSession(authOptions);
	return session;
}

export default async function getCurrentUser() {
	try {
		const session = await getSession();

		if (!session?.user?.email) {
			return null;
		}

		const currentUser = await prisma.user.findUnique({
			where: { email: session.user.email as string },
		});

		return currentUser;
	} catch (error) {
		return null;
	}
}
