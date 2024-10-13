import EmptyState from "@atoms/emptyState/EmptyState";
import ClientProcessor from "@atoms/clientProcessor/ClientProcessor";
import PropertiesClient from "./PropertiesClient";

import getListings from "@molecules/serverActions/getListings";
import getCurrentUser from "@molecules/serverActions/getCurrentUser";

const PropertiesPage = async () => {
	const currentUser = await getCurrentUser();

	if(!currentUser){
		return (
			<ClientProcessor>
				<EmptyState
					title="No has iniciado sesion."
					subtitle="Inicia sesion para ver tus propiedades."
				/>
			</ClientProcessor>
		)
	}

	const listings = await getListings({userId: currentUser.id});

	if(listings.length === 0){
		return (
			<ClientProcessor>
				<EmptyState
					title="No tienes propiedades."
					subtitle="Aun no has creado ninguna propiedad."
				/>
			</ClientProcessor>
		)
	}

	return (
		<ClientProcessor>
			<PropertiesClient
				listings={listings}
				currentUser={currentUser}
			/>
		</ClientProcessor>
	)
};

export default PropertiesPage;

