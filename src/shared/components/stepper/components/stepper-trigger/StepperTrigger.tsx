import { useStepItem } from "@/components/stepper/components/stepper-item/StepperItemContext";
import { useStepper } from "@/components/stepper/StepperContext";
import { Slot } from "@radix-ui/react-slot";
import { tv } from "tailwind-variants";

export interface StepperTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	asChild?: boolean;
}

const stepperTriggerStyles = tv({
	base: "inline-flex items-center gap-3 rounded-full outline-none focus-visible:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50"
});

export function StepperTrigger({ asChild = false, className, children, ...props }: StepperTriggerProps) {
	const { setActiveStep } = useStepper();
	const { step, isDisabled } = useStepItem();

	if (asChild) {
		const Comp = asChild ? Slot : "span";
		return (
			<Comp data-slot="stepper-trigger" className={className}>
				{children}
			</Comp>
		);
	}

	return (
		<button
			data-slot="stepper-trigger"
			className={stepperTriggerStyles({ className })}
			onClick={() => setActiveStep(step)}
			disabled={isDisabled}
			{...props}
		>
			{children}
		</button>
	);
}
