import { VariantsConfig } from "@/lib/utils/variants";
import { tv } from "tailwind-variants";

export interface ProgressBarSizeVariants {
	/** Размер индикатора */
	size?: "sm" | "md" | "lg";
}

export interface ProgressBarVariants extends ProgressBarSizeVariants {
	/** Индикатор неопределенного состояния прогресса */
	indeterminate?: boolean;
}

export const progressBarStyles = tv({
	slots: {
		track: "relative w-full overflow-hidden rounded-full bg-secondary-bg-hover",
		indicator: "h-full bg-primary-accent transition-transform !duration-500"
	},
	variants: {
		size: {
			sm: { track: "h-1" },
			md: { track: "h-1.5" },
			lg: { track: "h-3" }
		},
		indeterminate: {
			true: {
				indicator: "!duration-1500 absolute w-full origin-left animate-indeterminate-bar rounded-full"
			}
		}
	} satisfies VariantsConfig<ProgressBarVariants>,
	defaultVariants: {
		size: "md"
	}
});
