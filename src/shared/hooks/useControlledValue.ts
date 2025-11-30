import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Хук для управления контролируемым и неконтролируемым состоянием
 */
export function useControlledValue(
	value: string | number | readonly string[] | undefined,
	defaultValue: string | number | readonly string[] | undefined,
	onChange?: (value: string | null) => void
) {
	const [uncontrolledValue, setUncontrolledValue] = useState(
		typeof defaultValue === "string" ? defaultValue : String(defaultValue ?? "")
	);
	const inputRef = useRef<HTMLInputElement>(null);

	// Добавляем обработчик для отслеживания изменений в uncontrolled режиме
	useEffect(() => {
		if (value !== undefined) return;

		const input = inputRef.current;
		if (!input) return;

		const handleInput = () => {
			setUncontrolledValue(input.value);
		};

		input.addEventListener("input", handleInput);
		return () => input.removeEventListener("input", handleInput);
	}, [value, inputRef]);

	const getCurrentValue = useCallback(() => {
		if (value !== undefined) return String(value);
		return uncontrolledValue;
	}, [value, uncontrolledValue]);

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			onChange?.(e.target.value);
		},
		[onChange]
	);

	return {
		inputRef,
		getCurrentValue,
		handleChange,
		currentValue: getCurrentValue()
	};
}


