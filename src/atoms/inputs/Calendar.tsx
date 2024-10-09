"use client";

import { DateRange, Range, RangeKeyDict } from "react-date-range";
import { es } from "date-fns/locale";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface DatePickerProps {
	value: Range;
	onChange: (value: RangeKeyDict) => void;
	disabledDates?: Date[];
}

const Calendar: React.FC<DatePickerProps> = ({ value, onChange, disabledDates }) => {
	// console.log("Value: ", value);
	// console.log("Disabled Dates: ", disabledDates);

	return (
		<DateRange
			locale={es}
			rangeColors={["#262626"]}
			ranges={[value]}
			date={new Date()}
			onChange={onChange}
			direction="vertical"
			showDateDisplay={false}
			minDate={new Date()}
			disabledDates={disabledDates}
		/>
	);
};

export default Calendar;
