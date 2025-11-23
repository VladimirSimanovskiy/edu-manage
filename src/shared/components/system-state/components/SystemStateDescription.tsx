import React from "react";
import { tv } from "tailwind-variants";

const descriptionStyles = tv({
	base: "leading-base max-w-s text-base font-normal text-muted lg:max-w-xl"
});

export type SystemStateDescriptionProps = React.HTMLAttributes<HTMLDivElement>;

export const SystemStateDescription = React.forwardRef<HTMLDivElement, SystemStateDescriptionProps>(
	({ className, children, ...props }, ref) => {
		return (
			<div ref={ref} className={descriptionStyles({ className })} {...props}>
				{children}
			</div>
		);
	}
);

SystemStateDescription.displayName = "SystemStateDescription";
