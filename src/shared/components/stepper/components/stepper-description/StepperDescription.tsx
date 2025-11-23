import { tv } from "tailwind-variants";

const stepperDescriptionStyles = tv({
	base: "text-sm text-muted"
});

export function StepperDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
	return <p data-slot="stepper-description" className={stepperDescriptionStyles({ className })} {...props} />;
}
