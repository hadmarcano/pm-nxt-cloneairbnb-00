"use client";

import { SafeListing, SafeReservation, SafeUser } from "@molecules/types";

interface IListingClientProps{
	reservations?: SafeReservation[];
	listing?: SafeListing & {
		user: SafeUser;
	};
	currentUser?: SafeUser | null;
}

const ListingClient: React.FC<IListingClientProps> = ({ listing, reservations, currentUser }) => {

	return (
		<p>Hello Im Listing Client</p>
	)
};

export default ListingClient;
