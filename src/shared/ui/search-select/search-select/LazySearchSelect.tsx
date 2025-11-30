import { forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import { SearchSelect, SearchSelectProps } from "./SearchSelect";
import { SearchSelectOption } from "@/shared/hooks/useSearchSelect";
import { LoadMoreTrigger } from "./components/LoadMoreTrigger";
import { defaultFuzzyFilter, FilterFunction } from "./utils/fuzzyFilter";

export interface LazySearchSelectProps<T extends SearchSelectOption = SearchSelectOption>
	extends Omit<
		SearchSelectProps<T>,
		"options" | "shouldFilter" | "footerContent" | "onSearchChange" | "valueOption"
	> {
	/** Полный список опций */
	options: T[];
	/** Количество элементов на странице */
	pageSize?: number;
	/** Кастомная функция фильтрации. По умолчанию используется встроенный fuzzy search */
	filter?: FilterFunction;
}

export const LazySearchSelect = forwardRef<HTMLButtonElement, LazySearchSelectProps>(
	<T extends SearchSelectOption = SearchSelectOption>(
		props: LazySearchSelectProps<T>,
		ref: React.ForwardedRef<HTMLButtonElement>
	) => {
		const {
			options,
			pageSize = 50,
			filter = defaultFuzzyFilter,
			defaultValue,
			value,
			...searchSelectProps
		} = props;

		const [visibleCount, setVisibleCount] = useState(pageSize);
		const [searchQuery, setSearchQuery] = useState("");
		const [valueOption, setValueOption] = useState<T | undefined>(undefined);

		// При изменении поиска сбрасываем счетчик видимых элементов
		useEffect(() => setVisibleCount(pageSize), [searchQuery, pageSize]);

		useEffect(() => {
			const currentValue = value || defaultValue;
			if (currentValue && !valueOption) {
				setValueOption(options.find((option) => option.value === currentValue));
			}
		}, [defaultValue, value, options, valueOption]);

		// Фильтрация и ограничение элементов
		const { visibleOptions, hasMoreItems } = useMemo(() => {
			// Сначала фильтруем и ранжируем по поисковому запросу
			const filteredAndRanked = searchQuery
				? options
						.map((option) => ({
							option,
							score: filter(option.label, searchQuery)
						}))
						.filter(({ score }) => score > 0) // Убираем элементы с нулевым скором
						.sort((a, b) => b.score - a.score) // Сортируем по убыванию скора
						.map(({ option }) => option)
				: options;

			// Затем ограничиваем количество видимых элементов
			const visible = filteredAndRanked.slice(0, visibleCount);
			const hasMore = visibleCount < filteredAndRanked.length;

			return {
				visibleOptions: visible,
				hasMoreItems: hasMore
			};
		}, [options, searchQuery, visibleCount, filter]);

		// Обработчик загрузки следующей порции
		const handleLoadMore = useCallback(() => {
			setVisibleCount((prev) => prev + pageSize);
		}, [pageSize]);

		const handleSearchChange = useCallback((value: string) => {
			setSearchQuery(value);
		}, []);

		// Сброс поиска при открытии
		const handleOpenChange = useCallback(
			(open: boolean) => {
				if (open && searchQuery) setSearchQuery("");
			},
			[searchQuery, setSearchQuery]
		);

		return (
			<SearchSelect<T>
				{...searchSelectProps}
				ref={ref}
				options={visibleOptions}
				value={value}
				defaultValue={defaultValue}
				valueOption={valueOption}
				shouldFilter={false}
				footerContent={<LoadMoreTrigger onLoad={handleLoadMore} hasMore={hasMoreItems} />}
				onSearchChange={handleSearchChange}
				onOpenChange={handleOpenChange}
			/>
		);
	}
) as (<T extends SearchSelectOption = SearchSelectOption>(
	props: LazySearchSelectProps<T> & { ref?: React.ForwardedRef<HTMLButtonElement> }
) => React.ReactElement) & { displayName?: string };

LazySearchSelect.displayName = "LazySearchSelect";
