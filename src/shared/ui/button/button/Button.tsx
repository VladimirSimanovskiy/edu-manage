import React, { PropsWithChildren } from "react";
import { tv } from "tailwind-variants";
import { ButtonBase, ButtonBaseProps, ButtonBaseVariants } from "../button-base/ButtonBase";
import { VariantsConfig } from "@/shared/lib/utils/variants";

type ButtonVariants = Pick<ButtonBaseVariants, "size">;

const buttonStyles = tv({
	slots: {
		container: "flex items-center justify-center gap-2 overflow-hidden",
		icon: "h-4 w-4"
	},
	variants: {
		size: {
			xs: { icon: "h-3 w-3" },
			sm: { icon: "h-3.5 w-3.5" },
			md: {},
			lg: {},
			xl: { icon: "h-5 w-5", container: "gap-3" }
		}
	} satisfies VariantsConfig<ButtonVariants>,
	defaultVariants: {
		size: "md"
	}
});

export type ButtonProps = PropsWithChildren<
	ButtonBaseProps &
		ButtonVariants & {
			startIcon?: React.ElementType;
			endIcon?: React.ElementType;
			containerClassName?: string;
			iconClassName?: string;
		}
>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ startIcon: StartIcon, endIcon: EndIcon, size, children, iconClassName, containerClassName, ...props }, ref) => {
		const styles = buttonStyles({ size });

		const startIconEl = StartIcon && <StartIcon className={styles.icon({ className: iconClassName })} />;
		const endIconEl = EndIcon && <EndIcon className={styles.icon({ className: iconClassName })} />;

		return (
			<ButtonBase {...props} size={size} ref={ref}>
				<div className={styles.container({ className: containerClassName })}>
					{startIconEl}
					{children}
					{endIconEl}
				</div>
			</ButtonBase>
		);
	}
);

Button.displayName = "Button";
