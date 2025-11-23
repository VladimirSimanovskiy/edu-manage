import { tv } from "tailwind-variants";
import { useScheduler } from "../../context/SchedulerContext";

const hourRows = tv({
	slots: {
		wrapper: "pointer-events-none absolute inset-0 flex h-full flex-col justify-between",
		hourRow: "h-full border-t border-border"
	}
});

export const HourRows = () => {
	const { hourHeight } = useScheduler();
	const { wrapper, hourRow } = hourRows();
	return (
		<div className={wrapper()} style={{ height: `${hourHeight * 24}px` }}>
			{Array.from({ length: 24 }).map((_, index) => (
				<div key={index} className={hourRow()} style={{ height: `${hourHeight}px` }} />
			))}
		</div>
	);
};
