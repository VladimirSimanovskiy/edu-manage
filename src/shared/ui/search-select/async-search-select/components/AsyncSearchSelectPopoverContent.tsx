import { useCallback, useEffect, useMemo, useState } from "react";
import { useDebounce } from "../../../../hooks/useDebounce";
import { Command, CommandList } from "../../../command/Command";
import { SearchSelectInput } from "../../search-select/components/SearchSelectInput";
import { useAsyncDataLoader } from "../hooks/useAsyncDataLoader";
import type { AsyncSearchSelectProps, SearchSelectOption } from "../types";
import { AsyncSearchSelectContent } from "./AsyncSearchSelectContent";

interface AsyncSearchSelectPopoverContentProps<T extends SearchSelectOption = SearchSelectOption>
	extends Pick<
		AsyncSearchSelectProps<T>,
		| "loadOptions"
		| "loadMode"
		| "minInputLength"
		| "debounceMs"
		| "searchPlaceholder"
		| "loadingText"
		| "errorText"
		| "inputHintText"
		| "emptyText"
		| "renderOption"
	> {
	onSelect: (value: T | null) => void;
	isSelected?: (value: T) => boolean;
}

export const AsyncSearchSelectPopoverContent = <T extends SearchSelectOption = SearchSelectOption>(
	props: AsyncSearchSelectPopoverContentProps<T>
) => {
	const {
		loadOptions,
		loadMode = "auto",
		minInputLength = 3,
		debounceMs = 300,
		searchPlaceholder = "Найти",
		loadingText = "Загружаем...",
		errorText = "Ошибка загрузки",
		inputHintText = "Введите текст для поиска",
		emptyText = "Результатов не найдено",
		renderOption,
		onSelect,
		isSelected
	} = props;

	const [searchQuery, setSearchQuery] = useState("");

	// Дебаунсированный поисковый запрос для загрузки данных
	const debouncedSearchQuery = useDebounce(searchQuery, debounceMs);

	const { options, loadingState, error, loadData } = useAsyncDataLoader<T>({
		loadOptions
	});

	const shouldLoad = useMemo(() => {
		if (loadMode === "auto") return true;
		if (loadMode === "input") return debouncedSearchQuery.length >= minInputLength;
		return false;
	}, [loadMode, debouncedSearchQuery, minInputLength]);

	// Загрузка при изменении условий
	useEffect(() => {
		if (shouldLoad) loadData(debouncedSearchQuery);
	}, [shouldLoad, debouncedSearchQuery, loadData]);

	const handleSelect = useCallback(
		(label: string) => {
			onSelect(options.find((option) => option.label === label) || null);
		},
		[onSelect, options]
	);

	return (
		<Command shouldFilter={false}>
			<SearchSelectInput placeholder={searchPlaceholder} onValueChange={setSearchQuery} />
			<CommandList key={`list-${debouncedSearchQuery}`} className="p-1">
				<AsyncSearchSelectContent
					options={options}
					loadingState={loadingState}
					error={error}
					isSelected={isSelected}
					searchQuery={debouncedSearchQuery}
					loadMode={loadMode}
					minInputLength={minInputLength}
					onSelect={handleSelect}
					renderOption={renderOption}
					loadingText={loadingText}
					errorText={errorText}
					inputHintText={inputHintText}
					emptyText={emptyText}
				/>
			</CommandList>
		</Command>
	);
};
