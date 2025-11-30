import { useMediaQuery } from "@react-hook/media-query";

// Брейкпоинты Tailwind CSS
const breakpoints = {
	sm: "640px",
	md: "768px",
	lg: "1024px",
	xl: "1280px",
	"2xl": "1536px"
} as const;

type Breakpoint = keyof typeof breakpoints;

/** min-width: 640px */
export const useIsSm = () => useMediaQuery(`(min-width: ${breakpoints.sm})`);
/** min-width: 768px */
export const useIsMd = () => useMediaQuery(`(min-width: ${breakpoints.md})`);
/** min-width: 1024px */
export const useIsLg = () => useMediaQuery(`(min-width: ${breakpoints.lg})`);
/** min-width: 1280px */
export const useIsXl = () => useMediaQuery(`(min-width: ${breakpoints.xl})`);
/** min-width: 1536px */
export const useIs2Xl = () => useMediaQuery(`(min-width: ${breakpoints["2xl"]})`);

/** max-width: 1024px */
export const useIsMobile = () => !useIsLg();

export const useBreakpoint = (breakpoint: Breakpoint) => {
	return useMediaQuery(`(min-width: ${breakpoints[breakpoint]})`);
};

export const useActiveBreakpoint = (): Breakpoint | null => {
	const is2Xl = useIs2Xl();
	const isXl = useIsXl();
	const isLg = useIsLg();
	const isMd = useIsMd();
	const isSm = useIsSm();

	if (is2Xl) return "2xl";
	if (isXl) return "xl";
	if (isLg) return "lg";
	if (isMd) return "md";
	if (isSm) return "sm";
	return null;
};
