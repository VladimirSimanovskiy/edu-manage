import { tv } from "tailwind-variants";
import * as SliderPrimitive from "@radix-ui/react-slider";
import React from "react";

export type SliderRangeProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Range>;

const slyderRangeStyles = tv({
	base: "absolute bg-primary-accent data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
});

export const SliderRange = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderRangeProps>(
	({ className, ...props }, ref) => {
		return <SliderPrimitive.Range ref={ref} className={slyderRangeStyles(className)} {...props} />;
	}
);

SliderRange.displayName = SliderPrimitive.Range.displayName;
