import EmptyState from "@atoms/emptyState/EmptyState";
import ClientProcessor from "@atoms/clientProcessor/ClientProcessor";

import getReservations from "@molecules/serverActions/getReservations";
import getCurrentUser from "@molecules/serverActions/getCurrentUser";
import ReservationsClient from "./ReservationsClient";

const ReservationsPage = async () => {

	const currentUser = await getCurrentUser();

	if(!currentUser){
		return (
			<ClientProcessor>
				<EmptyState
					title="No has iniciado sesion."
					subtitle="Inicia sesion para ver tus reservaciones."
				/>
			</ClientProcessor>
		)
	}

	const reservations = await getReservations({userId: currentUser.id});
	// console.log("reservations",reservations);

	if(reservations.length === 0){
		return (
			<ClientProcessor>
				<EmptyState
					title="No tienes reservaciones."
					subtitle="Aun no has hecho ninguna reservación."
				/>
			</ClientProcessor>
		)
	}

	return (
		<ClientProcessor>
			<ReservationsClient
				reservations={reservations}
				currentUser={currentUser}
			/>
		</ClientProcessor>
	)
}

export default ReservationsPage;
