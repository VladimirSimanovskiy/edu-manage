import { createContext, useContext } from "react";

type StepperContextValue = {
	activeStep: number;
	setActiveStep: (step: number) => void;
	orientation: "horizontal" | "vertical";
};

export const StepperContext = createContext<StepperContextValue | undefined>(undefined);

export const useStepper = () => {
	const context = useContext(StepperContext);
	if (!context) {
		throw new Error("useStepper must be used within a Stepper");
	}
	return context;
};
