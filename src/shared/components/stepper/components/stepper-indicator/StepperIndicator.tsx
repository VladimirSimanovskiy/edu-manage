import { Icon } from "@/components/icon";
import { useStepItem } from "@/components/stepper/components/stepper-item/StepperItemContext";
import { CheckIcon, LoaderCircleIcon } from "lucide-react";
import { tv } from "tailwind-variants";

export interface StepperIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
	asChild?: boolean;
}

const stepperIndicatorStyles = tv({
	slots: {
		indicator:
			"relative flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary-border text-xs font-medium text-muted data-[state=active]:bg-primary-accent data-[state=completed]:bg-primary-accent data-[state=active]:text-primary-bg data-[state=completed]:text-primary-bg",
		step: "group-data-loading/step:scale-0 group-data-loading/step:opacity-0 group-data-loading/step:transition-none transition-all group-data-[state=completed]/step:scale-0 group-data-[state=completed]/step:opacity-0",
		check: "absolute scale-0 opacity-0 transition-all group-data-[state=completed]/step:scale-100 group-data-[state=completed]/step:opacity-100",
		loader: "absolute transition-all"
	}
});

export function StepperIndicator({ asChild = false, className, children, ...props }: StepperIndicatorProps) {
	const { state, step, isLoading } = useStepItem();
	const styles = stepperIndicatorStyles();

	return (
		<span data-slot="stepper-indicator" className={styles.indicator({ className })} data-state={state} {...props}>
			{asChild ? (
				children
			) : (
				<>
					<span className={styles.step()}>{step}</span>
					<Icon icon={CheckIcon} className={styles.check()} aria-hidden="true" />
					{isLoading && (
						<span className={styles.loader()}>
							<Icon icon={LoaderCircleIcon} className="animate-spin" aria-hidden="true" />
						</span>
					)}
				</>
			)}
		</span>
	);
}
