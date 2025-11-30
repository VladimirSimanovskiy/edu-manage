import { useCallback, useState } from "react";

type UseControllableStateParams<T> = {
	/** Controlled значение */
	value?: T;
	/** Значение по умолчанию для uncontrolled режима */
	defaultValue?: T;
	/** Callback при изменении значения */
	onChange?: (value: T) => void;
};

/**
 * Универсальный хук для управления controlled/uncontrolled состоянием.
 */
export function useControllableState<T>({ value, defaultValue, onChange }: UseControllableStateParams<T>) {
	const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

	const isControlled = value !== undefined;
	const actualValue = isControlled ? value : uncontrolledValue;

	const setValue = useCallback(
		(nextValue: T | ((prevValue: T) => T)) => {
			const resolvedValue =
				typeof nextValue === "function" ? (nextValue as (prevValue: T) => T)(actualValue as T) : nextValue;

			if (!isControlled) {
				setUncontrolledValue(resolvedValue);
			}

			onChange?.(resolvedValue);
		},
		[actualValue, isControlled, onChange]
	);

	return [actualValue, setValue] as const;
}


