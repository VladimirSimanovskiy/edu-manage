import { useCallback, useState, useEffect } from "react";
import { useControllableState } from "./useControllableState";

export interface SearchSelectOption {
	/** Уникальный идентификатор опции */
	value: string | number;
	/** Отображаемый текст */
	label: string;
	/** Состояние отключения опции */
	disabled?: boolean;
}

interface UseSearchSelectProps<T extends SearchSelectOption = SearchSelectOption> {
	/** Список опций */
	options: T[];
	/** Текущее выбранное значение (controlled режим) */
	value?: T["value"];
	/** Значение по умолчанию (uncontrolled режим) */
	defaultValue?: T["value"];
	/** Callback при выборе опции */
	onChange?: (value: T["value"], option: T) => void;
	/**
	 * Значение по умолчанию для выбранной опции. Используется, когда выбранная опция
	 * отсутствует в текущем списке options. Это может произойти при изменении фильтра
	 * или при использовании виртуальной (ленивой) загрузки данных.
	 * */
	valueOption?: T;
}

export const useSearchSelect = <T extends SearchSelectOption = SearchSelectOption>({
	options,
	value,
	defaultValue,
	onChange,
	valueOption
}: UseSearchSelectProps<T>) => {
	// Сохраняем выбранную опцию отдельно, чтобы она не терялась при фильтрации
	const [selectedOption, setSelectedOption] = useState<T | undefined>(undefined);

	const memoizedOnChange = useCallback(
		(newValue: T["value"] | undefined) => {
			if (newValue !== undefined) {
				const option = options.find((option) => option.value === newValue) || selectedOption;
				if (option && option.value === newValue) {
					setSelectedOption(option);
					onChange?.(newValue, option);
				}
			}
		},
		[onChange, options, selectedOption]
	);

	const [selectedValue, setSelectedValue] = useControllableState<T["value"] | undefined>({
		value,
		defaultValue,
		onChange: memoizedOnChange
	});

	// Синхронизируем selectedOption с selectedValue при изменении selectedValue или options
	useEffect(() => {
		if (selectedValue !== undefined) {
			// Если selectedOption уже соответствует selectedValue, ничего не делаем
			if (selectedOption && selectedOption.value === selectedValue) {
				return;
			}

			// Ищем опцию в текущих options
			const currentOption = options.find((option) => option.value === selectedValue);
			if (currentOption) {
				setSelectedOption(currentOption);
			} else if (valueOption && valueOption.value === selectedValue) {
				setSelectedOption(valueOption);
			}
		} else {
			setSelectedOption(undefined);
		}
	}, [selectedValue, options, selectedOption, valueOption]);

	const setSelectedByLabel = useCallback(
		(label: string) => {
			// CommandItem работает с label, а не с value, поэтому нужно найти опцию по label
			const option = options.find((option) => option.label === label);
			if (option) {
				setSelectedValue(option.value);
			}
		},
		[setSelectedValue, options]
	);

	return {
		selectedValue,
		selectedOption,
		setSelectedByLabel,
		setSelectedValue
	};
};


