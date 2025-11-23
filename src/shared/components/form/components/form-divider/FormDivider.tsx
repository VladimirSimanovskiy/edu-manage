import { Divider } from "@/components/divider";
import { DividerProps } from "@/components/divider/Divider";
import React from "react";
import { tv } from "tailwind-variants";

const formDividerStyles = tv({
	base: "mb-4 mt-4 lg:mb-3.5 lg:mt-5"
});

/**
 * Девайдер формы
 */
export const FormDivider = React.forwardRef<HTMLDivElement, DividerProps>(({ className, ...props }, ref) => {
	return <Divider ref={ref} className={formDividerStyles({ className })} {...props} />;
});

FormDivider.displayName = "FormDivider";
