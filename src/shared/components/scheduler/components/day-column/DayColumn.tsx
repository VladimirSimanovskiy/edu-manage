import { useDroppable } from "@dnd-kit/core";
import { useCallback, useMemo } from "react";
import { tv } from "tailwind-variants";
import { useScheduler } from "../../context/SchedulerContext";
import { IScheduledEvent } from "../../types";
import { DAY_COLUMN_DATA_ATTRIBUTE, getDateFromClick, getEventPositions } from "../../utils/SchedulerUtils";
import { ScheduledEvent } from "../scheduled-event/ScheduledEvent";
import { CurrentTimeMarker } from "../time-ruler/CurrentTimeMarker";

const dayColumn = tv({
	slots: { wrapper: "relative h-full w-full overflow-visible border-l border-border first:border-l-0" }
});

export interface DayColumnProps {
	day: Date;
	events: IScheduledEvent[];
}

export const DayColumn: React.FC<DayColumnProps> = ({ day, events }) => {
	const { timeSnap, onDayClick, onEventClick, hourHeight } = useScheduler();
	const { setNodeRef } = useDroppable({ id: `day-column-${day.toISOString()}`, data: { day } });

	const filteredEvents = useMemo(() => {
		const dayStart = new Date(day.setHours(0, 0, 0, 0));
		const dayEnd = new Date(day.setHours(23, 59, 59, 999));

		return events.filter((event) => {
			return event.startDate <= dayEnd && event.endDate >= dayStart;
		});
	}, [day, events]);

	const onDayClickHandler = useCallback(
		(event: React.MouseEvent<HTMLDivElement>) => {
			onDayClick?.({ date: getDateFromClick(event, day, timeSnap ?? 0) });
		},
		[onDayClick, day, timeSnap]
	);

	const eventsPositions = useMemo(() => getEventPositions(filteredEvents, hourHeight), [filteredEvents, hourHeight]);

	const { wrapper } = dayColumn();
	return (
		<div
			className={wrapper()}
			style={{ height: `${hourHeight * 24}px` }}
			ref={setNodeRef}
			onClick={onDayClickHandler}
			{...{ [DAY_COLUMN_DATA_ATTRIBUTE]: "" }}
		>
			{filteredEvents.map((event) => {
				const position = eventsPositions.get(event.id);
				return (
					<ScheduledEvent
						key={event.id}
						event={event}
						onEventClick={onEventClick}
						top={position?.top}
						width={position?.width}
						left={position?.left}
					/>
				);
			})}

			<CurrentTimeMarker />
		</div>
	);
};
