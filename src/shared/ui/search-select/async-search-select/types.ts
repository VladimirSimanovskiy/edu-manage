import { ComponentPropsWithoutRef } from "react";
import { SearchSelectOption } from "@/shared/hooks/useSearchSelect";
import { LoadOptionsParams, LoadOptionsResult } from "./hooks/useAsyncDataLoader";
import { Popover } from "../../popover";

/**
 * Пропсы для рендера опции в trigger (кнопке)
 */
export type RenderOptionInTriggerProps = {
	type: "trigger";
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

/**
 * Базовые пропсы от Popover компонента
 */
type PopoverProps = ComponentPropsWithoutRef<typeof Popover>;

/**
 * Пропсы для AsyncSearchSelect компонента
 */
export interface AsyncSearchSelectProps<T extends SearchSelectOption = SearchSelectOption>
	extends Omit<PopoverProps, "children"> {
	/**
	 * Функция загрузки опций с поддержкой пагинации
	 */
	loadOptions: (params: LoadOptionsParams) => Promise<LoadOptionsResult<T>>;
	/**
	 * Режим загрузки опций
	 * @default "auto"
	 */
	loadMode?: "auto" | "input";
	/**
	 * Минимальное количество символов для начала загрузки (только для режима "input")
	 * @default 3
	 */
	minInputLength?: number;
	/**
	 * Задержка перед отправкой запроса в миллисекундах (debounce)
	 * @default 300
	 */
	debounceMs?: number;
	/**
	 * Текст подсказки для режима "input", когда пользователь еще не ввел символы
	 */
	inputHintText?: string;
	/**
	 * Текст во время загрузки
	 */
	loadingText?: string;
	/**
	 * Текст при ошибке загрузки
	 */
	errorText?: string;
	/**
	 * Кастомная функция рендера опции.
	 * Используется для отображения как в trigger (type: "trigger"), так и в списке (type: "list").
	 */
	renderOption?: (props: RenderOptionProps<T>) => React.ReactNode;
	/** Текст placeholder, отображается когда ничего не выбрано */
	placeholder?: string;
	/** Текущая выбранная опция (controlled режим) */
	value?: T;
	/** Опция по умолчанию (uncontrolled режим) */
	defaultValue?: T;
	/** Callback при выборе опции */
	onChange?: (option: T | null) => void;
	/** Состояние отключения */
	disabled?: boolean;
	/** Состояние ошибки */
	invalid?: boolean;
	/** Текст placeholder для поиска */
	searchPlaceholder?: string;
	/** Текст для пустого состояния */
	emptyText?: string;
	/** Иконка, отображаемая в начале поля */
	startIcon?: React.ReactNode;
	/** Callback при очистке значения */
	onClear?: () => void;
}

// Реэкспорт основных типов для удобства
export type { SearchSelectOption, LoadOptionsParams, LoadOptionsResult };

// Реэкспорт типов из хуков
export type { LoadingState } from "./hooks/useAsyncDataLoader";
