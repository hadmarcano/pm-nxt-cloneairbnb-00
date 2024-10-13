import { NextResponse } from "next/server";

import getCurrentUser from "@molecules/serverActions/getCurrentUser";
import prisma from "@/app/prismaContext/prismadb";

interface IParams {
	reservationId?: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const { reservationId } = params;

	if (!reservationId || typeof reservationId !== "string") {
		throw new Error("Invalid ID");
	}

	const reservation = await prisma.reservation.deleteMany({
		where: {
			id: reservationId,
			OR: [{ userId: currentUser.id }, { listingId: currentUser.id }],
		},
	});


	return NextResponse.json(reservation);
}
