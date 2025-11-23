import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Checkbox, CheckboxProps } from "../Checkbox";
import { tv } from "tailwind-variants";
import React, { useId } from "react";
import { FieldLabel } from "@/components/label";
import { Description } from "@/components/description";
import { VariantsConfig } from "@/lib/utils/variants";

export interface CheckboxFieldVariants {
	outline?: boolean;
	alignment?: "left" | "right";
	disabled?: boolean;
	error?: boolean;
	withDescription?: boolean;
}

const checkboxFieldStyles = tv({
	slots: {
		container: "flex cursor-pointer items-center space-x-3",
		textContainer: "flex flex-col gap-1",
		labelWrapper: "flex h-4 items-center",
		label: "cursor-pointer",
		description: "text-xs"
	},
	variants: {
		outline: {
			true: {
				container: "rounded-lg p-3 px-4 outline outline-1 outline-secondary-border"
			}
		},
		alignment: {
			left: {},
			right: {
				container: "flex-row-reverse space-x-reverse"
			}
		},
		disabled: {
			true: {
				container: "cursor-default",
				textContainer: "opacity-50",
				label: "cursor-default text-primary-fg",
				description: "text-muted"
			}
		},
		error: {
			true: {
				label: "text-status-error"
			}
		},
		withDescription: {
			true: { container: "items-start" }
		}
	} satisfies VariantsConfig<CheckboxFieldVariants>,
	defaultVariants: {
		alignment: "left"
	}
});

export type CheckboxFieldProps = CheckboxProps &
	Omit<CheckboxFieldVariants, "withDescription"> & {
		label?: string;
		description?: string;
	};

const CheckboxField = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxFieldProps>(
	({ className, id, label, alignment, disabled, error, outline, description, ...props }, ref) => {
		const {
			container,
			textContainer,
			label: labelStyles,
			labelWrapper,
			description: descriptionStyles
		} = checkboxFieldStyles({ alignment, disabled, error, outline, withDescription: !!description });

		const generatedId = useId();
		const checkboxId = id || `checkbox-${generatedId}`;

		return (
			<label htmlFor={checkboxId} className={container({ class: className })}>
				<Checkbox disabled={disabled} id={checkboxId} {...props} ref={ref} />
				{(label || description) && (
					<div className={textContainer()}>
						{label && (
							<div className={labelWrapper()}>
								<FieldLabel htmlFor={checkboxId} className={labelStyles()}>
									{label}
								</FieldLabel>
							</div>
						)}
						{description && <Description className={descriptionStyles()}>{description}</Description>}
					</div>
				)}
			</label>
		);
	}
);

CheckboxField.displayName = "CheckboxField";

export { CheckboxField };
