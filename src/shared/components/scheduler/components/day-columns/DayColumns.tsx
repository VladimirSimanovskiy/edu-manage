import {
	DndContext,
	DragEndEvent,
	DragOverlay,
	DragStartEvent,
	KeyboardSensor,
	Modifier,
	PointerSensor,
	UniqueIdentifier,
	useSensor,
	useSensors
} from "@dnd-kit/core";
import { useCallback, useMemo, useState } from "react";
import { tv } from "tailwind-variants";
import { useScheduler } from "../../context/SchedulerContext";
import { IScheduledEvent } from "../../types";
import { DayColumn } from "../day-column/DayColumn";
import { ScheduledEvent } from "../scheduled-event/ScheduledEvent";

const dayColumns = tv({
	base: "flex h-full w-full"
});

export interface DayColumnsProps {
	events: IScheduledEvent[];
}

export const DayColumns: React.FC<DayColumnsProps> = ({ events }) => {
	const { onEventDrop, dates, gridSize, pxToMinutes, snapToTime } = useScheduler();

	const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

	// Настройка Drag'n'Drop
	const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } });
	const keyboardSensor = useSensor(KeyboardSensor);
	const sensors = useSensors(pointerSensor, keyboardSensor);

	const handleDragEnd = useCallback(
		(event: DragEndEvent) => {
			setActiveId(null);
			const deltaY = event.delta.y;
			const eventData = event.active.data.current?.event;
			const dayData = event.over?.data.current?.day;
			const minutes = pxToMinutes(deltaY);
			const newStartDate = new Date(eventData.startDate.getTime() + minutes * 60 * 1000);
			newStartDate.setDate(dayData.getDate());
			const newEndDate = new Date(eventData.endDate.getTime() + minutes * 60 * 1000);
			newEndDate.setDate(dayData.getDate());
			onEventDrop?.(eventData, { startDate: snapToTime(newStartDate), endDate: snapToTime(newEndDate) });
		},
		[onEventDrop, pxToMinutes, snapToTime]
	);

	const modifier = useMemo(() => createModifier(gridSize), [gridSize]);

	return (
		<DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors}>
			<div className={dayColumns()}>
				{dates.map((day, index) => (
					<DayColumn key={index} day={day} events={events} />
				))}
			</div>
			<DragOverlay dropAnimation={null} modifiers={[modifier]}>
				{activeId ? <ScheduledEvent event={events.find((e) => e.id === activeId) as IScheduledEvent} /> : null}
			</DragOverlay>
		</DndContext>
	);

	function handleDragStart(event: DragStartEvent) {
		setActiveId(event.active.id);
	}
};

const createModifier = (gridSize: number) => {
	const modifier: Modifier = (args) => {
		const { transform, draggingNodeRect, over, containerNodeRect } = args;
		if (!draggingNodeRect || !over?.rect || !containerNodeRect) return transform;

		// Перетаскиваемое событие выравнивается по левому краю колонки дня
		const x = over.rect.left - draggingNodeRect.left;

		// Определяется изначальное смещение события от сетки
		const topDelta = (containerNodeRect.top - draggingNodeRect.top) % gridSize;
		// Текущая позиция перетаскиваемого события подгоняется под сетку и сдвигается на изначальное смещение, чтобы событие попало в сетку
		const y = Math.floor(transform.y / gridSize) * gridSize + topDelta;

		return {
			...transform,
			x,
			y
		};
	};

	return modifier;
};
