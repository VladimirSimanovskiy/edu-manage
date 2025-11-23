import { VariantsConfig } from "@/lib/utils/variants";
import React, { PropsWithChildren } from "react";
import { tv } from "tailwind-variants";

export interface OverlayVariants {
	blur?: boolean;
	type?: "default" | "gradient" | "transparent";
}

export const overlayStyles = tv({
	base: "fixed inset-0 z-50 h-full w-full data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
	variants: {
		blur: {
			true: "backdrop-blur-lg"
		},
		type: {
			default: "bg-slate-950/80",
			gradient: "bg-gradient-to-b from-slate-950/50 to-slate-950/80",
			transparent: "bg-transparent"
		}
	} satisfies VariantsConfig<OverlayVariants>,
	defaultVariants: {
		type: "default"
	}
});

export type OverlayProps = OverlayVariants & {
	className?: string;
};

export const Overlay = React.forwardRef<HTMLDivElement, PropsWithChildren<OverlayProps>>(
	({ className, children, ...props }, ref) => {
		return (
			<div ref={ref} className={overlayStyles({ className, ...props })}>
				{children}
			</div>
		);
	}
);

Overlay.displayName = "Overlay";
