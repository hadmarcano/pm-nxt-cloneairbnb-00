"use client";

import Heading from "@atoms/heading/Heading";
import Container from "@atoms/container/Container";
import ListingCard from "@atoms/listings/ListingCard";

import { SafeListing, SafeUser } from "@molecules/types";

interface FavoritesClientPros {
	listings: SafeListing[];
	currentUser: SafeUser | null;
}

const FavoritesClient: React.FC<FavoritesClientPros> = ({ listings, currentUser }) => {
	return (
		<Container>
			<Heading title="Favoritos" subtitle="Lista de tus lugares favoritos!" />
			<div
				className="
					mt-10
					grid
					grid-cols-1
					sm:grid-clos-2
					md:grid-cols-3
					lg:grid-cols-4
					xl:grid-cols-5
					2xl:grid-cols-6
					gap-8
				"
			>
				{listings.map((listing: any) => (
					<ListingCard currentUser={currentUser} key={listing.id} data={listing} />
				))}
			</div>
		</Container>
	);
};

export default FavoritesClient;
