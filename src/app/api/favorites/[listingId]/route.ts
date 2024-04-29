import { NextResponse } from "next/server";
import getCurrentUser from "@molecules/serverActions/getCurrentUser";
import prisma from "@/app/prismaContext/prismadb";

interface IParams {
	listingId?: string;
}

/**
 * This TypeScript function handles a POST request to add a listing ID to a user's favorites list after
 * verifying the current user.
 * @param {Request} request - The `request` parameter represents the incoming request to your API
 * endpoint. It contains information such as headers, body, method, and other details of the HTTP
 * request made to your server.
 * @param  - The code snippet you provided is an asynchronous function that handles a POST request. It
 * first retrieves the current user, checks if the user exists, and then updates the user's favoriteIds
 * with a new listingId. Finally, it returns the updated user object in JSON format.
 * @returns The code is returning a JSON response containing the updated user object after adding a new
 * favorite listing ID to the user's favoriteIds array.
 */
export async function POST(
	request: Request,
	{ params }: { params: IParams }
){
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const { listingId } = params;

	if (!listingId || typeof listingId !== "string") {
		throw new Error("Invalid ID");
	}

	let favoriteIds = [...(currentUser.favoriteIds || [])];

	favoriteIds.push(listingId);

	const user = await prisma.user.update({
		where: {
			id: currentUser.id,
		},
		data: {
			favoriteIds,
		}
	});

	return NextResponse.json(user);
}

/**
 * This TypeScript function handles a DELETE request to remove a listing ID from a user's favorite list
 * in a database.
 * @param {Request} request - The `request` parameter is an object that represents the incoming HTTP
 * request. It contains information such as the request method, headers, body, and URL. In this
 * context, it is used to handle a DELETE request to remove a listing from a user's favorites.
 * @param  - The DELETE function you provided is an asynchronous function that handles deleting a
 * listing ID from a user's favorite list. Here's a breakdown of the parameters used in the function:
 * @returns The code is returning a JSON response containing the updated user object after removing the
 * specified listing ID from the user's favorite IDs.
 */
export async function DELETE(
	request: Request,
	{ params }: { params: IParams }
){
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const { listingId } = params;

	if (!listingId || typeof listingId !== "string") {
		throw new Error("Invalid ID");
	}

	let favoriteIds = [...(currentUser.favoriteIds || [])];

	favoriteIds = favoriteIds.filter((id) => id !== listingId);

	const user = await prisma.user.update({
		where: {
			id: currentUser.id,
		},
		data: {
			favoriteIds,
		}
	});

	return NextResponse.json(user);
}
