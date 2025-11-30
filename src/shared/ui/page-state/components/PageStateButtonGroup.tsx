import React from "react";
import { tv } from "tailwind-variants";

const pageStateButtonGroupStyles = tv({
	base: "mt-8 flex w-full flex-row items-center justify-center gap-3"
});

export type PageStateButtonGroupProps = React.HTMLAttributes<HTMLDivElement>;

export const PageStateButtonGroup = React.forwardRef<HTMLDivElement, PageStateButtonGroupProps>(
	({ children, className, ...props }, ref) => {
		return (
			<div ref={ref} className={pageStateButtonGroupStyles({ className })} {...props}>
				{children}
			</div>
		);
	}
);

PageStateButtonGroup.displayName = "PageStateButtonGroup";
