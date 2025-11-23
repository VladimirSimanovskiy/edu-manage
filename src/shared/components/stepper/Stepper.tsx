import * as React from "react";
import { StepperContext } from "@/components/stepper/StepperContext";
import { tv } from "tailwind-variants";

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
	defaultValue?: number;
	value?: number;
	onValueChange?: (value: number) => void;
	orientation?: "horizontal" | "vertical";
}

const stepperStyles = tv({
	base: "group/stepper inline-flex data-[orientation=horizontal]:w-full data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col"
});

export function Stepper({
	defaultValue = 0,
	value,
	onValueChange,
	orientation = "horizontal",
	className,
	...props
}: StepperProps) {
	const [activeStep, setInternalStep] = React.useState(defaultValue);

	const setActiveStep = React.useCallback(
		(step: number) => {
			if (value === undefined) {
				setInternalStep(step);
			}
			onValueChange?.(step);
		},
		[value, onValueChange]
	);

	const currentStep = value ?? activeStep;

	return (
		<StepperContext.Provider
			value={{
				activeStep: currentStep,
				setActiveStep,
				orientation
			}}
		>
			<div
				data-slot="stepper"
				className={stepperStyles({ className })}
				data-orientation={orientation}
				{...props}
			/>
		</StepperContext.Provider>
	);
}
