import * as React from "react";
import { cn } from "@/lib/utils";
import { portalContainerEvents } from "./portalContainerEvents";

/**
 * Компонент-контейнер для портала с поддержкой изолированных стилей.
 *
 * Предоставляет обёртку с классом 'ui-kit' и data-атрибутом для плавающего контента
 * (Modal, Dropdown, Select, Popover, Drawer, Tooltip, Sheet, AlertDialog).
 *
 * Следует использовать только если применяются изолированные стили.
 */
export const PortalContainer = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
	({ children, className, ...props }, ref) => {
		React.useEffect(() => {
			portalContainerEvents.notify(true);
			return () => portalContainerEvents.notify(false);
		}, []);

		return (
			<div ref={ref} className={cn("ui-kit fixed left-0 top-0", className)} data-portal-container {...props}>
				{children}
			</div>
		);
	}
);

PortalContainer.displayName = "PortalContainer";
