"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { differenceInDays } from "date-fns";
import { BiSearch } from "react-icons/bi";

import useSearchModal from "@custom-hooks/useSearchModal";
import useCountries from "@custom-hooks/useCountries";

const Search = () => {
	const searchModal = useSearchModal();
	const params = useSearchParams();
	const { getCountryByValue } = useCountries();

	const locationValue = params?.get("locationValue");
	const startDate = params?.get("startDate");
	const endDate = params?.get("endDate");
	const guestCount = params?.get("guestCount");

	const locationLabel = useMemo(() => {
		let initLabel = "En cualquier lugar del mundo";

		if(locationValue){
			return getCountryByValue(locationValue as string)?.label;
		}

		return initLabel;


	}, [locationValue]);

	const durationLabel = useMemo(() => {
		let initLabel = "Cualquier semana";

		if(startDate && endDate){
			const start = new Date(startDate as string);
			const end = new Date(endDate as string);
			let duration = differenceInDays(end, start);

			if(duration === 0){
				duration = 1;
			}

			return `${duration} días`;
		}

		return initLabel;

	}, [endDate, startDate]);

	const guestLabel = useMemo(() => {

		const initLabel = "¿Cuántos?";

		if(guestCount){
			return `${guestCount} personas`;
		}

		return initLabel

	}, [guestCount]);

	return (
		<div
		onClick={searchModal.open}
			className="
				border-[1px]
				w-full
				md:w-auto
				py-2
				rounded-full
				shadow-md
				hover:shadow-md
				cursor-pointer
			"
		>
			<div
				className="
					flex
					flex-row
					items-center
					justify-between
				"
			>
				<div
					className="
						text-sm
						font-semibold
						px-6
					"
				>
					{locationLabel}
				</div>
				<div
					className="
						hidden
						sm:block
						text-sm
						font-semibold
						px-6
						border-x-[1px]
						flex-1
						text-center
					"
				>
					{durationLabel}
				</div>
				<div
					className="
						text-sm
						pl-6
						pr-2
						text-gray-600
						flex
						flex-row
						items-center
						gap-3
					"
				>
					<div className="hidden sm:block">{guestLabel}</div>
					<div
						className="
							p-2
							bg-rose-500
							rounded-full
							text-white
						"
					>
						<BiSearch size={18} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Search;
