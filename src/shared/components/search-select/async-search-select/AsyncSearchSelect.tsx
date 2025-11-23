import { useControllableState } from "@/hooks/useControllableState";
import { useCallback, useMemo, useState } from "react";
import { Popover, PopoverTrigger } from "../../popover";
import { SearchSelectTextValue } from "../components/SearchSelectTextValue";
import { SearchSelectTrigger } from "../components/SearchSelectTrigger";
import { SearchSelectContent } from "../search-select/components/SearchSelectContent";
import { AsyncSearchSelectPopoverContent } from "./components/AsyncSearchSelectPopoverContent";
import type { AsyncSearchSelectProps, SearchSelectOption } from "./types";

export const AsyncSearchSelect = <T extends SearchSelectOption = SearchSelectOption>(
	props: AsyncSearchSelectProps<T>
) => {
	const {
		renderOption,
		placeholder = "Выберите значение",
		value,
		defaultValue,
		disabled,
		invalid,
		onChange,
		startIcon,
		onClear,
		...popoverProps
	} = props;

	const [open, setOpen] = useState(false);

	const [currentOption, setCurrentOption] = useControllableState<T>({
		value,
		defaultValue,
		onChange
	});

	const displayValue = useMemo(() => {
		if (!currentOption) return undefined;
		if (renderOption) {
			const item = renderOption({ option: currentOption, type: "trigger" });
			if (item !== undefined) {
				return item;
			}
		}
		return <SearchSelectTextValue>{currentOption.label}</SearchSelectTextValue>;
	}, [currentOption, renderOption]);

	const onSelect = useCallback(
		(option: T | null) => {
			if (option) setCurrentOption(option);
			setOpen(false);
		},
		[setCurrentOption, setOpen]
	);

	const isSelected = useCallback(
		(option: T) => {
			return currentOption?.value === option.value;
		},
		[currentOption]
	);

	return (
		<Popover {...popoverProps} open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<SearchSelectTrigger
					placeholder={placeholder}
					disabled={disabled}
					invalid={invalid}
					open={open}
					startIcon={startIcon}
					onClear={onClear}
				>
					{displayValue}
				</SearchSelectTrigger>
			</PopoverTrigger>
			<SearchSelectContent>
				<AsyncSearchSelectPopoverContent {...props} onSelect={onSelect} isSelected={isSelected} />
			</SearchSelectContent>
		</Popover>
	);
};
