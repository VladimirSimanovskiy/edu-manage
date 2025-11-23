import { tv } from "tailwind-variants";
import * as SliderPrimitive from "@radix-ui/react-slider";
import React from "react";

export type SliderThumbProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Thumb>;

const slyderThumbStyles = tv({
	base: "block h-4 w-4 rounded-full border border-primary-fg bg-secondary-bg shadow-soft-base transition-colors hover:shadow-focus focus-visible:shadow-focus focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
});

export const SliderThumb = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderThumbProps>(
	({ className, ...props }, ref) => {
		return <SliderPrimitive.Thumb ref={ref} className={slyderThumbStyles({ className })} {...props} />;
	}
);

SliderThumb.displayName = SliderPrimitive.Thumb.displayName;
