import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { tv } from "tailwind-variants";

export type RadioGroupProps = React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>;

const radioGroupStyles = tv({
	base: "grid gap-2"
});

export const RadioGroup = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Root>, RadioGroupProps>(
	({ className, ...props }, ref) => {
		return <RadioGroupPrimitive.Root className={radioGroupStyles({ className })} {...props} ref={ref} />;
	}
);

RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;
