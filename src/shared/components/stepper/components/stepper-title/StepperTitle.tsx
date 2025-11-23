import { tv } from "tailwind-variants";

const stepperTitleStyles = tv({
	base: "text-sm font-medium text-primary-fg"
});

export function StepperTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
	return <h3 data-slot="stepper-title" className={stepperTitleStyles({ className })} {...props} />;
}
