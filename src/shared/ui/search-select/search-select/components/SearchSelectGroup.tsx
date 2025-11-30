import { CommandGroup } from "@/components/command/Command";
import React from "react";
import { Command as CommandPrimitive } from "cmdk";

export const SearchSelectGroup = React.forwardRef<
	React.ElementRef<typeof CommandPrimitive.Group>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ ...props }, ref) => {
	return <CommandGroup ref={ref} {...props} />;
});

SearchSelectGroup.displayName = "SearchSelectGroup";
