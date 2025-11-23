import { VariantsConfig } from "@/lib/utils/variants";
import { useMemo } from "react";
import { tv } from "tailwind-variants";

export interface DayVariants {
	holyday?: boolean;
}

const day = tv({
	slots: {
		wrapper: "flex w-full flex-col items-center",
		date: "text-3xl font-bold leading-none text-secondary-foreground",
		dayOfWeek: "px-1 text-sm leading-none text-muted-foreground",
		monthName: "px-1 text-sm leading-none text-muted-foreground"
	},
	variants: {
		holyday: {
			true: {
				dayOfWeek: "text-muted-foreground"
			}
		}
	} satisfies VariantsConfig<DayVariants>
});

type DayProps = DayVariants & {
	date: Date;
};

export const Day: React.FC<DayProps> = ({ date, holyday = false }) => {
	const dayOfWeek = useMemo(() => date.toLocaleDateString(undefined, { weekday: "short" }), [date]);
	const monthName = useMemo(() => date.toLocaleDateString(undefined, { month: "long" }), [date]);

	const { wrapper, date: dateStyle, dayOfWeek: dayOfWeekStyle, monthName: monthNameStyle } = day({ holyday });

	return (
		<div className={wrapper()}>
			<div className={dayOfWeekStyle()}>{dayOfWeek}</div>
			<div className={dateStyle()}>{date.getDate()}</div>
			<div className={monthNameStyle()}>{monthName}</div>
		</div>
	);
};
