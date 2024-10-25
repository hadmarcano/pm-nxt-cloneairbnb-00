"use client";

import { useState, useMemo, useCallback } from "react";
import { Range } from "react-date-range";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { formatISO } from "date-fns";
import queryString from "query-string";

import Heading from "@atoms/heading/Heading";
import Modal from "./Modal";
import Counter from "@atoms/inputs/Counter";
import Calendar from "@atoms/inputs/Calendar";
import CountrySelect from "@atoms/inputs/CountrySelect";

import { ICountrySelectValue } from "@atoms/inputs/interfaces/countrySelectValue.interface";
import useSearchModal from "@custom-hooks/useSearchModal";

enum STEPS {
	LOCATION = 0,
	DATE = 1,
	INFO = 2,
}

const SearchModal = () => {
	const router = useRouter();
	const searchModal = useSearchModal();
	const params = useSearchParams();

	const [step, setStep] = useState(STEPS.LOCATION);
	const [location, setLocation] = useState<ICountrySelectValue>();
	const [guestCount, setGuestCount] = useState(1);
	const [roomCount, setRoomCount] = useState(1);
	const [bathroomCount, setBathroomCount] = useState(1);
	const [dateRange, setDateRange] = useState<Range>({
		startDate: new Date(),
		endDate: new Date(),
		key: "selection",
	});

	const Map = useMemo(
		() =>
			dynamic(() => import("@atoms/Map/Map"), {
				ssr: false,
			}),
		[],
	);

	const onBack = useCallback(() => {
		setStep(value => value - 1);
	}, []);

	const onNext = useCallback(() => {
		setStep(value => value + 1);
	}, []);

	const onSubmit = useCallback(async () => {
		if (step !== STEPS.INFO) {
			return onNext();
		}

		let currentQuery = {};

		if (params) {
			currentQuery = queryString.parse(params.toString());
			console.log("currentQuery", currentQuery);
		}
		const updateQuery = {
			...currentQuery,
			locationValue: location?.value,
			guestCount,
			roomCount,
			bathroomCount,
			startDate: dateRange.startDate ? formatISO(dateRange.startDate) : undefined,
			endDate: dateRange.endDate ? formatISO(dateRange.endDate) : undefined,
		};

		const url = queryString.stringifyUrl(
			{
				url: "/",
				query: updateQuery,
			},
			{
				skipNull: true,
			},
		);

		setStep(STEPS.LOCATION);
		searchModal.close();

		router.push(url);
	}, [
		bathroomCount,
		dateRange.endDate,
		dateRange.startDate,
		guestCount,
		location?.value,
		onNext,
		params,
		roomCount,
		step,
	]);

	const actionLabel = useMemo(() => {
		if (step === STEPS.INFO) {
			return "Buscar";
		}

		return "Siguiente";
	}, [step]);

	const secondaryActionLabel = useMemo(() => {
		if (step === STEPS.LOCATION) {
			return undefined;
		}

		return "Regresar";
	}, [step]);

	let bodyContent = (
		<div className="flex flex-col gap-8">
			<Heading title="¿A dónde quieres ir?" subtitle="Encuentra la ubicación perfecta." />
			<CountrySelect
				value={location}
				onChange={value => {
					setLocation(value as ICountrySelectValue);
				}}
			/>
			<hr />
			<Map center={location?.latlng} />
		</div>
	);

	if (step === STEPS.DATE) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading title="¿Cuándo quieres ir?" subtitle="¡ Asegúrate de elegir las fechas correctas !" />
				<Calendar
					value={dateRange}
					onChange={value => {
						setDateRange(value.selection);
					}}
				/>
			</div>
		);
	}

	if (step === STEPS.INFO) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading title="Más información" subtitle="¡ Encuentra tu lugar perfecto !" />
				<Counter
					onChange={value => setGuestCount(value)}
					value={guestCount}
					title="Huéspedes"
					subtitle="¿Para cuántos huéspedes?"
				/>
				<hr />
				<Counter
					onChange={value => setRoomCount(value)}
					value={roomCount}
					title="Habitaciones"
					subtitle="¿Cuántas habitaciones?"
				/>
				<hr />
				<Counter
					onChange={value => setBathroomCount(value)}
					value={bathroomCount}
					title="Baños"
					subtitle="¿Con cuántos baños?"
				/>
			</div>
		);
	}

	return (
		<Modal
			isOpen={searchModal.isOpen}
			title="Filtros"
			actionLabel={actionLabel}
			onSubmit={onSubmit}
			secondaryActionLabel={secondaryActionLabel}
			secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
			onClose={searchModal.close}
			body={bodyContent}
		/>
	);
};

export default SearchModal;
