import Container from "@atoms/container/Container";
import ClientProcessor from "@atoms/clientProcessor/ClientProcessor";
import ListingCard from "@atoms/listings/ListingCard";
import EmptyState from "@atoms/emptyState/EmptyState";

import getListings from "./serverActions/getListings";
import { IListingsParams } from "./serverActions/interfaces/listingsParams.interface";
import getCurrentUser from "./serverActions/getCurrentUser";

interface HomeProps {
	searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {

	const currentUser = await getCurrentUser();

	// create searchParamsData object with currentUser's id
	const searchParamsData: IListingsParams = {
		userId: currentUser?.id, // if currentUser is null or undefined, searchParamsData.userId will be undefined
		...searchParams
	}

	const listings = await getListings(searchParamsData);

	if (listings.length === 0) {
		return (
			<ClientProcessor>
				<EmptyState showReset />
			</ClientProcessor>
		);
	}

	return (
		<ClientProcessor>
			<Container>
				<div
					className="
						pt-24
						grid
						grid-cols-1
						sm:grid-cols-2
						md:grid-cols-3
						lg:grid-cols-4
						xl:grid-cols-5
						2xl:grid-cols-6
						gap-8
					">
					{listings.map((listing: any) => (
						<ListingCard currentUser={currentUser} key={listing.id} data={listing} />
					))}
				</div>
			</Container>
		</ClientProcessor>
	);
};

export default Home;
