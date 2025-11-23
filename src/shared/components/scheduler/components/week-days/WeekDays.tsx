import { tv } from "tailwind-variants";
import { useScheduler } from "../../context/SchedulerContext";
import { Day } from "../day/Day";

const weekDays = tv({ base: "flex w-full justify-between" });

export const WeekDays: React.FC = () => {
	const { dates } = useScheduler();
	return (
		<div className={weekDays()}>
			{dates.map((day, index) => (
				<Day key={index} date={day} />
			))}
		</div>
	);
};
