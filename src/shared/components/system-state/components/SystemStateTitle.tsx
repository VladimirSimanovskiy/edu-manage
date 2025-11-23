import React from "react";
import { tv } from "tailwind-variants";

const titleStyles = tv({
	base: "leading-3xl lg:leading-5xl letter-spacing-[-0.02em] pb-4 text-center align-middle font-sans text-3xl font-bold lg:text-5xl"
});

export type SystemStateTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

export const SystemStateTitle = React.forwardRef<HTMLHeadingElement, SystemStateTitleProps>(
	({ className, ...props }, ref) => {
		return <h2 ref={ref} className={titleStyles({ className })} {...props} />;
	}
);

SystemStateTitle.displayName = "SystemStateTitle";
