import React, { useMemo } from "react";
import { tv, VariantProps } from "tailwind-variants";

const progressCircleVariants = tv({
	slots: {
		svg: "-rotate-90 transform",
		track: "fill-secondary-bg-hover",
		indicator: "fill-none stroke-current text-primary-accent transition-all duration-500 ease-out"
	},
	variants: {
		size: {
			xs: {
				svg: "h-10 w-10"
			},
			sm: {
				svg: "h-[3.75rem] w-[3.75rem]"
			},
			md: {
				svg: "h-20 w-20"
			},
			lg: {
				svg: "h-[7.5rem] w-[7.5rem]"
			},
			xl: {
				svg: "h-[11.25rem] w-[11.25rem]"
			}
		},
		isIndeterminate: {
			true: {
				indicator: "origin-center animate-spin duration-1000"
			}
		}
	},
	defaultVariants: {
		size: "md"
	}
});

export type ProgressCircleProps = VariantProps<typeof progressCircleVariants> &
	React.HTMLAttributes<SVGSVGElement> & {
		/** Максимальное значение прогресса. По умолчанию 100 */
		max?: number;
		/** Значение прогресса от 0 до max. Если не указано или null, считается равным 0 */
		value?: number | null;
		/** Индикатор неопределенного состояния прогресса */
		indeterminate?: boolean;
		/** Классы для индикатора */
		indicatorClassName?: string;
	};

export const ProgressCircle = React.forwardRef<SVGSVGElement, ProgressCircleProps>(
	({ size, max = 100, value, indeterminate = false, indicatorClassName }, ref) => {
		const styles = progressCircleVariants({ size, isIndeterminate: indeterminate });
		const currentValue = indeterminate ? null : (value ?? 0);

		const radius = 84;
		const circumference = 2 * Math.PI * radius;

		const progressData = useMemo(() => {
			if (indeterminate) {
				return {
					strokeDasharray: `${circumference * 0.25} ${circumference * 0.75}`,
					strokeDashoffset: 0,
					percentage: 0
				};
			}

			const safeMax = max <= 0 ? 100 : max;
			const safeValue = Math.max(0, Math.min(safeMax, currentValue ?? 0));
			const percentage = (safeValue / safeMax) * 100;
			const progress = (safeValue / safeMax) * circumference;
			const dashOffset = circumference - progress;

			return {
				strokeDasharray: circumference,
				strokeDashoffset: dashOffset,
				percentage: Math.round(percentage)
			};
		}, [circumference, currentValue, max, indeterminate]);

		return (
			<svg
				ref={ref}
				className={styles.svg()}
				viewBox="0 0 180 180"
				xmlns="http://www.w3.org/2000/svg"
				aria-valuenow={indeterminate ? undefined : progressData.percentage}
				aria-valuemin={0}
				aria-valuemax={100}
				data-slot="progress-circle"
			>
				<path
					d="M180 90C180 139.706 139.706 180 90 180C40.2944 180 0 139.706 0 90C0 40.2944 40.2944 0 90 0C139.706 0 180 40.2944 180 90ZM11.997 90C11.997 133.08 46.9201 168.003 90 168.003C133.80 168.003 168.003 133.08 168.003 90C168.003 46.9201 133.08 11.997 90 11.997C46.9201 11.997 11.997 46.9201 11.997 90Z"
					className={styles.track()}
				/>

				<circle
					className={styles.indicator({ className: indicatorClassName, isIndeterminate: indeterminate })}
					cx="90"
					cy="90"
					r="84"
					strokeWidth="12"
					strokeDasharray={progressData.strokeDasharray}
					strokeDashoffset={progressData.strokeDashoffset}
					strokeLinecap="round"
					data-slot="progress-circle-indicator"
				/>
			</svg>
		);
	}
);

ProgressCircle.displayName = "ProgressCircle";
