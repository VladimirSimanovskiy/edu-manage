import React from "react";
import { PropsWithChildren } from "react";
import { tv, VariantProps } from "tailwind-variants";

const progressCircleTitleStyles = tv({
	base: "font-semibold text-primary-fg",
	variants: {
		size: {
			xs: "text-[0.625rem] leading-4",
			sm: "text-sm",
			md: "text-base",
			lg: "text-2xl",
			xl: "text-4xl"
		}
	},
	defaultVariants: {
		size: "md"
	}
});

export type ProgressCircleTitleProps = VariantProps<typeof progressCircleTitleStyles> &
	React.HTMLAttributes<HTMLDivElement>;

export const ProgressCircleTitle = React.forwardRef<HTMLDivElement, PropsWithChildren<ProgressCircleTitleProps>>(
	({ className, size, children, ...props }, ref) => {
		return (
			<span className={progressCircleTitleStyles({ className, size })} ref={ref} {...props}>
				{children}
			</span>
		);
	}
);

ProgressCircleTitle.displayName = "ProgressCircleTitle";
