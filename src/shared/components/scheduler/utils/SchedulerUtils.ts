import { roundDateTime } from "@/lib/utils/date/roundDateTime";
import { ClientRect } from "@dnd-kit/core";
import { IScheduledEvent } from "../types";

export const DAY_COLUMN_DATA_ATTRIBUTE = "data-day-column";

export function getDateFromClick(event: React.MouseEvent<HTMLDivElement>, day: Date, timeSnap: number) {
	const target = event.target as HTMLDivElement;
	if (!target) throw new Error("Target not found");
	const dayColumnDiv = target.closest(`[${DAY_COLUMN_DATA_ATTRIBUTE}]`);
	if (!dayColumnDiv) throw new Error("Day column not found");

	const rect = dayColumnDiv.getBoundingClientRect();

	return getDateFromY(event.clientY, rect, day, timeSnap);
}

export function getDateFromY(positionY: number, targetRect: ClientRect, day: Date, timeSnap: number) {
	const clickY = positionY - targetRect.top;
	const percentageOfDay = clickY / targetRect.height;
	return percentageToDate(percentageOfDay, day, timeSnap);
}

/**
 * Возвращает дату со временем, соответствующим проценту дня
 */
function percentageToDate(percentageOfDay: number, day: Date, timeSnap: number) {
	// Преобразуем процент дня в минуты (24 часа * 60 минут = 1440 минут)
	const minutesFromMidnight = Math.floor(percentageOfDay * 1440);
	const hours = Math.floor(minutesFromMidnight / 60);
	const minutes = minutesFromMidnight % 60;

	// Создаем новую дату с выбранным временем
	const selectedDate = new Date(day);
	selectedDate.setHours(hours, minutes, 0, 0);

	return roundDateTime(selectedDate, timeSnap);
}

/**
 * Возвращает процент времени от начала дня до текущего момента
 */
export function getCurrentTimePercentage() {
	const now = new Date();
	const minutes = now.getHours() * 60 + now.getMinutes();
	return `${(minutes / 1440) * 100}%`;
}

/**
 * Группирует события, которые пересекаются по времени
 */
export function groupCrossingEvents(events: IScheduledEvent[]): IScheduledEvent[][] {
	const groups: IScheduledEvent[][] = [];

	events.sort((a, b) => {
		return a.startDate.getTime() - b.startDate.getTime();
	});

	for (const event of events) {
		const group = groups.find((group) => group.some((e) => isEventCrossing(e, event)));
		if (group) {
			group.push(event);
		} else {
			groups.push([event]);
		}
	}

	return groups;
}

function isEventCrossing(event1: IScheduledEvent, event2: IScheduledEvent) {
	return event1.startDate < event2.endDate && event1.endDate > event2.startDate;
}

/**
 * Позиция элемента
 */
interface EventPosition {
	top: string;
	left: string;
	width: string;
}

/**
 * Возвращает данные для позиционирования событий на день
 */
export function getEventPositions(events: IScheduledEvent[], hourHeight: number): Map<string | number, EventPosition> {
	const positions = new Map<string | number, EventPosition>();
	const groupedEvents = groupCrossingEvents(events);
	for (const group of groupedEvents) {
		for (const [index, event] of group.entries()) {
			positions.set(event.id, {
				top: getEventTop(event, hourHeight) + "px",
				left: `${(100 / group.length) * index}%`,
				width: `${(100 / group.length) * (index + 1) - (100 / group.length) * index}%`
			});
		}
	}
	return positions;
}

function getEventLengthInMin(event: IScheduledEvent) {
	return (event.endDate.getTime() - event.startDate.getTime()) / 1000 / 60;
}

function oneMinInPx(hourHeight: number) {
	return hourHeight / 60;
}

/**
 * Возвращает высоту события в пикселях
 */
export function getEventHeight(event: IScheduledEvent, hourHeight: number) {
	return getEventLengthInMin(event) * oneMinInPx(hourHeight);
}

/**
 * Возвращает верхний отступ события в пикселях
 */
function getEventTop(event: IScheduledEvent, hourHeight: number) {
	return getMinutesFromStartOfDay(event.startDate) * oneMinInPx(hourHeight);
}

/**
 * Возвращает количество минут, прошедших с начала дня
 */
export function getMinutesFromStartOfDay(date: Date): number {
	return date.getHours() * 60 + date.getMinutes();
}
