import React from "react";
import { PropsWithChildren } from "react";
import { tv } from "tailwind-variants";
import { ProgressBarSizeVariants } from "../../ProgressBarStyles";
import { VariantsConfig } from "@/lib/utils/variants";

const progressTextVariants = tv({
	base: "text-secondary-fg",
	variants: {
		size: {
			sm: "text-xs",
			md: "text-sm",
			lg: "text-base"
		}
	} satisfies VariantsConfig<ProgressBarSizeVariants>,
	defaultVariants: {
		size: "md"
	}
});

export type ProgressTextProps = ProgressBarSizeVariants & React.HTMLAttributes<HTMLDivElement>;

export const ProgressText = React.forwardRef<HTMLDivElement, PropsWithChildren<ProgressTextProps>>(
	({ className, size, children, ...props }, ref) => {
		return (
			<span className={progressTextVariants({ className, size })} ref={ref} {...props}>
				{children}
			</span>
		);
	}
);

ProgressText.displayName = "ProgressText";
