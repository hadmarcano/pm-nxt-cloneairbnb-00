import bcrypt from "bcryptjs";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/app/prismaContext/prismadb";

export const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "email", type: "text" },
				password: { label: "password", type: "password" },
			},
			// auth managers
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error("Credenciales inválidas");
				}

				const user = await prisma.user.findUnique({
					where: { email: credentials.email },
				});

				if (!user || !user?.hashedPassword) {
					throw new Error("Credenciales inválidas");
				}

				const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword);

				if (!isCorrectPassword) {
					throw new Error("Credenciales inválidas");
				}

				return user;
			},
		}),
	],
	// Context of route from will be trigger the signIn function...
	pages: {
		signIn: "/",
	},
	// Add process inspect for development
	debug: process.env.NODE_ENV === "development",
	// Add how to session management
	session:{
		strategy:"jwt", // default value
	},
	// Add Seed that validates and signs the token generated...
	secret:	process.env.NEXT_AUTH_SECRET
};

export default NextAuth(authOptions);
