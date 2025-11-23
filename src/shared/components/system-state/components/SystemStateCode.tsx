import React from "react";
import { tv } from "tailwind-variants";

const codeStyles = tv({
	base: "mb-8 align-middle font-mono text-sm font-medium leading-normal text-muted"
});

export type SystemStateCodeProps = React.HTMLAttributes<HTMLDivElement>;

export const SystemStateCode = React.forwardRef<HTMLDivElement, SystemStateCodeProps>(
	({ className, children, ...props }, ref) => {
		return (
			<div ref={ref} className={codeStyles({ className })} {...props}>
				{children}
			</div>
		);
	}
);

SystemStateCode.displayName = "SystemStateCode";
