import { createContext, useContext } from "react";

type StepItemContextValue = {
	step: number;
	state: StepState;
	isDisabled: boolean;
	isLoading: boolean;
};

export type StepState = "active" | "completed" | "inactive" | "loading";

export const StepItemContext = createContext<StepItemContextValue | undefined>(undefined);

export const useStepItem = () => {
	const context = useContext(StepItemContext);
	if (!context) {
		throw new Error("useStepItem must be used within a StepperItem");
	}
	return context;
};
