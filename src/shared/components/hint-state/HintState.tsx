import React from "react";
import { tv } from "tailwind-variants";

const hintStateStyles = tv({
	base: "flex h-full flex-col items-center justify-center overflow-hidden bg-primary-bg px-3 py-6 text-sm text-secondary-fg"
});

export type HintStateProps = React.HTMLAttributes<HTMLDivElement>;

export const HintState = React.forwardRef<HTMLDivElement, HintStateProps>(({ className, ...props }, ref) => {
	return <div ref={ref} className={hintStateStyles({ className })} {...props} />;
});

HintState.displayName = "HintState";
