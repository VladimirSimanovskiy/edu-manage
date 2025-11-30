import { useControllableState } from "@/hooks/useControllableState";
import { useItemsKeyboardNavigation } from "@/hooks/useItemsKeyboardNavigation";
import { PopoverProps } from "@radix-ui/react-popover";
import { useCallback, useMemo, useState } from "react";
import { SearchSelectOption } from "@/shared/hooks/useSearchSelect";
import { Popover, PopoverTrigger } from "../../popover";
import { AsyncSearchSelectPopoverContent } from "../async-search-select/components/AsyncSearchSelectPopoverContent";
import { LoadOptionsParams, LoadOptionsResult } from "../async-search-select/types";
import { SearchSelectTag } from "../components/SearchSelectTag";
import { SearchSelectTrigger } from "../components/SearchSelectTrigger";
import { SearchSelectContent } from "../search-select/components/SearchSelectContent";

/**
 * Пропсы для рендера опции в trigger (кнопке)
 */
export type RenderOptionInTriggerProps = {
	type: "trigger";
	onClose?: () => void;
};

/**
 * Пропсы для рендера опции в списке
 */
export type RenderOptionInListProps = {
	type: "list";
	/** Выбрана ли опция в данный момент */
	isSelected: boolean;
	/** Отключена ли опция */
	isDisabled: boolean;
	/** Текущий поисковый запрос для подсветки совпадений */
	searchQuery: string;
	/** Индекс элемента в списке */
	index: number;
};

/**
 * Объединенный тип для рендера опции
 */
export type RenderOptionProps<T extends SearchSelectOption = SearchSelectOption> = {
	option: T;
} & (RenderOptionInTriggerProps | RenderOptionInListProps);

export interface MultiSelectProps<T extends SearchSelectOption = SearchSelectOption> {
	/** Дополнительные классы для контейнера */
	className?: string;
	/** Флаг для отключения компонента */
	disabled?: boolean;
	/** Текст placeholder, отображается когда ничего не выбрано */
	placeholder?: string;
	/** Текущие выбранные опции (controlled режим) */
	value?: T[];
	/** Опции по умолчанию (uncontrolled режим) */
	defaultValue?: T[];
	/** Callback при изменении выбранных опций */
	onChange?: (options: T[]) => void;
	/** Callback при очистке значения */
	onClear?: () => void;
	/** Оставлять поповер открытым после выбора элемента */
	keepOpenOnSelect?: boolean;
	/** Обработчик клика по названию выбранного тега */
	onLabelClick?: (option: T) => void;
	/** Функция загрузки опций */
	loadOptions: (params: LoadOptionsParams) => Promise<LoadOptionsResult<T>>;
	/** Режим загрузки опций */
	loadMode?: "auto" | "input";
	/** Минимальное количество символов для начала загрузки (только для режима "input") */
	minInputLength?: number;
	/** Задержка перед отправкой запроса в миллисекундах (debounce) */
	debounceMs?: number;
	/** Текст подсказки для режима "input", когда пользователь еще не ввел символы */
	inputHintText?: string;
	/** Текст во время загрузки */
	loadingText?: string;
	/** Текст при ошибке загрузки */
	errorText?: string;
	/** Кастомная функция рендера опции */
	renderOption?: (props: RenderOptionProps<T>) => React.ReactNode;
	/** Текст placeholder для поиска */
	searchPlaceholder?: string;
	/** Текст для пустого состояния */
	emptyText?: string;
	/** Дополнительные пропсы для Popover */
	popoverProps?: PopoverProps;
	/** Состояние ошибки */
	invalid?: boolean;
	/** Иконка, отображаемая в начале поля */
	startIcon?: React.ReactNode;
}

/**
 * Компонент для множественного выбора элементов из списка
 */
export const MultiSelect = <T extends SearchSelectOption = SearchSelectOption>(props: MultiSelectProps<T>) => {
	const {
		className,
		placeholder = "Выберите значение",
		value,
		defaultValue,
		onChange,
		disabled,
		invalid,
		keepOpenOnSelect = true,
		onClear,
		onLabelClick,
		renderOption,
		startIcon,
		...popoverProps
	} = props;

	const [open, setOpen] = useState(false);

	const [selectedOptions, setSelectedOptions] = useControllableState<T[]>({
		value,
		defaultValue,
		onChange
	});

	const onSelect = useCallback(
		(option: T | null) => {
			if (option) {
				const isAlreadySelected = selectedOptions?.find((o) => o.value === option.value);
				if (isAlreadySelected) {
					setSelectedOptions((prev) => {
						return prev?.filter((o) => o.value !== option.value) || [];
					});
				} else {
					setSelectedOptions((prev) => {
						return [...(prev || []), option];
					});
				}
			}
			if (!keepOpenOnSelect) {
				setOpen(false);
			}
		},
		[selectedOptions, keepOpenOnSelect, setSelectedOptions, setOpen]
	);

	const handleClose = useCallback(
		(option: T) => {
			const isSelected = selectedOptions?.find((o) => o.value === option.value);
			if (isSelected) {
				setSelectedOptions((prev) => {
					return prev?.filter((o) => o.value !== option.value) || [];
				});
			}
		},
		[selectedOptions, setSelectedOptions]
	);

	const isSelected = useCallback(
		(option: T) => {
			return selectedOptions?.some((selectedOption) => selectedOption.value === option.value) ?? false;
		},
		[selectedOptions]
	);

	const { handleKeyDown, isFocused } = useItemsKeyboardNavigation({
		items: selectedOptions || [],
		onEnter: onLabelClick,
		onDelete: handleClose
	});

	const displayValue = useMemo(() => {
		if (!selectedOptions || selectedOptions.length === 0) return undefined;

		return selectedOptions.map((option, index) => {
			if (renderOption) {
				const item = renderOption({
					option,
					type: "trigger",
					onClose: () => {
						handleClose(option);
					}
				});
				if (item !== undefined) {
					return item;
				}
			}
			return (
				<SearchSelectTag
					key={option.value}
					onLabelClick={(e) => {
						e.preventDefault();
						onLabelClick?.(option);
					}}
					onClose={(e) => {
						e.preventDefault();
						handleClose(option);
					}}
					isFocused={isFocused(index)}
				>
					{option.label}
				</SearchSelectTag>
			);
		});
	}, [selectedOptions, renderOption, handleClose, onLabelClick, isFocused]);

	return (
		<div className={className}>
			<Popover open={open} onOpenChange={setOpen} {...popoverProps}>
				<PopoverTrigger asChild>
					<SearchSelectTrigger
						onKeyDown={handleKeyDown}
						disabled={disabled}
						open={open}
						placeholder={placeholder}
						invalid={invalid}
						startIcon={startIcon}
						onClear={onClear}
						className="h-auto !py-[0.3125rem] lg:h-auto"
					>
						{displayValue && <div className="flex flex-wrap gap-1.5 lg:gap-1">{displayValue}</div>}
					</SearchSelectTrigger>
				</PopoverTrigger>
				<SearchSelectContent>
					<AsyncSearchSelectPopoverContent {...props} onSelect={onSelect} isSelected={isSelected} />
				</SearchSelectContent>
			</Popover>
		</div>
	);
};

MultiSelect.displayName = "MultiSelect";
