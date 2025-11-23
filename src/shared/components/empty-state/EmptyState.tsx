import React from "react";
import { tv } from "tailwind-variants";

export const emptyStateStyles = tv({
	base: "flex h-full flex-col items-center justify-center overflow-hidden px-3 py-6 text-sm text-secondary-fg"
});

export type EmptyStateProps = React.HTMLAttributes<HTMLDivElement>;

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(({ className, ...props }, ref) => {
	return <div ref={ref} className={emptyStateStyles({ className })} {...props} />;
});

EmptyState.displayName = "EmptyState";
