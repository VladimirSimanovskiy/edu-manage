import { VariantsConfig } from "@/lib/utils/variants";
import React from "react";
import { tv } from "tailwind-variants";

export interface IndicatorVariants {
	size?: "xs" | "sm" | "md" | "lg" | "xl";
	rounded?: boolean;
}

const indicatorStyles = tv({
	base: "rounded-xs",
	variants: {
		size: {
			xs: "h-1.5 w-1.5",
			sm: "h-2 w-2",
			md: "h-2.5 w-2.5",
			lg: "h-3 w-3",
			xl: "h-3.5 w-3.5"
		},
		rounded: { true: "rounded-full" }
	} satisfies VariantsConfig<IndicatorVariants>,
	defaultVariants: {
		size: "md"
	}
});

type IndicatorProps = React.ComponentPropsWithoutRef<"div"> & IndicatorVariants;

export const Indicator = React.forwardRef<HTMLDivElement, IndicatorProps>(
	({ className, size, rounded, children, ...props }, ref) => (
		<div ref={ref} className={indicatorStyles({ className, size, rounded })} {...props}>
			{children}
		</div>
	)
);

Indicator.displayName = "Indicator";
