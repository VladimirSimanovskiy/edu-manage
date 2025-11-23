import React from "react";
import { tv } from "tailwind-variants";

const errorStateStyles = tv({
	base: "flex h-full items-center justify-center overflow-hidden px-3 py-6 text-sm text-status-error"
});

export type ErrorStateProps = React.HTMLAttributes<HTMLDivElement>;

export const ErrorState = React.forwardRef<HTMLDivElement, ErrorStateProps>(({ className, ...props }, ref) => {
	return <div ref={ref} className={errorStateStyles({ className })} {...props} />;
});

ErrorState.displayName = "ErrorState";
