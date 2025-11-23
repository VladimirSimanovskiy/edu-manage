import { StepItemContext, StepState } from "@/components/stepper/components/stepper-item/StepperItemContext";
import { useStepper } from "@/components/stepper/StepperContext";
import { tv } from "tailwind-variants";

export interface StepperItemProps extends React.HTMLAttributes<HTMLDivElement> {
	step: number;
	completed?: boolean;
	disabled?: boolean;
	loading?: boolean;
}

const stepperItemStyles = tv({
	base: "group/step flex items-center group-data-[orientation=horizontal]/stepper:flex-row group-data-[orientation=vertical]/stepper:flex-col"
});

export function StepperItem({
	step,
	completed = false,
	disabled = false,
	loading = false,
	className,
	children,
	...props
}: StepperItemProps) {
	const { activeStep } = useStepper();

	const state: StepState = completed || step < activeStep ? "completed" : activeStep === step ? "active" : "inactive";

	const isLoading = loading && step === activeStep;

	return (
		<StepItemContext.Provider value={{ step, state, isDisabled: disabled, isLoading }}>
			<div
				data-slot="stepper-item"
				className={stepperItemStyles({ className })}
				data-state={state}
				{...(isLoading ? { "data-loading": true } : {})}
				{...props}
			>
				{children}
			</div>
		</StepItemContext.Provider>
	);
}
