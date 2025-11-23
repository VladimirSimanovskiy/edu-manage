import { useMemo } from "react";
import { tv } from "tailwind-variants";
import { CurrentTimeMarker } from "./CurrentTimeMarker";
import { getFormattedTime } from "@/lib/utils/date/date";
import { useScheduler } from "../../context/SchedulerContext";

const timeRuler = tv({
	slots: {
		wrapper: "relative h-full",
		hourMark: "h-full pl-2 pr-2",
		hourLabel: "-translate-y-1/2 text-xs text-muted-foreground"
	}
});

type TimeRulerProps = {
	showCurrentTime?: boolean;
};

export const TimeRuler: React.FC<TimeRulerProps> = ({ showCurrentTime = false }) => {
	const { hourHeight } = useScheduler();
	const { wrapper, hourMark, hourLabel } = timeRuler();

	const hours = useMemo(() => {
		const now = new Date();
		return Array.from({ length: 24 }, (_, i) => {
			now.setHours(i);
			now.setMinutes(0);
			now.setSeconds(0);
			now.setMilliseconds(0);
			return getFormattedTime(now);
		});
	}, []);
	return (
		<div className={wrapper()} style={{ height: `${hourHeight * 24}px` }}>
			{hours.map((hour, index) => (
				<div key={hour} className={hourMark()} style={{ height: `${hourHeight}px` }}>
					{index !== 0 && <div className={hourLabel()}>{hour}</div>}
				</div>
			))}

			{showCurrentTime && <CurrentTimeMarker showValue />}
		</div>
	);
};
