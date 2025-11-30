import { CommandInput } from "@/components/command/Command";
import { Command as CommandPrimitive } from "cmdk";
import React from "react";

export const SearchSelectInput = React.forwardRef<
	React.ElementRef<typeof CommandPrimitive.Input>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ placeholder = "Find", ...props }, ref) => {
	return <CommandInput ref={ref} placeholder={placeholder} {...props} />;
});

SearchSelectInput.displayName = "SearchSelectInput";
