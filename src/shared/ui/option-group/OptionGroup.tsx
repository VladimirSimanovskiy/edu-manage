import React from "react";
import { tv } from "tailwind-variants";
import { ToggleGroup, ToggleGroupItem } from "../toggle-group/ToggleGroup";

const optionGroupStyles = tv({
	variants: { orientation: { horizontal: "flex space-x-2", vertical: "w-full flex-col space-y-2" } }
});

type OptionGroupProps = React.ComponentProps<typeof ToggleGroup>;

const OptionGroup = ({ children, className, orientation, ...props }: OptionGroupProps) => {
	const style = optionGroupStyles({ orientation, className });
	return (
		<ToggleGroup orientation={orientation} {...props} className={style}>
			{children}
		</ToggleGroup>
	);
};

const optionGroupItemStyles = tv({ base: "w-full flex-1 px-7" });

type OptionGroupItemProps = React.ComponentProps<typeof ToggleGroupItem>;

const OptionGroupItem = ({ children, className, ...props }: OptionGroupItemProps) => {
	const style = optionGroupItemStyles({ className });
	return (
		<ToggleGroupItem variant="outline" {...props} className={style}>
			{children}
		</ToggleGroupItem>
	);
};

export { OptionGroup, OptionGroupItem };
