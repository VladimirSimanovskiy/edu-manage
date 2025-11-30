import { Icon } from "@/components/icon/Icon";
import { selectTriggerStyles } from "@/components/select/Select";
import { ChevronDownIcon } from "lucide-react";
import React from "react";
import { tv } from "tailwind-variants";
import { SearchSelectPlaceholder } from "./SearchSelectPlaceholder";
import { ClearButton } from "@/components/input/components/clear-button/ClearButton";

const searchSelectTriggerStyles = tv({
	extend: selectTriggerStyles,
	base: "group/search-select-trigger min-h-10 items-center py-1.5 pl-1.5 pr-3 lg:min-h-9 lg:py-1.5 lg:pl-1.5 lg:pr-2.5",
	slots: {
		buttonWrapper: "ml-auto flex gap-2",
		iconWrapper: "min-h-[1.375rem]",
		startIcon: "flex min-h-[1.375rem] items-center pl-1 pr-0.5 text-muted",
		clearButton: "h-auto p-0"
	}
});

interface SearchSelectTriggerProps extends React.ComponentPropsWithoutRef<"button"> {
	/** Состояние отключения */
	disabled?: boolean;
	/** Состояние ошибки */
	invalid?: boolean;
	/** Текст placeholder */
	placeholder?: string;
	/** Состояние открытия. Используется для проставления accessibility аттрибутов */
	open?: boolean;
	/** Иконка, отображаемая в начале текстового поля */
	startIcon?: React.ReactNode;
	/** Callback при очистке значения */
	onClear?: () => void;
}

/**
 * Компонент отображения триггера для SearchSelect.
 * Выполняет роль кнопки, которая открывает Popover с опциями.
 * Может отображать значение или placeholder в зависимости от наличия дочерних элементов.
 * Не содержит сам триггер, а только стилизует кнопку.
 */
export const SearchSelectTrigger = React.forwardRef<HTMLButtonElement, SearchSelectTriggerProps>(
	({ className, children, disabled, open, invalid, placeholder, startIcon, onClear, ...props }, ref) => {
		const styles = searchSelectTriggerStyles({ disabled, invalid });

		return (
			<button
				{...props}
				disabled={disabled}
				className={styles.base({ className })}
				ref={ref}
				role="combobox"
				aria-expanded={open}
				aria-invalid={invalid}
				aria-haspopup="listbox"
			>
				{startIcon && <div className={styles.startIcon()}>{startIcon}</div>}
				{children !== undefined ? children : <SearchSelectPlaceholder>{placeholder}</SearchSelectPlaceholder>}
				<div className={styles.buttonWrapper()}>
					{onClear && (
						<div className={styles.iconWrapper()}>
							<ClearButton
								className={styles.clearButton()}
								onClear={onClear}
								onPointerDown={(e) => {
									e.stopPropagation();
									e.preventDefault();
								}}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										onClear();
										e.stopPropagation();
										e.preventDefault();
									}
								}}
							/>
						</div>
					)}
					{!disabled && (
						<div className={styles.iconWrapper()}>
							<Icon icon={ChevronDownIcon} className={styles.icon()} />
						</div>
					)}
				</div>
			</button>
		);
	}
);

SearchSelectTrigger.displayName = "SearchSelectTrigger";
