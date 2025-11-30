import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { tv } from "tailwind-variants";

export type SliderProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>;

const slyderStyles = tv({
	base: "relative flex touch-none select-none items-center data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-5 data-[orientation=vertical]:flex-col"
});

export const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
	({ className, children, ...props }, ref) => {
		return (
			<SliderPrimitive.Root ref={ref} className={slyderStyles({ className })} {...props}>
				{children}
			</SliderPrimitive.Root>
		);
	}
);

Slider.displayName = SliderPrimitive.Root.displayName;
