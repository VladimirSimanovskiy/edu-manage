import * as React from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { cn } from "@/lib/utils";
import { useCarousel } from "./utils/useCarousel";
import { CarouselContext } from "./utils/CarouselContext";
import { tv } from "tailwind-variants";
import { useMergeRefs } from "@/hooks/useMergeRefs";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

export type CarouselProps = {
	opts?: CarouselOptions;
	plugins?: CarouselPlugin;
	orientation?: "horizontal" | "vertical";
	size: "xs" | "sm" | "md" | "lg" | "xl";
	setApi?: (api: CarouselApi) => void;
	disableWheelScroll?: boolean;
};

const Carousel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & CarouselProps>(
	(
		{
			orientation = "horizontal",
			size,
			opts,
			setApi,
			plugins,
			disableWheelScroll = false,
			className,
			children,
			...props
		},
		ref
	) => {
		const [carouselRef, api] = useEmblaCarousel(
			{
				...opts,
				axis: orientation === "horizontal" ? "x" : "y"
			},
			plugins
		);
		const [canScrollPrev, setCanScrollPrev] = React.useState(false);
		const [canScrollNext, setCanScrollNext] = React.useState(false);
		const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
		const internalRef = React.useRef<HTMLDivElement | null>(null);

		const mergedRef = useMergeRefs(internalRef, ref);

		const onSelect = React.useCallback((api: CarouselApi) => {
			if (!api) {
				return;
			}

			setCanScrollPrev(api.canScrollPrev());
			setCanScrollNext(api.canScrollNext());
		}, []);

		const scrollPrev = React.useCallback(() => {
			api?.scrollPrev();
		}, [api]);

		const scrollNext = React.useCallback(() => {
			api?.scrollNext();
		}, [api]);

		const handleKeyDown = React.useCallback(
			(event: React.KeyboardEvent<HTMLDivElement>) => {
				if (event.key === "ArrowLeft") {
					event.preventDefault();
					scrollPrev();
				} else if (event.key === "ArrowRight") {
					event.preventDefault();
					scrollNext();
				}
			},
			[scrollPrev, scrollNext]
		);

		const handleWheel = React.useCallback(
			(event: WheelEvent) => {
				if (event.deltaMode === 0) {
					event.preventDefault();

					if (!api || api.canScrollPrev === undefined) return;
					if (timeoutRef.current) return;

					timeoutRef.current = setTimeout(() => {
						timeoutRef.current = null;
					}, 100);

					if (orientation === "vertical") {
						if (event.deltaY > 0) scrollNext();
						else if (event.deltaY < 0) scrollPrev();
					} else {
						if (event.deltaX > 0) scrollNext();
						else if (event.deltaX < 0) scrollPrev();
					}
				}
			},
			[scrollPrev, scrollNext, orientation, api, timeoutRef]
		);

		React.useEffect(() => {
			if (!api || !setApi) {
				return;
			}

			setApi(api);
		}, [api, setApi]);

		React.useEffect(() => {
			if (!api) {
				return;
			}

			onSelect(api);
			api.on("reInit", onSelect);
			api.on("select", onSelect);

			return () => {
				api?.off("select", onSelect);
			};
		}, [api, onSelect]);

		React.useEffect(() => {
			if (disableWheelScroll) return;

			const carouselElement = internalRef.current;
			if (!carouselElement) return;

			carouselElement.addEventListener("wheel", handleWheel);

			return () => {
				carouselElement.removeEventListener("wheel", handleWheel);
			};
		}, [handleWheel, disableWheelScroll]);

		return (
			<CarouselContext.Provider
				value={{
					carouselRef,
					api: api,
					opts,
					size,
					orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
					scrollPrev,
					scrollNext,
					canScrollPrev,
					canScrollNext
				}}
			>
				<div
					ref={mergedRef}
					onKeyDownCapture={handleKeyDown}
					className={cn("relative", className)}
					role="region"
					aria-roledescription="carousel"
					{...props}
				>
					{children}
				</div>
			</CarouselContext.Provider>
		);
	}
);
Carousel.displayName = "Carousel";

const carouselContentStyles = tv({
	slots: {
		container: "flex"
	},
	variants: {
		orientation: {
			horizontal: { container: "-ml-4" },
			vertical: { container: "-mt-4 flex-col" }
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
			class: { container: "-ml-2" }
		},
		{
			orientation: "horizontal",
			size: "sm",
			class: { container: "-ml-2" }
		},
		{
			orientation: "horizontal",
			size: "md",
			class: { container: "-ml-3" }
		},
		{
			orientation: "vertical",
			size: "xs",
			class: { container: "-mt-2" }
		},
		{
			orientation: "vertical",
			size: "sm",
			class: { container: "-mt-2" }
		},
		{
			orientation: "vertical",
			size: "md",
			class: { container: "-mt-3" }
		},
		{
			orientation: "vertical",
			size: "lg",
			class: { container: "-mt-3" }
		}
	],
	defaultVariants: {
		orientation: "horizontal",
		size: "md"
	}
});

const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => {
		const { carouselRef, orientation, size } = useCarousel();
		const styles = carouselContentStyles();

		return (
			<div ref={carouselRef} className="overflow-hidden">
				<div ref={ref} className={styles.container({ className, orientation, size })} {...props} />
			</div>
		);
	}
);
CarouselContent.displayName = "CarouselContent";

export { type CarouselApi, Carousel, CarouselContent };
