import * as React from "react";
import { tv } from "tailwind-variants";
import { DrawerHandlerSvg } from "./DrawerHandlerSvg";

const drawerHandlerWrapStyles = tv({ base: "flex flex-row" });

const drawerHandlerStyles = tv({
	base: "h-3 flex-1 bg-secondary-bg",
	variants: {
		position: {
			left: "rounded-tl-2xl",
			right: "rounded-tr-2xl"
		}
	}
});

export const DrawerHandler = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => {
		return (
			<div ref={ref} className={drawerHandlerWrapStyles({ className })} {...props}>
				<div className={drawerHandlerStyles({ position: "left" })} />
				<DrawerHandlerSvg />
				<div className={drawerHandlerStyles({ position: "right" })} />
			</div>
		);
	}
);
DrawerHandler.displayName = "DrawerHandler";
