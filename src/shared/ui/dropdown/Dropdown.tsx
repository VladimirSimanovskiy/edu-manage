import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import React from "react";
import { TriggerButton } from "../button";
import type { TriggerButtonProps } from "../button/trigger-button/TriggerButton";

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

export const DropdownMenuLabel = DropdownMenuPrimitive.Label;
export const DropdownMenuSeparator = DropdownMenuPrimitive.Separator;

export const DropdownMenuItem = DropdownMenuPrimitive.Item;
export const DropdownMenuCheckboxItem = DropdownMenuPrimitive.CheckboxItem;
export const DropdownMenuRadioItem = DropdownMenuPrimitive.RadioItem;

type DropdownMenuContentProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>;

export const DropdownMenuContent = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.Content>,
	DropdownMenuContentProps
>(({ className, sideOffset = 4, ...props }, ref) => {
	return (
		<DropdownMenuPrimitive.Portal>
			<DropdownMenuPrimitive.Content ref={ref} sideOffset={sideOffset} className={className} {...props} />
		</DropdownMenuPrimitive.Portal>
	);
});

DropdownMenuContent.displayName = "DropdownMenuContent";

type DropdownMenuTriggerButtonProps = TriggerButtonProps &
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger>;

export const DropdownMenuTriggerButton = React.forwardRef<HTMLButtonElement, DropdownMenuTriggerButtonProps>(
	({ children, ...props }, ref) => {
		return (
			<DropdownMenuPrimitive.Trigger asChild {...props}>
				<TriggerButton ref={ref}>{children}</TriggerButton>
			</DropdownMenuPrimitive.Trigger>
		);
	}
);

DropdownMenuTriggerButton.displayName = "DropdownMenuTriggerButton";
