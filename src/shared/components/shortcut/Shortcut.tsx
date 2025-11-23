import { PropsWithChildren } from "react";
import { tv } from "tailwind-variants";
import React from "react";
import { VariantsConfig } from "@/lib/utils/variants";

export interface ShortcutVariants {
	variant?: "default" | "ghost";
}

const shortcutVariants = tv({
	base: "inline-flex h-5 items-center justify-center rounded-sm px-1 py-0.5 text-xs text-muted",
	variants: {
		variant: {
			default: "border border-secondary-border bg-secondary-bg",
			ghost: ""
		}
	} satisfies VariantsConfig<ShortcutVariants>,
	defaultVariants: {
		variant: "default"
	}
});

export type ShortcutProps = React.HTMLAttributes<HTMLDivElement> & ShortcutVariants;

export const Shortcut = React.forwardRef<HTMLDivElement, PropsWithChildren<ShortcutProps>>(
	({ className, children, variant, ...props }, ref) => {
		return (
			<div className={shortcutVariants({ className, variant })} ref={ref} {...props}>
				{children}
			</div>
		);
	}
);

Shortcut.displayName = "Shortcut";
