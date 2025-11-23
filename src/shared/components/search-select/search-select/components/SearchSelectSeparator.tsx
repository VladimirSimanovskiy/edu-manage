import React from "react";
import { CommandSeparator } from "@/components/command/Command";
import { ComponentPropsWithoutRef } from "react";
import { Command as CommandPrimitive } from "cmdk";

type SearchSelectSeparatorProps = ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>;

/**
 * Разделитель для SearchSelect.
 * Простая обертка вокруг CommandSeparator.
 */
export const SearchSelectSeparator = React.forwardRef<
	React.ElementRef<typeof CommandPrimitive.Separator>,
	SearchSelectSeparatorProps
>((props, ref) => {
	return <CommandSeparator ref={ref} {...props} />;
});

SearchSelectSeparator.displayName = "SearchSelectSeparator";
