import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { HintState } from "@/components/hint-state";
import { Loader } from "@/components/loader";
import { CheckIcon } from "lucide-react";
import { useMemo, useCallback } from "react";
import { CommandItem } from "../../../command/Command";
import { Icon } from "../../../icon/Icon";
import type { LoadingState, RenderOptionProps, SearchSelectOption } from "../types";
import React from "react";

interface AsyncSearchSelectContentProps<T extends SearchSelectOption = SearchSelectOption> {
	/** Текущие опции для отображения */
	options: T[];
	/** Состояние загрузки */
	loadingState: LoadingState;
	/** Текст ошибки, если есть */
	error: string | null;
	/** Функция проверки выбранности элемента */
	isSelected?: (value: T) => boolean;
	/** Текущий поисковый запрос */
	searchQuery: string;
	/** Режим загрузки */
	loadMode: "auto" | "input";
	/** Минимальная длина запроса для режима input */
	minInputLength: number;
	/** Функция обработки выбора опции */
	onSelect: (label: string) => void;
	/** Кастомная функция рендера опции */
	renderOption?: (props: RenderOptionProps<T>) => React.ReactNode;
	/** Текст во время загрузки */
	loadingText: string;
	/** Текст при ошибке загрузки */
	errorText: string;
	/** Текст подсказки для ввода */
	inputHintText: string;
	/** Текст для пустого состояния */
	emptyText: string;
}

/**
 * Компонент для рендера содержимого AsyncSearchSelect
 *
 * Отвечает за отображение разных состояний:
 * - Загрузка
 * - Ошибка
 * - Подсказка для ввода
 * - Пустое состояние
 * - Список опций
 */
export const AsyncSearchSelectContent = <T extends SearchSelectOption = SearchSelectOption>({
	options,
	loadingState,
	error,
	isSelected,
	searchQuery,
	loadMode,
	minInputLength,
	onSelect,
	renderOption,
	loadingText,
	errorText,
	inputHintText,
	emptyText
}: AsyncSearchSelectContentProps<T>) => {
	// Мемоизируем опции с предвычисленным состоянием выбранности
	const optionsWithSelection = useMemo(() => {
		return options.map((option, index) => ({
			option,
			index,
			isSelected: isSelected?.(option) ?? false,
			isDisabled: option.disabled ?? false
		}));
	}, [options, isSelected]);

	const renderOptionItem = useCallback(
		({
			option,
			isSelected: selected,
			isDisabled: disabled,
			index
		}: {
			option: T;
			isSelected: boolean;
			isDisabled: boolean;
			index: number;
		}) => {
			if (renderOption) {
				const customRender = renderOption({
					option,
					type: "list",
					isSelected: selected,
					isDisabled: disabled,
					searchQuery,
					index
				});
				if (customRender !== undefined) {
					return customRender;
				}
			}
			return (
				<>
					{option.label}
					{selected && <Icon icon={CheckIcon} className="ml-auto" />}
				</>
			);
		},
		[renderOption, searchQuery]
	);

	// Состояние ошибки
	if (loadingState === "error") {
		return <ErrorState className="py-6">{error || errorText}</ErrorState>;
	}

	// Состояние загрузки
	if (loadingState === "loading") {
		return <Loader className="py-6">{loadingText}</Loader>;
	}

	// Подсказка для режима input
	if (loadMode === "input" && searchQuery.length < minInputLength) {
		return <HintState className="py-6">{inputHintText}</HintState>;
	}

	// Пустое состояние
	if (options.length === 0 && loadingState === "success") {
		return <EmptyState className="py-6">{emptyText}</EmptyState>;
	}

	// Список опций
	return (
		<>
			{optionsWithSelection.map(({ option, index, isSelected: selected, isDisabled: disabled }) => (
				<CommandItem
					key={option.value}
					value={option.label}
					onSelect={disabled ? undefined : onSelect}
					disabled={disabled}
				>
					{renderOptionItem({
						option,
						isSelected: selected,
						isDisabled: disabled,
						index
					})}
				</CommandItem>
			))}
		</>
	);
};
