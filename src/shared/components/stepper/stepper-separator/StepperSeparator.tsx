import { tv } from "tailwind-variants";

const stepperSeparatorStyles = tv({
	base: "m-0.5 bg-secondary-border group-data-[orientation=horizontal]/stepper:h-0.5 group-data-[orientation=vertical]/stepper:h-12 group-data-[orientation=horizontal]/stepper:w-full group-data-[orientation=vertical]/stepper:w-0.5 group-data-[orientation=horizontal]/stepper:flex-1 group-data-[state=completed]/step:bg-primary"
});

export function StepperSeparator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return <div data-slot="stepper-separator" className={stepperSeparatorStyles({ className })} {...props} />;
}
