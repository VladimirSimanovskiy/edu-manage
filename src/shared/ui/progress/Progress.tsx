import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { progressBarStyles, ProgressBarVariants } from "./ProgressBarStyles";
import { useMemo } from "react";

export type ProgressProps = React.ComponentProps<typeof ProgressPrimitive.Root> &
	ProgressBarVariants & {
		/** Максимальное значение прогресса. По умолчанию 100 */
		max?: number;
		/** Значение прогресса от 0 до max. Если не указано или null, считается равным 0 */
		value?: number | null;
		/** Классы для индикатора */
		indicatorClassName?: string;
		/** Функция для получения доступной текстовой метки, представляющей текущее значение в удобочитаемом формате. 
	Если не указана, метка значения будет озвучена как числовое значение в процентах от максимального значения. */
		getValueLabel?(value: number, max: number): string;
	};

export function Progress(props: ProgressProps) {
	const { className, value, max = 100, size, indicatorClassName, indeterminate, ...rest } = props;

	const styles = progressBarStyles({ size, indeterminate });
	const currentValue = indeterminate ? null : (value ?? 0);

	const indicatorStyle = useMemo(() => {
		if (indeterminate) return;

		const safeMax = max <= 0 ? 100 : max;
		const safeValue = Math.max(0, Math.min(safeMax, currentValue ?? 0));
		const percentage = (safeValue / safeMax) * 100;

		return { transform: `translateX(-${100 - percentage}%)` };
	}, [indeterminate, currentValue, max]);

	return (
		<ProgressPrimitive.Root
			data-slot="progress"
			className={styles.track({ className })}
			value={currentValue}
			max={max}
			{...rest}
		>
			<ProgressPrimitive.Indicator
				data-slot="progress-indicator"
				className={styles.indicator({ className: indicatorClassName })}
				style={indicatorStyle}
			/>
		</ProgressPrimitive.Root>
	);
}
