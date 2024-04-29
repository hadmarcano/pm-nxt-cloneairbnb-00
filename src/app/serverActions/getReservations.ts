import prisma from "@/app/prismaContext/prismadb";


interface IParams {
	listingId?: string;
	userId?: string;
	authorId?: string;
}

export default async function getReservations(
	params: IParams
){
	try {
		const {listingId, userId, authorId} = params;

		const query: any = {}; // any a revisar...

		if(listingId){
			query.listingId = listingId;
		}

		if(userId){
			query.userId = userId;
		}

		if(authorId){
			query.authorId = authorId;
		}

		const reservations = await prisma.reservation.findMany({
			where: query,
			include:{
				listing: true
			},
			orderBy:{
				startDate: "desc"
			}
		});

		const safeReservation = reservations.map((reservation) => (
			{
				...reservation,
				createdAt: reservation.createdAt.toISOString(),
				startDate: reservation.startDate.toISOString(),
				endDate: reservation.endDate.toISOString(),
				listing:{
					...reservation.listing,
					createdAt: reservation.listing.createdAt.toISOString(),
				}
			}
		));

		return safeReservation;


	} catch (error: any) {
		throw new Error(error);
	}
};
