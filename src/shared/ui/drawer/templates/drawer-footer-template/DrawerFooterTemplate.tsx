import { Button, ButtonProps } from "@/components/button/button/Button";
import { CheckboxField } from "@/components/checkbox";
import { CheckboxFieldProps } from "@/components/checkbox/checkbox-field/CheckboxField";
import React from "react";
import { tv } from "tailwind-variants";
import { DrawerFooter } from "../../components/drawer-footer/DrawerFooter";
import { VariantsConfig } from "@/lib/utils/variants";

export interface DrawerFooterTemplateVariants {
	position?: "vertical" | "horizontal";
}

const drawerFooterTemplateStyles = tv({
	base: "flex flex-col items-start gap-3 py-3",
	slots: {
		buttonWrapper: "flex w-full items-start gap-3",
		button: "px-8 py-3",
		checkbox: "py-1"
	},
	variants: {
		position: {
			vertical: {
				buttonWrapper: "flex-col",
				button: "w-full"
			},
			horizontal: {
				buttonWrapper: "flex-row",
				button: "flex-1"
			}
		}
	} satisfies VariantsConfig<DrawerFooterTemplateVariants>
});

type DrawerFooterTemplateProps = React.HTMLAttributes<HTMLDivElement> &
	DrawerFooterTemplateVariants & {
		checkboxLabel?: string;
		checkboxProps?: CheckboxFieldProps;
		primaryButton?: React.ReactNode;
		primaryButtonProps?: ButtonProps;
		secondaryButton?: React.ReactNode;
		secondaryButtonProps?: ButtonProps;
	};

export const DrawerFooterTemplate = React.forwardRef<HTMLDivElement, DrawerFooterTemplateProps>(
	(
		{
			className,
			primaryButton,
			primaryButtonProps,
			secondaryButton,
			secondaryButtonProps,
			checkboxLabel,
			checkboxProps,
			position = "horizontal",
			...props
		},
		ref
	) => {
		const styles = drawerFooterTemplateStyles({ className, position });

		const primaryButtonElement = primaryButton && (
			<Button
				key="primary-button"
				variant="primary"
				size="xl"
				{...primaryButtonProps}
				className={styles.button({ className: primaryButtonProps?.className })}
			>
				{primaryButton}
			</Button>
		);

		const secondaryButtonElement = secondaryButton && (
			<Button
				key="secondary-button"
				variant="outline"
				size="xl"
				{...secondaryButtonProps}
				className={styles.button({ className: secondaryButtonProps?.className })}
			>
				{secondaryButton}
			</Button>
		);

		const hasButtons = primaryButton || secondaryButton;

		return (
			<DrawerFooter ref={ref} className={styles.base()} {...props}>
				{checkboxLabel && (
					<CheckboxField className={styles.checkbox()} label={checkboxLabel} {...checkboxProps} />
				)}
				{hasButtons && (
					<div className={styles.buttonWrapper()}>
						{position === "vertical"
							? [primaryButtonElement, secondaryButtonElement]
							: [secondaryButtonElement, primaryButtonElement]}
					</div>
				)}
			</DrawerFooter>
		);
	}
);

DrawerFooterTemplate.displayName = "DrawerFooterTemplate";
