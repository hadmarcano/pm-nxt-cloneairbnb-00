import EmptyState from "@atoms/emptyState/EmptyState";
import ClientProcessor from "@atoms/clientProcessor/ClientProcessor";
import TripsClient from "./TripsClient";

import getCurrentUser from "@molecules/serverActions/getCurrentUser";
import getReservations from "@molecules/serverActions/getReservations";

const TripsPage = async () => {

	const currentUser = await getCurrentUser();

	if(!currentUser){
		return (
			<ClientProcessor>
				<EmptyState
					title="No authorizado"
					subtitle="Por favor inicia sesión"
				/>
			</ClientProcessor>
		)
	}

	const reservations = await getReservations({userId: currentUser.id});

	if(reservations.length === 0){
		return (
			<ClientProcessor>
				<EmptyState
					title="No tienes reservaciones"
					subtitle="Reserva un viaje para comenzar"
				/>
			</ClientProcessor>
		)
	}

	return (
		<ClientProcessor>
			<TripsClient
				reservations={reservations}
				currentUser={currentUser}
			/>
		</ClientProcessor>
	)


}

export default TripsPage;
