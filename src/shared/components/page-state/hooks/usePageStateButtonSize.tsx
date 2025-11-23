import { usePageStateContext } from "../context/PageStateContext";

type ButtonSize = "md" | "lg" | "xl";

export const usePageStateButtonSize = (): ButtonSize => {
	const { size } = usePageStateContext();

	switch (size) {
		case "sm":
			return "md";
		case "lg":
			return "xl";
		default:
			return "lg";
	}
};
