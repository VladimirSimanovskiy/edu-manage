import { CheckIcon } from "lucide-react";
import { ComponentPropsWithoutRef, forwardRef, useCallback, useMemo, useState } from "react";
import { tv } from "tailwind-variants";
import { SearchSelectOption, useSearchSelect } from "@/shared/hooks/useSearchSelect";
import { Command, CommandEmpty, CommandItem, CommandList } from "../../command/Command";
import { Icon } from "../../icon/Icon";
import { Popover, PopoverTrigger } from "../../popover";
import { SearchSelectTextValue } from "../components/SearchSelectTextValue";
import { SearchSelectTrigger } from "../components/SearchSelectTrigger";
import { SearchSelectContent } from "./components/SearchSelectContent";
import { SearchSelectInput } from "./components/SearchSelectInput";

const searchSelectStyles = tv({ base: "" });

export type RenderOptionProps<T extends SearchSelectOption = SearchSelectOption> = {
	/** Отображаемая опция */
	option: T;
} & (RenderOptionInTriggerProps | RenderOptionInListProps);

export type RenderOptionInTriggerProps = {
	/** Тип рендера. Если `trigger`, то опция рендерится в триггере в качестве текущего значения компонента. */
	type: "trigger";
};

export type RenderOptionInListProps = {
	/** Тип рендера. Если `list`, то опция рендерится в списке опций. */
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

type PopoverProps = ComponentPropsWithoutRef<typeof Popover>;
export interface SearchSelectProps<T extends SearchSelectOption = SearchSelectOption>
	extends Omit<PopoverProps, "children"> {
	/** Идентификатор поля в форме. Позволяет связать компонент с полем формы. */
	id?: string;
	/** Событие blur */
	onBlur?: (e: React.FocusEvent<HTMLButtonElement>) => void;
	/** Дополнительные классы для контейнера */
	className?: string;
	/** Список опций */
	options: T[];
	/** Значение по умолчанию для выбранной опции. Используется, когда выбранная опция
	 * отсутствует в текущем списке options. Это может произойти при изменении фильтра
	 * или при использовании виртуальной (ленивой) загрузки данных.
	 * */
	valueOption?: T;
	/**
	 * Кастомная функция рендера опции.
	 * Используется для отображения как в trigger (type: "trigger"), так и в списке (type: "list").
	 */
	renderOption?: (props: RenderOptionProps<T>) => React.ReactNode;
	/** Текст placeholder, отображается когда ничего не выбрано */
	placeholder?: string;
	/** Текущее выбранное значение (controlled режим) */
	value?: T["value"];
	/** Значение по умолчанию (uncontrolled режим) */
	defaultValue?: T["value"];
	/** Callback при выборе опции */
	onChange?: (value: T["value"], option: T) => void;
	/** Callback при очистке значения */
	onClear?: () => void;
	/** Состояние отключения */
	disabled?: boolean;
	/** Состояние ошибки */
	invalid?: boolean;
	/** Текст placeholder для поиска */
	searchPlaceholder?: string;
	/** Текст для пустого состояния */
	emptyText?: string;
	/** Использовать встроенную фильтрацию cmdk. По умолчанию true */
	shouldFilter?: boolean;
	/** Контент, отображаемый в конце списка (например, для триггера загрузки) */
	footerContent?: React.ReactNode;
	/** Callback при изменении поискового запроса */
	onSearchChange?: (value: string) => void;
	/** Callback при изменении состояния открытия */
	onOpenChange?: (open: boolean) => void;
	/** Иконка, отображаемая в начале поля */
	startIcon?: React.ReactNode;
}

export const SearchSelect = forwardRef(
	<T extends SearchSelectOption = SearchSelectOption>(
		props: SearchSelectProps<T>,
		ref: React.ForwardedRef<HTMLButtonElement>
	) => {
		const {
			id,
			className,
			options,
			valueOption,
			renderOption,
			placeholder = "Выберите значение",
			value,
			defaultValue,
			onBlur,
			onChange,
			onClear,
			disabled,
			invalid,
			searchPlaceholder = "Найти",
			emptyText = "Результатов не найдено",
			shouldFilter = true,
			footerContent,
			onSearchChange,
			onOpenChange,
			startIcon,
			...popoverProps
		} = props;

		const [open, setOpen] = useState(false);
		const [searchQuery, setSearchQuery] = useState("");

		const { selectedValue, selectedOption, setSelectedByLabel } = useSearchSelect({
			options,
			value,
			defaultValue,
			valueOption,
			onChange
		});

		const handleSelect = useCallback(
			(label: string) => {
				setSelectedByLabel(label);
				setOpen(false);
			},
			[setSelectedByLabel, setOpen]
		);

		const handleSearchChange = useCallback(
			(value: string) => {
				setSearchQuery(value);
				onSearchChange?.(value);
			},
			[onSearchChange]
		);

		const handleOpenChange = useCallback(
			(open: boolean) => {
				setOpen(open);
				onOpenChange?.(open);
			},
			[onOpenChange]
		);

		const displayValue = useMemo(() => {
			if (!selectedOption) return undefined;
			if (renderOption) {
				const item = renderOption({ option: selectedOption, type: "trigger" });
				if (item !== undefined) {
					return item;
				}
			}
			return <SearchSelectTextValue>{selectedOption.label}</SearchSelectTextValue>;
		}, [selectedOption, renderOption]);

		const renderedOptions = useMemo(() => {
			return options.map((option, index) => {
				const isDisabled = option.disabled ?? false;
				const isSelected = selectedValue === option.value;

				const renderOptionItem = () => {
					if (renderOption) {
						const customRender = renderOption({
							option,
							type: "list",
							isSelected,
							isDisabled,
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
							{isSelected && <Icon icon={CheckIcon} className="ml-auto" />}
						</>
					);
				};

				return (
					<CommandItem
						key={option.value}
						value={option.label}
						onSelect={isDisabled ? undefined : handleSelect}
						disabled={isDisabled}
					>
						{renderOptionItem()}
					</CommandItem>
				);
			});
		}, [options, selectedValue, handleSelect, renderOption, searchQuery]);

		return (
			<Popover {...popoverProps} open={open} onOpenChange={handleOpenChange}>
				<div className={searchSelectStyles({ className })}>
					<PopoverTrigger asChild>
						<SearchSelectTrigger
							onClear={onClear}
							disabled={disabled}
							invalid={invalid}
							open={open}
							placeholder={placeholder}
							id={id}
							onBlur={onBlur}
							ref={ref}
							startIcon={startIcon}
						>
							{displayValue}
						</SearchSelectTrigger>
					</PopoverTrigger>
					<SearchSelectContent>
						<Command shouldFilter={shouldFilter}>
							<SearchSelectInput placeholder={searchPlaceholder} onValueChange={handleSearchChange} />
							<CommandList key={`list-${searchQuery}`} className="p-1">
								{renderedOptions}
								<CommandEmpty>{emptyText}</CommandEmpty>
								{footerContent}
							</CommandList>
						</Command>
					</SearchSelectContent>
				</div>
			</Popover>
		);
	}
) as (<T extends SearchSelectOption = SearchSelectOption>(
	props: SearchSelectProps<T> & { ref?: React.ForwardedRef<HTMLButtonElement> }
) => React.ReactElement) & { displayName?: string };

SearchSelect.displayName = "SearchSelect";
