import { useDraggable } from "@dnd-kit/core";
import { Resizable, ResizeCallback } from "re-resizable";
import { useCallback, useMemo } from "react";
import { tv } from "tailwind-variants";
import { useScheduler } from "../../context/SchedulerContext";
import { IScheduledEvent } from "../../types";
import { getEventHeight } from "../../utils/SchedulerUtils";
import { ScheduledEventResizeHandler } from "./ScheduledEventResizeHandler";

const eventStyles = tv({
	base: "absolute left-0 right-0 select-none",
	slots: {
		wrapper: "h-full w-full cursor-pointer rounded border border-primary/20 bg-primary/10 px-2 py-1",
		title: "truncate text-xs font-medium",
		resizeTop: "absolute left-0 right-0 top-0 h-1 cursor-ns-resize",
		resizeBottom: "absolute bottom-0 left-0 right-0 h-1 cursor-ns-resize"
	},
	variants: {
		dragging: {
			true: "opacity-50"
		}
	}
});

export interface ScheduledEventProps<T = unknown> {
	event: IScheduledEvent<T>;
	top?: string;
	left?: string;
	width?: string;
	onEventClick?: (event: IScheduledEvent<T>) => void;
}

export const ScheduledEvent: React.FC<ScheduledEventProps> = ({ event, onEventClick, width, left, top }) => {
	const {
		eventComponent,
		isDraggable,
		isResizable,
		onEventResize,
		onEventDrop,
		hourHeight,
		gridSize,
		pxToMinutes,
		snapToTime
	} = useScheduler();

	const canDrag = isDraggable ? isDraggable(event) : onEventDrop !== undefined;
	const canResize = isResizable ? isResizable(event) : onEventResize !== undefined;

	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: event.id,
		data: { event },
		disabled: !canDrag
	});
	const isDragging = !!transform;

	const height = useMemo(() => getEventHeight(event, hourHeight), [event, hourHeight]);
	const style = {
		top,
		height,
		left,
		width
		// transform: CSS.Transform.toString(transform)
	};

	const onEventClickHandler = useCallback(
		(e: React.MouseEvent) => {
			if (!onEventClick) return;
			onEventClick(event);
			e.stopPropagation();
		},
		[onEventClick, event]
	);

	const onResize = useCallback<ResizeCallback>((_, direction, elementRef, delta) => {
		if (direction === "top") {
			// При растягивании вверх двигаем элемент
			elementRef.style.transform = `translateY(${-delta.height}px)`;
		}
	}, []);

	const onStopResize: ResizeCallback = useCallback(
		(_, direction, elementRef, delta) => {
			if (direction === "bottom") {
				const minutes = pxToMinutes(delta.height);
				const newEndDate = new Date(event.endDate.getTime() + minutes * 60 * 1000);
				onEventResize?.(event, {
					startDate: event.startDate,
					endDate: snapToTime(newEndDate)
				});
			} else if (direction === "top") {
				elementRef.style.transform = "none";
				const minutes = pxToMinutes(delta.height);
				const newStartDate = new Date(event.startDate.getTime() - minutes * 60 * 1000);
				onEventResize?.(event, {
					startDate: snapToTime(newStartDate),
					endDate: event.endDate
				});
			}
		},
		[event, onEventResize, pxToMinutes, snapToTime]
	);

	const eventContent = useMemo(() => {
		const { wrapper, title } = eventStyles();
		const base = (
			<div className={wrapper()}>
				<div className={title()}>{event.title}</div>
			</div>
		);
		if (eventComponent) {
			const EventComponent = eventComponent;
			return <EventComponent event={event} baseEventComponent={base} />;
		}
		return base;
	}, [eventComponent, event]);

	const { base } = eventStyles();

	return (
		<div
			className={base({ dragging: isDragging })}
			ref={setNodeRef}
			style={style}
			{...(canDrag ? attributes : {})}
			{...(canDrag ? listeners : {})}
			onClick={onEventClickHandler}
		>
			<Resizable
				size={{ height: height }}
				enable={canResize ? ResizeEnable : false}
				grid={[0, gridSize]}
				onResize={onResize}
				onResizeStop={onStopResize}
				handleComponent={{
					bottom: <ScheduledEventResizeHandler />,
					top: <ScheduledEventResizeHandler />
				}}
			>
				{eventContent}
			</Resizable>
		</div>
	);
};

const ResizeEnable = {
	top: true,
	bottom: true
};
