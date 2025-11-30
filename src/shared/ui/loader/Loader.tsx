import React from "react";
import { tv } from "tailwind-variants";
import { Icon } from "../icon/Icon";
import { LoaderCircle } from "lucide-react";
import { VariantsConfig } from "@/lib/utils/variants";

export interface LoaderVariants {
	size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
}

const loaderStyles = tv({
	base: "flex flex-col items-center justify-center gap-2 overflow-hidden px-3 text-primary-fg",
	slots: {
		icon: "",
		iconWrapper: "animate-spin"
	},
	variants: {
		size: {
			xs: {
				icon: "h-3 w-3",
				base: "text-xs"
			},
			sm: {
				icon: "h-3.5 w-3.5",
				base: "text-xs"
			},
			md: {
				icon: "h-4 w-4",
				base: "text-sm"
			},
			lg: {
				icon: "h-6 w-6",
				base: "text-sm"
			},
			xl: {
				icon: "h-8 w-8",
				base: "text-base"
			},
			"2xl": {
				icon: "h-10 w-10",
				base: "text-xl"
			},
			"3xl": {
				icon: "h-12 w-12",
				base: "text-xl"
			}
		}
	} satisfies VariantsConfig<LoaderVariants>,
	defaultVariants: {
		size: "md"
	}
});

export type LoaderProps = React.HTMLAttributes<HTMLDivElement> & LoaderVariants;

export const Loader = React.forwardRef<HTMLDivElement, LoaderProps>(({ className, size, children, ...props }, ref) => {
	const styles = loaderStyles({ size });
	return (
		<div ref={ref} className={styles.base({ className })} {...props}>
			<div className={styles.iconWrapper()}>
				<Icon icon={LoaderCircle} className={styles.icon()} />
			</div>
			{children}
		</div>
	);
});

Loader.displayName = "Loader";
