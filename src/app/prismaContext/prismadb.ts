import { PrismaClient } from "@prisma/client";
// PrismaClient: Esto nos permite aperturar una definición generada
// de manera segura para un ambiente.

declare global {
	var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
	globalThis.prisma = client;
}

export default client;
