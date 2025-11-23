import { getFormattedTime } from "@/lib/utils/date/date";
import { getFirstDayOfWeek } from "@/lib/utils/date/getFirstDayOfWeek";
import { resizeDecorator } from "@/lib/utils/storybook";
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { EventDateChange, Scheduler } from "./Scheduler";
import { storiesEvents } from "./story-utils/SchedulerStoriesData";
import { useState } from "react";
import { IScheduledEvent } from "./types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../tooltip";

const mon = getFirstDayOfWeek(new Date());
const sun = new Date(mon);
sun.setDate(sun.getDate() + 6);

const meta: Meta<typeof Scheduler> = {
	component: Scheduler,
	args: {
		startDate: mon,
		endDate: sun,
		events: storiesEvents,
		onDayClick: fn(),
		onEventClick: fn(),
		onEventDrop: fn(),
		onEventResize: fn(),
		timeSnap: 15
	},
	tags: ["autodocs"],
	parameters: {
		layout: "fullscreen"
	},
	decorators: [
		(Story) => (
			<div className="h-screen">
				<Story />
			</div>
		)
	]
};

export default meta;

type Story = StoryObj<typeof Scheduler>;

export const Default: Story = {};

export const Controlled: Story = {
	decorators: [
		(_, context) => {
			const [events, setEvents] = useState(storiesEvents);

			const handleEventDrop = (event: IScheduledEvent, change: EventDateChange) => {
				const updatedEvents = events.map((e) => {
					if (e.id === event.id) {
						return {
							...e,
							startDate: change.startDate,
							endDate: change.endDate
						};
					}
					return e;
				});
				setEvents(updatedEvents);
			};

			const handleEventResize = (event: IScheduledEvent, change: EventDateChange) => {
				const updatedEvents = events.map((e) => {
					if (e.id === event.id) {
						return {
							...e,
							startDate: change.startDate,
							endDate: change.endDate
						};
					}
					return e;
				});
				setEvents(updatedEvents);
			};

			return (
				<Scheduler
					{...context.args}
					events={events}
					onEventDrop={handleEventDrop}
					onEventResize={handleEventResize}
				/>
			);
		}
	]
};

export const Resize: Story = {
	decorators: [resizeDecorator({ height: "600px" })]
};

export const WithTooltip: Story = {
	decorators: [
		(Story) => {
			return (
				<TooltipProvider>
					<Story />
				</TooltipProvider>
			);
		}
	],
	args: {
		eventComponent: (props) => {
			return (
				<Tooltip>
					<TooltipTrigger asChild>{props.baseEventComponent}</TooltipTrigger>
					<TooltipContent side="bottom" align="center">
						{getFormattedTime(props.event.startDate)} - {getFormattedTime(props.event.endDate)}{" "}
						{props.event.title}
					</TooltipContent>
				</Tooltip>
			);
		}
	}
};

export const WithCustomEventComponent: Story = {
	args: {
		eventComponent: (props) => (
			<div className="hover:to-blue-150 h-full w-full rounded-md border border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100 p-2 shadow-sm transition-colors hover:from-blue-100">
				<div className="flex h-full flex-col">
					<span className="truncate text-sm font-medium text-blue-800">{props.event.title}</span>
					<span className="mt-0.5 text-xs text-blue-600">
						{getFormattedTime(props.event.startDate)} - {getFormattedTime(props.event.endDate)}
					</span>
				</div>
			</div>
		)
	}
};

export const SingleDay: Story = {
	args: {
		showDates: false,
		startDate: new Date(),
		endDate: void 0,
		hourHeight: 80
	}
};

export const WithoutDragNDrop: Story = {
	args: {
		onEventDrop: void 0,
		onEventResize: void 0
	}
};

const today = new Date();
today.setHours(10, 0, 0, 0);

type DnDData = {
	draggable?: boolean;
	resizable?: boolean;
};

export const ConditionalDragNDrop: Story = {
	args: {
		showDates: false,
		startDate: today,
		endDate: void 0,
		events: [
			{
				id: "1",
				title: "Readonly event",
				startDate: new Date(today.getTime()),
				endDate: new Date(today.getTime() + 1000 * 60 * 60)
			},
			{
				id: "2",
				title: "Draggable event",
				startDate: new Date(today.getTime() + 1000 * 60 * 60 * 2),
				endDate: new Date(today.getTime() + 1000 * 60 * 60 * 4),
				data: { draggable: true }
			},
			{
				id: "3",
				title: "Resizable event",
				startDate: new Date(today.getTime() + 1000 * 60 * 60 * 5),
				endDate: new Date(today.getTime() + 1000 * 60 * 60 * 7),
				data: { resizable: true }
			}
		],
		isDraggable: (event) => {
			const data = event.data as DnDData;
			return !!data?.draggable;
		},
		isResizable: (event) => {
			const data = event.data as DnDData;
			return !!data?.resizable;
		}
	}
};

export const DndPg: Story = {
	args: {
		showDates: false,
		startDate: today,
		endDate: new Date(today.getTime() + 1000 * 60 * 60 * 24 * 6),
		timeSnap: 30,
		hourHeight: 60,
		onEventResize: (event) => {
			console.log("onEventResize", event);
			fn();
		},
		onEventDrop: (event, date) => {
			console.log("onEventDrop", event, date);
			fn();
		},
		events: [
			{
				id: "1",
				title: "Event",
				startDate: new Date(today.getTime()),
				endDate: new Date(today.getTime() + 1000 * 60 * 60)
			},
			{
				id: "2",
				title: "Event 2",
				startDate: new Date(today.getTime() + 1000 * 60 * 60 * 2 + 1000 * 60 * 8),
				endDate: new Date(today.getTime() + 1000 * 60 * 60 * 4 + 1000 * 60 * 5),
				data: { draggable: true }
			},
			{
				id: "3",
				title: "Event 3",
				startDate: new Date(today.getTime() + 1000 * 60 * 60 * 5 + 1000 * 60 * 3),
				endDate: new Date(today.getTime() + 1000 * 60 * 60 * 7),
				data: { resizable: true }
			}
		]
	}
};
