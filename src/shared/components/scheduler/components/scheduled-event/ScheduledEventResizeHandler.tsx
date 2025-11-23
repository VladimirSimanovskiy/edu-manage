import React, { useCallback } from "react";

export const ScheduledEventResizeHandler: React.FC = () => {
	// Перехватываем событие, чтобы не вызывался onClick и не вызывался drag-and-drop
	const onPointerDown = useCallback((e: React.PointerEvent) => {
		e.stopPropagation();
	}, []);
	return <div className="h-full w-full" onPointerDown={onPointerDown} />;
};
