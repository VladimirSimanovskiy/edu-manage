import useEmblaCarousel from "embla-carousel-react";
import React from "react";
import { CarouselProps } from "../Carousel";

type CarouselContextProps = {
	carouselRef: ReturnType<typeof useEmblaCarousel>[0];
	api: ReturnType<typeof useEmblaCarousel>[1];
	scrollPrev: () => void;
	scrollNext: () => void;
	canScrollPrev: boolean;
	canScrollNext: boolean;
} & CarouselProps;

export const CarouselContext = React.createContext<CarouselContextProps | null>(null);
