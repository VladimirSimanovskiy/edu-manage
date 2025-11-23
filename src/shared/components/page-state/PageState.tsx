import React from "react";
import { tv } from "tailwind-variants";
import { PageStateProvider, PageStateSize } from "./context/PageStateContext";

const pageStateStyles = tv({
	base: "flex w-full flex-col items-center px-8"
});

export type PageStateProps = React.HTMLAttributes<HTMLDivElement> & {
	size?: PageStateSize;
};

export const PageState = React.forwardRef<HTMLDivElement, PageStateProps>(
	({ className, children, size = "md", ...props }, ref) => {
		return (
			<PageStateProvider size={size}>
				<div ref={ref} className={pageStateStyles({ className })} {...props}>
					{children}
				</div>
			</PageStateProvider>
		);
	}
);

PageState.displayName = "PageState";
