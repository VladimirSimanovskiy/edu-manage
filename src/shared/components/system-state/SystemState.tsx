import React from "react";
import { tv } from "tailwind-variants";

const systemStateStyles = tv({
	base: "flex w-full max-w-[343px] flex-col items-center text-center lg:max-w-[672px]"
});

export type SystemStateProps = React.HTMLAttributes<HTMLDivElement>;

export const SystemState = React.forwardRef<HTMLDivElement, SystemStateProps>(
	({ className, children, ...props }, ref) => {
		return (
			<div ref={ref} className={systemStateStyles({ className })} {...props}>
				{children}
			</div>
		);
	}
);

SystemState.displayName = "SystemState";
