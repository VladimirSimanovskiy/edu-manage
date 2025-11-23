import { Button } from "@/components/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCarousel } from "../../utils/useCarousel";
import React from "react";
import { tv } from "tailwind-variants";

const carouselButtonsStyles = tv({
	slots: {
		container: "absolute hidden h-8 w-8 rounded-full p-2 lg:flex",
		icon: "h-4 w-4",
		sr: "sr-only"
	},
	variants: {
		orientation: {
			horizontal: {},
			vertical: {}
		},
		size: {
			xs: {
				container: "h-7 w-7",
				icon: "h-3 w-3"
			},
			sm: {
				container: "h-7 w-7",
				icon: "h-3 w-3"
			},
			md: {},
			lg: {},
			xl: {}
		},
		type: {
			previous: {},
			next: {}
		}
	},
	compoundVariants: [
		{
			orientation: "horizontal",
			type: "previous",
			class: { container: "-left-12 top-1/2 -translate-y-1/2" }
		},
		{
			orientation: "vertical",
			type: "previous",
			class: { container: "-top-12 left-1/2 -translate-x-1/2 rotate-90" }
		},
		{
			orientation: "horizontal",
			type: "next",
			class: { container: "-right-12 top-1/2 -translate-y-1/2" }
		},
		{
			orientation: "vertical",
			type: "next",
			class: { container: "-bottom-12 left-1/2 -translate-x-1/2 rotate-90" }
		},
		{
			orientation: "horizontal",
			type: "previous",
			size: "xs",
			class: {
				container: "-left-9"
			}
		},
		{
			orientation: "horizontal",
			type: "previous",
			size: "sm",
			class: {
				container: "-left-9"
			}
		},
		{
			orientation: "horizontal",
			type: "previous",
			size: "md",
			class: {
				container: "-left-11"
			}
		},
		{
			orientation: "vertical",
			type: "previous",
			size: "xs",
			class: {
				container: "-top-9"
			}
		},
		{
			orientation: "vertical",
			type: "previous",
			size: "sm",
			class: {
				container: "-top-9"
			}
		},
		{
			orientation: "vertical",
			type: "previous",
			size: "md",
			class: {
				container: "-top-11"
			}
		},
		{
			orientation: "horizontal",
			size: "xs",
			type: "next",
			class: {
				container: "-right-9"
			}
		},
		{
			orientation: "horizontal",
			size: "sm",
			type: "next",
			class: {
				container: "-right-9"
			}
		},
		{
			orientation: "horizontal",
			size: "md",
			type: "next",
			class: {
				container: "-right-11"
			}
		},
		{
			orientation: "vertical",
			size: "xs",
			type: "next",
			class: {
				container: "-bottom-9"
			}
		},
		{
			orientation: "vertical",
			size: "sm",
			type: "next",
			class: {
				container: "-bottom-9"
			}
		},
		{
			orientation: "vertical",
			size: "md",
			type: "next",
			class: {
				container: "-bottom-11"
			}
		}
	]
});

const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
	({ className, variant = "outline", ...props }, ref) => {
		const { orientation, size, scrollPrev, canScrollPrev } = useCarousel();
		const styles = carouselButtonsStyles({ orientation, size, type: "previous" });

		return (
			<Button
				data-slot="carousel-previous"
				ref={ref}
				variant={variant}
				className={styles.container({ className })}
				disabled={!canScrollPrev}
				onClick={scrollPrev}
				{...props}
			>
				<ChevronLeft className={styles.icon()} />
				<span className={styles.sr()}>Previous slide</span>
			</Button>
		);
	}
);

const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
	({ className, variant = "outline", ...props }, ref) => {
		const { orientation, size, scrollNext, canScrollNext } = useCarousel();
		const styles = carouselButtonsStyles({ orientation, size, type: "next" });

		return (
			<Button
				data-slot="carousel-next"
				ref={ref}
				variant={variant}
				className={styles.container({ className })}
				disabled={!canScrollNext}
				onClick={scrollNext}
				{...props}
			>
				<ChevronRight className={styles.icon()} />
				<span className={styles.sr()}>Next slide</span>
			</Button>
		);
	}
);

CarouselNext.displayName = "CarouselNext";
CarouselPrevious.displayName = "CarouselPrevious";

export { CarouselNext, CarouselPrevious };
