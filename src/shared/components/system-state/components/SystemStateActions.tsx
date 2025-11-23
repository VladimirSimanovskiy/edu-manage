import React from "react";
import { tv } from "tailwind-variants";
import { Button, ButtonProps } from "@/components/button/button/Button";
import { useIsMobile } from "@/hooks/useBreakpoints";

const actionsStyles = tv({
	slots: {
		container: "mt-4 flex w-full flex-col items-center gap-3 lg:mt-8 lg:flex-row lg:justify-center",
		button: "w-full lg:w-auto"
	}
});

export interface SystemStateActionsProps {
	className?: string;
	primaryButton?: React.ReactNode;
	primaryButtonProps?: ButtonProps;
	secondaryButton?: React.ReactNode;
	secondaryButtonProps?: ButtonProps;
}

export const SystemStateActions = React.forwardRef<HTMLDivElement, SystemStateActionsProps>(
	({ className, primaryButton, secondaryButton, primaryButtonProps, secondaryButtonProps }, ref) => {
		const isMobile = useIsMobile();
		const { container, button } = actionsStyles();

		if (isMobile) {
			primaryButtonProps = { ...primaryButtonProps, size: "md", className: button({ className: className }) };
			secondaryButtonProps = { ...secondaryButtonProps, size: "md", className: button({ className: className }) };
		}

		const primaryButtonElement = primaryButton && (
			<Button key="primary-button" variant="primary" {...primaryButtonProps}>
				{primaryButton}
			</Button>
		);

		const secondaryButtonElement = secondaryButton && (
			<Button key="secondary-button" variant="outline" {...secondaryButtonProps}>
				{secondaryButton}
			</Button>
		);

		return (
			<div ref={ref} className={container({ class: className })}>
				{isMobile
					? [primaryButtonElement, secondaryButtonElement]
					: [secondaryButtonElement, primaryButtonElement]}
			</div>
		);
	}
);

SystemStateActions.displayName = "SystemStateActions";
