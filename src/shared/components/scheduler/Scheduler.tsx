import { useMemo } from "react";
import { tv } from "tailwind-variants";
import { DayColumns } from "./components/day-columns/DayColumns";
import { HourRows } from "./components/hour-rows/HourRows";
import { TimeRuler } from "./components/time-ruler/TimeRuler";
import { WeekDays } from "./components/week-days/WeekDays";
import { SchedulerProvider } from "./context/SchedulerContext";
import { IScheduledEvent } from "./types";
import { TooltipProvider } from "../tooltip";

const schedulerStyles = tv({
	base: "flex h-full flex-col",
	slots: {
		content: "relative flex flex-1 overflow-auto",
		days: "relative flex-1"
	}
});

interface EventComponentProps {
	event: IScheduledEvent;
	baseEventComponent: React.ReactNode;
}

export interface EventDateChange {
	startDate: Date;
	endDate: Date;
}

export interface SchedulerBaseSettings {
	/**
	 * Высота строки часа, в px
	 * @default 40
	 */
	hourHeight?: number;
	/**
	 * Интервал округления времени в минутах
	 * @default 15
	 */
	timeSnap?: number;
	/**
	 * Событие, которое срабатывает при клике на день.
	 * Время задается в зависимости от позиции клика.
	 */
	onDayClick?: (data: { date: Date }) => void;
	/**
	 * Событие, которое срабатывает при клике на событие
	 */
	onEventClick?: (event: IScheduledEvent) => void;
	/**
	 * Событие, которое срабатывает при перетаскивании события
	 */
	onEventDrop?: (event: IScheduledEvent, change: EventDateChange) => void;
	/**
	 * Событие, которое срабатывает при изменении времени события с помощью ресайзера
	 */
	onEventResize?: (event: IScheduledEvent, change: EventDateChange) => void;
	/**
	 * Компонент, который будет использоваться для отображения события
	 */
	eventComponent?: React.ComponentType<EventComponentProps>;
	/**
	 * Функция, определяющая, можно ли перетаскивать событие
	 */
	isDraggable?: (event: IScheduledEvent) => boolean;
	/**
	 * Функция, определяющая, можно ли изменять размер события
	 */
	isResizable?: (event: IScheduledEvent) => boolean;
}

export interface SchedulerProps extends SchedulerBaseSettings {
	/**
	 * Список отображаемых событий
	 */
	events: IScheduledEvent[];
	/**
	 * Дата с которой начинается отображение
	 */
	startDate?: Date;
	/**
	 * Дата с которой заканчивается отображение
	 */
	endDate?: Date;
	/**
	 * Показывать дни в заголовке. По умолчанию оторажаются.
	 * @default true
	 */
	showDates?: boolean;
}

export const Scheduler: React.FC<SchedulerProps> = ({
	events,
	startDate,
	endDate,
	timeSnap = 15,
	onDayClick,
	onEventClick,
	onEventDrop,
	onEventResize,
	eventComponent,
	showDates = true,
	hourHeight = 40,
	isDraggable,
	isResizable
}) => {
	const dates = useMemo(() => {
		const date = startDate ? new Date(startDate) : new Date();
		date.setHours(0, 0, 0, 0);

		const days: Date[] = [];

		if (!endDate) {
			days.push(date);
		} else {
			const currentDate = new Date(date);
			while (currentDate <= endDate) {
				days.push(new Date(currentDate));
				currentDate.setDate(currentDate.getDate() + 1);
			}
		}

		return days;
	}, [startDate, endDate]);

	const { content, days, base } = schedulerStyles();

	const weekDays = showDates ? (
		<div>
			<WeekDays />
		</div>
	) : null;

	return (
		<SchedulerProvider
			value={{
				dates,
				timeSnap,
				onDayClick,
				onEventClick,
				onEventDrop,
				onEventResize,
				hourHeight,
				eventComponent,
				isDraggable,
				isResizable
			}}
		>
			<TooltipProvider>
				<div className={base()}>
					{weekDays}
					<div className={content()}>
						<div>
							<TimeRuler showCurrentTime />
						</div>
						<div className={days()}>
							<HourRows />
							<DayColumns events={events} />
						</div>
					</div>
				</div>
			</TooltipProvider>
		</SchedulerProvider>
	);
};
