"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import { differenceInDays, eachDayOfInterval } from "date-fns";

import Container from "@atoms/container/Container";
import ListingHead from "@atoms/listings/ListingHead";
import ListingInfo from "@atoms/listings/ListingInfo";
import ListingReservations from "@atoms/listings/ListingReservations";
import { categories } from "@atoms/categories/Categories/constants/categories";

import { SafeListing, SafeReservation, SafeUser } from "@molecules/types";

import useLoginModal from "@custom-hooks/useLoginModal";

const initialDateRange = {
	startDate: new Date(),
	endDate: new Date(),
	key: "selection",
};

interface IListingClientProps {
	reservations?: SafeReservation[];
	listing: SafeListing & {
		user: SafeUser;
	};
	currentUser?: SafeUser | null;
}

const ListingClient: React.FC<IListingClientProps> = ({ listing, reservations = [], currentUser }) => {
	const router = useRouter();
	const loginModal = useLoginModal();

	const [isLoading, setIsLoading] = useState(false);
	const [totalPrice, setTotalPrice] = useState(listing.price);
	const [dateRange, setDateRange] = useState<Range>(initialDateRange);

	useEffect(() => {
		if (dateRange.startDate && dateRange.endDate) {
			const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

			if (dayCount && listing.price) {
				setTotalPrice(dayCount * listing.price);
			} else {
				setTotalPrice(listing.price);
			}
		}
	}, [dateRange, listing.price]);

	const category = useMemo(() => {
		let matches = categories.filter(cat => cat.label === listing.category);
		if (matches.length > 0) {
			return matches[0];
		} else {
			return undefined;
		}
	}, [listing.category]);

	const disabledDates = useMemo(() => {
		let dates: Date[] = [];

		reservations.forEach((reservation: any) => {
			const interval = eachDayOfInterval({
				start: new Date(reservation.startDate),
				end: new Date(reservation.endDate),
			});

			dates = [...dates, ...interval];
		});

		return dates;
	}, [reservations]);

	const onCreateReservation = useCallback(() => {
		if (!currentUser) {
			loginModal.onOpen();
			return;
		}

		if (!dateRange.startDate || !dateRange.endDate) {
			toast.error("Selecciona un rango de fechas");
			return;
		}

		setIsLoading(true);
		console.log({
			totalPrice,
			listingId: listing?.id,
			startDate: dateRange.startDate,
			endDate: dateRange.endDate,
		});

		axios
			.post("/api/reservations", {
				totalPrice,
				listingId: listing?.id,
				startDate: dateRange.startDate,
				endDate: dateRange.endDate,
			})
			.then(res => {
				// console.log("create-reservation", res)
				toast.success("Reservación creada");
				setDateRange(initialDateRange);
				router.push("/trips");
			})
			.catch(() => {
				toast.error("Error al crear la reservación");
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [dateRange, totalPrice]);

	return (
		<Container>
			<div
				className="
					max-w-screen-lg
					mx-auto
				"
			>
				<div
					className="
						flex
						flex-col
						gap-6
					"
				>
					<ListingHead
						title={listing.title}
						imageSrc={listing.imageSrc}
						locationValue={listing.locationValue}
						currentUser={currentUser}
						id={listing.id}
					/>
					<div
						className="
							grid
							grid-cols-1
							md:grid-cols-7
							md:gap-10
							mt-6
						"
					>
						<ListingInfo
							user={listing.user}
							category={category}
							description={listing.description}
							guestCount={listing.guestCount}
							roomCount={listing.roomCount}
							bathroomCount={listing.bathroomCount}
							locationValue={listing.locationValue}
						/>
						<div
							className="
							order-first
							mb-10
							md:order-last
							md:col-span-3
						"
						>
							<ListingReservations
								price={listing.price}
								totalPrice={totalPrice}
								onChangeDate={value => setDateRange(value)}
								dateRange={dateRange}
								onSubmit={onCreateReservation}
								disabled={isLoading}
								disabledDates={disabledDates}
							/>
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default ListingClient;
