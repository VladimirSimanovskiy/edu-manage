import React, { PropsWithChildren } from "react";
import { tv } from "tailwind-variants";
import { VariantsConfig } from "@/lib/utils/variants";
import { Button, ButtonProps } from "../button/Button";

export interface TriggerButtonVariants {
	variant?: "outline" | "ghost" | "text";
}

const triggerButtonVariants = tv({
	base: "",
	variants: {
		variant: {
			outline:
				"data-[state=open]:bg-alpha-97 data-[state=open]:shadow-none hover:data-[state=open]:bg-secondary-bg-hover",
			ghost: "data-[state=open]:bg-alpha-97 data-[state=open]:shadow-none hover:data-[state=open]:bg-secondary-bg-hover",
			text: "data-[state=open]:text-secondary-fg"
		}
	} satisfies VariantsConfig<TriggerButtonVariants>,
	defaultVariants: {
		variant: "outline"
	}
});

export type TriggerButtonProps = Omit<ButtonProps, "variant" | "status"> &
	TriggerButtonVariants & {
		"data-state"?: "open" | "closed";
	};

export const TriggerButton = React.forwardRef<HTMLButtonElement, PropsWithChildren<TriggerButtonProps>>(
	({ className, children, variant, ...props }, ref) => {
		return (
			<Button
				variant={variant || "outline"}
				className={triggerButtonVariants({ className, variant })}
				ref={ref}
				{...props}
			>
				{children}
			</Button>
		);
	}
);

TriggerButton.displayName = "TriggerButton";
