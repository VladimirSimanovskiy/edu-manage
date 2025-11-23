import React from "react";
import { PropsWithChildren } from "react";
import { tv } from "tailwind-variants";

const progressCircleDescriptionStyles = tv({
	base: "text-xs text-muted"
});

export type ProgressCircleDescriptionProps = React.HTMLAttributes<HTMLDivElement>;

export const ProgressCircleDescription = React.forwardRef<
	HTMLDivElement,
	PropsWithChildren<ProgressCircleDescriptionProps>
>(({ className, children, ...props }, ref) => {
	return (
		<span className={progressCircleDescriptionStyles({ className })} ref={ref} {...props}>
			{children}
		</span>
	);
});

ProgressCircleDescription.displayName = "ProgressCircleDescription";
