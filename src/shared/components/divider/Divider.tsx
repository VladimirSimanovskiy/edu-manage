import { VariantsConfig } from "@/lib/utils/variants";
import React from "react";
import { PropsWithChildren } from "react";
import { tv } from "tailwind-variants";

export interface DividerVariants {
	orientation?: "horizontal" | "vertical";
	status?: "error";
}

const dividerVariants = tv({
	variants: {
		orientation: {
			horizontal: "h-px w-full bg-secondary-border",
			vertical: "h-full w-px bg-secondary-border"
		},
		status: {
			error: "bg-status-error-border"
		}
	} satisfies VariantsConfig<DividerVariants>,
	defaultVariants: {
		orientation: "horizontal"
	}
});

export type DividerProps = DividerVariants & React.HTMLAttributes<HTMLDivElement>;

export const Divider = React.forwardRef<HTMLDivElement, PropsWithChildren<DividerProps>>(
	({ className, status, orientation, ...props }, ref) => {
		return <div className={dividerVariants({ orientation, className, status })} ref={ref} {...props} />;
	}
);

Divider.displayName = "Divider";
