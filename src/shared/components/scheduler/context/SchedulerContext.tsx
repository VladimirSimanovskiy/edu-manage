import { createContext, useContext, useMemo } from "react";
import { SchedulerBaseSettings } from "../Scheduler";

interface SchedulerContextType extends SchedulerBaseSettings {
	dates: Date[];
	hourHeight: number;
	timeSnap: number;
}

const SchedulerContext = createContext<SchedulerContextType | undefined>(undefined);

export const SchedulerProvider = ({ children, value }: { children: React.ReactNode; value: SchedulerContextType }) => {
	return <SchedulerContext.Provider value={value}>{children}</SchedulerContext.Provider>;
};

interface UseSchedulerProps {
	/**
	 * Размер сетки для перетаскивания и ресайза события.
	 * Вычисляется из hourHeight и timeSnap.
	 */
	gridSize: number;
	/**
	 * Преобразование пикселей в минуты.
	 * Используется для вычисления времени при перетаскивании и ресайзе события.
	 */
	pxToMinutes: (px: number) => number;
	/**
	 * Округление времени до ближайшего времени с учетом timeSnap.
	 */
	snapToTime: (time: Date) => Date;
	/**
	 * Преобразование минут в пиксели.
	 */
	minInPx: (min: number) => number;
}

export const useScheduler = (): UseSchedulerProps & SchedulerContextType => {
	const context = useContext(SchedulerContext);
	if (context === undefined) {
		throw new Error("useScheduler must be used within a SchedulerProvider");
	}

	const { hourHeight, timeSnap } = context;
	const props = useMemo(() => {
		return {
			gridSize: (hourHeight / 60) * timeSnap,
			pxToMinutes: (px: number) => {
				return Math.round((px / hourHeight) * 60);
			},
			snapToTime: (time: Date) => {
				const minutes = time.getMinutes();
				return new Date(
					time.getFullYear(),
					time.getMonth(),
					time.getDate(),
					time.getHours(),
					Math.round(minutes / timeSnap) * timeSnap
				);
			},
			minInPx: (min: number) => {
				return min * (hourHeight / 60);
			}
		};
	}, [hourHeight, timeSnap]);

	return {
		...context,
		...props
	};
};
