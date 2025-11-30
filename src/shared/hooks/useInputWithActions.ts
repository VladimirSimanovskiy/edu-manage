import { useCallback, useMemo } from "react";
import { useControlledValue } from "./useControlledValue";
import { useCopyAction } from "./useCopyAction";
import { useAutofill } from "./useAutofill";

export interface UseInputWithActionsOptions {
	/** Значение input (для контролируемого режима) */
	value?: string | number | readonly string[];
	/** Значение по умолчанию (для неконтролируемого режима) */
	defaultValue?: string | number | readonly string[];
	/** Колбэк на изменение значения */
	onChange?: (value: string | null) => void;
	/** Флаг только для чтения */
	readOnly?: boolean;
	/** Флаг отключения */
	disabled?: boolean;
	/** Флаг для отображения кнопки очистки */
	showClearIcon?: boolean;
	/** Флаг для отображения кнопки копирования */
	showCopyIcon?: boolean;
}

/**
 * Общий хук для input с полным функционалом копирования и очистки
 */
export function useInputWithActions({
	value,
	defaultValue,
	onChange,
	readOnly,
	disabled,
	showClearIcon = false,
	showCopyIcon = false
}: UseInputWithActionsOptions) {
	const controlledValue = useControlledValue(value, defaultValue, onChange);
	const copyAction = useCopyAction();
	const { isAutofilled } = useAutofill();

	const isEditable = useMemo(() => {
		return !readOnly && !disabled;
	}, [readOnly, disabled]);

	const handleClear = useCallback(() => {
		if (value !== undefined) {
			// Controlled mode
			onChange?.("");
		} else {
			// Uncontrolled mode
			if (controlledValue.inputRef.current) {
				controlledValue.inputRef.current.value = "";
				controlledValue.inputRef.current.dispatchEvent(new Event("input", { bubbles: true }));
			}
		}
	}, [onChange, value, controlledValue.inputRef]);

	const handleCopyValue = useCallback(() => {
		copyAction.handleCopy(String(controlledValue.currentValue));
	}, [copyAction.handleCopy, controlledValue.currentValue]);

	const shouldShowClearIcon = showClearIcon && isEditable && controlledValue.currentValue;
	const shouldShowCopyIcon = showCopyIcon && controlledValue.currentValue;

	return {
		// Значения и состояние
		currentValue: controlledValue.currentValue,
		inputRef: controlledValue.inputRef,
		isEditable,

		// Обработчики
		handleChange: controlledValue.handleChange,
		handleClear,
		handleCopy: handleCopyValue,

		// Состояние копирования
		hasCopied: copyAction.hasCopied,

		// Состояние автозаполнения
		isAutofilled,

		// Флаги видимости кнопок
		shouldShowClearIcon,
		shouldShowCopyIcon
	};
}
