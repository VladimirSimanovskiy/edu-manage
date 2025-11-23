import { SchedulerProvider } from "../context/SchedulerContext";

const mockFn =
	(title: string) =>
	(...args: unknown[]) => {
		console.log(title, args);
	};

export const schedulerContextDecorator = (story: () => React.ReactNode) => {
	return (
		<SchedulerProvider
			value={{
				timeSnap: 15,
				onDayClick: mockFn("onEventAdd"),
				onEventClick: mockFn("onEventClick"),
				onEventDrop: mockFn("onEventDrop"),
				onEventResize: mockFn("onEventResize"),
				hourHeight: 40,
				dates: [new Date()]
			}}
		>
			{story()}
		</SchedulerProvider>
	);
};
