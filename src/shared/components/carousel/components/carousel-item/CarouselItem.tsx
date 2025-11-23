import React from "react";
import { useCarousel } from "../../utils/useCarousel";
import { tv } from "tailwind-variants";

const carouselItemStyles = tv({
	base: "aspect-square min-w-0 shrink-0 grow-0",
	variants: {
		orientation: {
			horizontal: "ml-4",
			vertical: "mt-4"
		},
		size: {
			xs: {},
			sm: {},
			md: {},
			lg: {},
			xl: {}
		}
	},
	compoundVariants: [
		{
			orientation: "horizontal",
			size: "xs",
			class: "ml-2 w-[3.75rem]"
		},
		{
			orientation: "horizontal",
			size: "sm",
			class: "ml-2 w-20"
		},
		{
			orientation: "horizontal",
			size: "md",
			class: "ml-3 w-[7.5rem]"
		},
		{
			orientation: "horizontal",
			size: "lg",
			class: "w-[11.5rem]"
		},
		{
			orientation: "horizontal",
			size: "xl",
			class: "w-96"
		},
		{
			orientation: "vertical",
			size: "xs",
			class: "mt-2 h-[3.75rem]"
		},
		{
			orientation: "vertical",
			size: "sm",
			class: "mt-2 h-20"
		},
		{
			orientation: "vertical",
			size: "md",
			class: "mt-3 h-[7.5rem]"
		},
		{
			orientation: "vertical",
			size: "lg",
			class: "mt-3 h-[5.5rem] w-80"
		},
		{
			orientation: "vertical",
			size: "xl",
			class: "h-96"
		}
	],
	defaultVariants: {
		orientation: "horizontal",
		size: "md"
	}
});

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => {
		const { orientation, size } = useCarousel();

		return (
			<div
				ref={ref}
				role="group"
				aria-roledescription="slide"
				data-slot="carousel-item"
				className={carouselItemStyles({ className, orientation, size })}
				{...props}
			/>
		);
	}
);
CarouselItem.displayName = "CarouselItem";

export { CarouselItem };
