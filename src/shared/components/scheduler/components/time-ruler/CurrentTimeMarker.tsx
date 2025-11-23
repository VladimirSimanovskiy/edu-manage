import { getFormattedTime } from "@/lib/utils/date/date";
import { useEffect, useState, useRef } from "react";
import { tv } from "tailwind-variants";
import { getCurrentTimePercentage } from "../../utils/SchedulerUtils";

const currentTimeMarker = tv({
	slots: {
		currentTime: "absolute left-0 right-0 border-t border-primary/50",
		currentTimeLabel: "absolute left-1 -translate-y-1/2 rounded-sm bg-primary px-1 text-xs text-primary-foreground"
	}
});

type CurrentTimeMarkerProps = {
	showValue?: boolean;
};

export const CurrentTimeMarker: React.FC<CurrentTimeMarkerProps> = ({ showValue = false }) => {
	const [position, setPosition] = useState(() => getCurrentTimePercentage());

	const [value, setValue] = useState<string | null>(() => {
		if (!showValue) return null;
		return getFormattedTime(new Date());
	});

	const markerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		markerRef.current?.scrollIntoView({ behavior: "instant", block: "center" });

		const interval = setInterval(() => {
			setPosition(getCurrentTimePercentage());
			if (showValue) setValue(getFormattedTime(new Date()));
		}, 60000); // обновление каждую минуту

		return () => clearInterval(interval);
	}, [showValue]);

	const { currentTime, currentTimeLabel } = currentTimeMarker();
	return (
		<div ref={markerRef} className={currentTime()} style={{ top: position }}>
			{showValue && <span className={currentTimeLabel()}>{value}</span>}
		</div>
	);
};
