import prisma from "@/app/prismaContext/prismadb"
import { IGetListingsParams } from "./interfaces/getListingParams.interface";

export default async function getListings(params: IGetListingsParams) {

	try {
		const {
			userId,
			roomCount,
			guestCount,
			bathroomCount,
			locationValue,
			startDate,
			endDate,
			category } = params;

			let query: any = {};

			if (userId) {
				query.userId = userId;
			}

			if (category) {
				query.category = category;
			}

			if (roomCount) {
				query.roomCount = {
					gte: +roomCount,
				}
			}

			if (guestCount) {
				query.guestCount = {
					gte: +guestCount,
				}
			}

			if (bathroomCount) {
				query.bathroomCount = {
					gte: +bathroomCount,
				}
			}

			if (locationValue) {
				query.locationValue = locationValue;
			}

			if (startDate && endDate) {
				// clasures for startDate & endDate
				query.NOT = {
					reservations: {
						some: {
							OR: [
								{
									endDate: { gte: startDate },
									startDate: { lte: startDate }
								},
								{
									startDate: { lte: endDate },
									endDate: { gte: endDate }
								}
							]
						}
					}
				}
			}

			// console.log("query-listings",query);

			const listings = await prisma.listing.findMany({
				where: query,
				orderBy: {
					createdAt: "desc"
				}
			});

			// console.log("listings",listings);
			const safeListings = listings.map(listing => ({
				...listing,
				createdAt: listing.createdAt.toISOString()
			}))

			// console.log("safeListings",safeListings);
			return safeListings;
	} catch (error: any) {
		throw new Error(error);
	}

}

