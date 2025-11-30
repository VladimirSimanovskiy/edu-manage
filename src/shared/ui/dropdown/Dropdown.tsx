import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, CheckIcon, ChevronRight, Minus } from "lucide-react";
import * as React from "react";
import { tv } from "tailwind-variants";
import { TriggerButton } from "../button";
import { TriggerButtonProps } from "../button/trigger-button/TriggerButton";
import { usePortalContainer } from "../portal-container";
import { menuItemStyles } from "../menu-item";
import { cn } from "@/lib/utils";

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuPrimitiveRadioGroup = DropdownMenuPrimitive.RadioGroup;

// Контекст для передачи настроек от RadioGroup к RadioItem
type RadioGroupContextType = {
	/**
	 * Иконка-индикатор для отображения в выбранном элементе
	 * @default CheckIcon
	 */
	indicatorIcon?: React.ComponentType<{ className?: string }>;
	/**
	 * CSS классы для иконки-индикатора
	 */
	indicatorIconClassName?: string;
	/**
	 * Позиция иконки-индикатора относительно текста
	 * @default "start"
	 */
	indicatorIconPosition?: "start" | "end";
};

const RadioGroupContext = React.createContext<RadioGroupContextType | null>(null);

type DropdownMenuRadioGroupProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioGroup> &
	RadioGroupContextType;

const DropdownMenuRadioGroup = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.RadioGroup>,
	DropdownMenuRadioGroupProps
>(({ indicatorIcon, indicatorIconClassName, indicatorIconPosition, children, ...props }, ref) => {
	return (
		<RadioGroupContext.Provider value={{ indicatorIcon, indicatorIconClassName, indicatorIconPosition }}>
			<DropdownMenuPrimitive.RadioGroup ref={ref} {...props}>
				{children}
			</DropdownMenuPrimitive.RadioGroup>
		</RadioGroupContext.Provider>
	);
});
DropdownMenuRadioGroup.displayName = DropdownMenuPrimitive.RadioGroup.displayName;

const documentMenuSubTriggerStyles = tv({
	extend: menuItemStyles,
	base: "data-[state=open]:bg-secondary-bg-hover",
	slots: {
		chevron: "ml-auto h-4 w-4"
	},
	variants: {
		inset: {
			true: "pl-8"
		},
		theme: {
			inverse:
				"bg-inverse-primary-bg text-inverse-primary-fg hover:!bg-inverse-hover focus:bg-inverse-hover data-[state=open]:bg-inverse-hover"
		}
	},
	defaultVariants: {
		inset: false
	}
});

const DropdownMenuSubTrigger = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
		inset?: boolean;
	}
>(({ className, inset, children, ...props }, ref) => {
	const styles = documentMenuSubTriggerStyles({ inset });

	return (
		<DropdownMenuPrimitive.SubTrigger ref={ref} className={styles.base({ className })} {...props}>
			{children}
			<ChevronRight className={styles.chevron()} />
		</DropdownMenuPrimitive.SubTrigger>
	);
});
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

const documentMenuSubContentStyles = tv({
	base: [
		"relative z-50 min-w-[8rem] overflow-hidden rounded-lg border border-secondary-border bg-secondary-bg p-1 shadow-md",
		"origin-[--radix-dropdown-menu-content-transform-origin]",
		"data-[state=open]:animate-in data-[state=closed]:animate-out",
		"data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
		"data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
		"data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
		"data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
		"data-[side=left]:-top-1 data-[side=right]:-top-1"
	],
	variants: {
		theme: {
			inverse: "border-none bg-inverse-primary-bg"
		}
	}
});

const DropdownMenuSubContent = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => {
	return (
		<DropdownMenuPrimitive.SubContent
			ref={ref}
			className={documentMenuSubContentStyles({ className })}
			{...props}
		/>
	);
});
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

const dropdownMenuContentStyles = tv({
	base: [
		"group/dropdown-menu-content z-50 min-w-32 rounded-lg border border-secondary-border bg-secondary-bg p-1 shadow-md",
		"max-h-[var(--radix-dropdown-menu-content-available-height)] overflow-y-auto overflow-x-hidden",
		"origin-[--radix-dropdown-menu-content-transform-origin]",
		"data-[state=open]:animate-in data-[state=closed]:animate-out",
		"data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
		"data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
		"data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
		"data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
	],
	variants: {
		theme: {
			inverse: "border-none bg-inverse-primary-bg"
		}
	}
});

const DropdownMenuContent = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> & {
		/**
		 * Контейнер для портала. Если не указан, используется хук usePortalContainer
		 * для поиска PortalContainer
		 */
		portalContainer?: HTMLElement;
	}
>(({ className, sideOffset = 4, portalContainer, ...props }, ref) => {
	const container = usePortalContainer(portalContainer);

	return (
		<DropdownMenuPrimitive.Portal container={container}>
			<DropdownMenuPrimitive.Content
				ref={ref}
				sideOffset={sideOffset}
				className={dropdownMenuContentStyles({ className })}
				{...props}
			/>
		</DropdownMenuPrimitive.Portal>
	);
});
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const dropdownMenuItemStyles = tv({
	extend: menuItemStyles,
	base: "",
	variants: {
		inset: {
			true: "!pl-8"
		},
		theme: {
			inverse: "bg-inverse-primary-bg text-inverse-primary-fg hover:bg-inverse-hover focus:bg-inverse-hover"
		}
	}
});

const DropdownMenuItem = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
		inset?: boolean;
	}
>(({ className, disabled, inset, children, ...props }, ref) => {
	return (
		<DropdownMenuPrimitive.Item
			ref={ref}
			disabled={disabled}
			className={dropdownMenuItemStyles({ className, disabled, inset })}
			{...props}
		>
			{children}
		</DropdownMenuPrimitive.Item>
	);
});
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const dropdownMenuCheckboxItemStyles = tv({
	extend: menuItemStyles,
	base: "",
	slots: {
		checkbox: "flex h-4 w-4 items-center justify-center rounded-sm border transition-colors",
		icon: "h-3.5 w-3.5 text-primary-bg"
	},
	variants: {
		checked: {
			indeterminate: {
				checkbox: "border-primary-accent bg-primary-accent data-[disabled]:opacity-50"
			},
			true: {
				checkbox: "border-primary-accent bg-primary-accent data-[disabled]:opacity-50"
			},
			false: {
				checkbox: "border-primary-accent/50 bg-transparent"
			}
		},
		theme: {
			inverse: {
				base: "bg-inverse-primary-bg text-inverse-primary-fg hover:bg-inverse-hover focus:bg-inverse-hover",
				icon: "text-inverse-primary-bg"
			}
		}
	},
	compoundVariants: [
		{
			checked: [true, "indeterminate"],
			theme: "inverse",
			class: { checkbox: "border-inverse-primary-fg bg-inverse-primary-fg" }
		},
		{
			checked: false,
			theme: "inverse",
			class: { checkbox: "border-inverse-border bg-inverse-primary-bg" }
		}
	],
	defaultVariants: {
		checked: false
	}
});

const DropdownMenuCheckboxItem = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, disabled, ...props }, ref) => {
	const styles = dropdownMenuCheckboxItemStyles({ checked, disabled });

	return (
		<DropdownMenuPrimitive.CheckboxItem
			ref={ref}
			className={styles.base({ className })}
			checked={checked}
			disabled={disabled}
			{...props}
		>
			<span className={styles.checkbox()}>
				<DropdownMenuPrimitive.ItemIndicator>
					{checked === "indeterminate" ? (
						<Minus className={styles.icon()} />
					) : (
						<Check className={styles.icon()} />
					)}
				</DropdownMenuPrimitive.ItemIndicator>
			</span>
			{children}
		</DropdownMenuPrimitive.CheckboxItem>
	);
});

DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

const dropdownMenuRadioItemStyles = tv({
	extend: menuItemStyles,
	variants: {
		theme: {
			inverse: "bg-inverse-primary-bg text-inverse-primary-fg hover:bg-inverse-hover focus:bg-inverse-hover"
		}
	}
});

const indicatorStyles = tv({
	base: "flex h-4 w-4 items-center justify-center",
	variants: {
		position: {
			start: "",
			end: "order-last ml-auto"
		}
	}
});

const DropdownMenuRadioItem = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, disabled, ...props }, ref) => {
	const context = React.useContext(RadioGroupContext);
	const IndicatorIcon = context?.indicatorIcon || CheckIcon;
	const indicatorIconPosition = context?.indicatorIconPosition || "start";
	const indicatorIconClassName = context?.indicatorIconClassName;
	const styles = dropdownMenuRadioItemStyles({ disabled, className });

	const indicator = (
		<span className={indicatorStyles({ position: indicatorIconPosition })}>
			<DropdownMenuPrimitive.ItemIndicator>
				<IndicatorIcon className={cn("h-4 w-4", indicatorIconClassName)} />
			</DropdownMenuPrimitive.ItemIndicator>
		</span>
	);

	return (
		<DropdownMenuPrimitive.RadioItem ref={ref} className={styles} disabled={disabled} {...props}>
			{indicator}
			{children}
		</DropdownMenuPrimitive.RadioItem>
	);
});
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const dropdownMenuLabelStyles = tv({
	base: "flex items-center gap-2 px-2 py-1.5 text-sm font-semibold",
	variants: {
		inset: {
			true: "pl-8"
		},
		theme: {
			inverse: "text-inverse-muted"
		}
	},
	defaultVariants: {
		inset: false
	}
});

const DropdownMenuLabel = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.Label>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
		inset?: boolean;
	}
>(({ className, inset, ...props }, ref) => {
	return (
		<DropdownMenuPrimitive.Label ref={ref} className={dropdownMenuLabelStyles({ inset, className })} {...props} />
	);
});
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const dropdownMenuSeparatorStyles = tv({
	base: "-mx-1 my-1 h-px bg-secondary-border",
	variants: {
		theme: {
			inverse: "bg-inverse-border"
		}
	}
});

const DropdownMenuSeparator = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => {
	return (
		<DropdownMenuPrimitive.Separator ref={ref} className={dropdownMenuSeparatorStyles({ className })} {...props} />
	);
});
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const dropdownMenuShortcutStyles = tv({
	base: "ml-auto text-xs tracking-widest opacity-60",
	variants: {
		theme: {
			inverse: "text-inverse-muted opacity-100"
		}
	}
});

const DropdownMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
	return <span className={dropdownMenuShortcutStyles({ className })} {...props} />;
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

/**
 * Компонент-обертка для использования TriggerButton в качестве триггера дропдауна
 */

const DropdownMenuTriggerButton = React.forwardRef<
	React.ElementRef<typeof DropdownMenuTrigger>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuTrigger> & Omit<TriggerButtonProps, "dataState">
>(({ children, ...props }, ref) => {
	return (
		<DropdownMenuTrigger asChild ref={ref}>
			<TriggerButton {...props}>{children}</TriggerButton>
		</DropdownMenuTrigger>
	);
});
DropdownMenuTriggerButton.displayName = "DropdownMenuTriggerButton";

export {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuPrimitiveRadioGroup,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
	DropdownMenuTriggerButton
};
