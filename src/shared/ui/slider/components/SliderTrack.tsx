import { tv } from "tailwind-variants";
import * as SliderPrimitive from "@radix-ui/react-slider";
import React from "react";

export type SliderTrackProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Track>;

const slyderTrackStyles = tv({
	base: "relative grow overflow-hidden rounded-full bg-secondary-bg-hover data-[orientation=horizontal]:h-1.5 data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-1.5"
});

export const SliderTrack = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderTrackProps>(
	({ className, children, ...props }, ref) => {
		return (
			<SliderPrimitive.Track ref={ref} className={slyderTrackStyles({ className })} {...props}>
				{children}
			</SliderPrimitive.Track>
		);
	}
);

SliderTrack.displayName = SliderPrimitive.Track.displayName;
