import { IconButton } from "@/components/button";
import { IconButtonProps } from "@/components/button/icon-button/IconButton";
import { VariantsConfig } from "@/lib/utils/variants";
import React from "react";
import { tv } from "tailwind-variants";
import { ProgressBarSizeVariants } from "../../ProgressBarStyles";

const progressIconButtonVariants = tv({
	slots: {
		base: "h-auto p-0 text-muted",
		icon: ""
	},
	variants: {
		size: {
			sm: {
				icon: "h-4 w-4"
			},
			md: {
				icon: "h-5 w-5"
			},
			lg: {
				icon: "h-[1.375rem] w-[1.375rem]"
			}
		}
	} satisfies VariantsConfig<ProgressBarSizeVariants>,
	defaultVariants: {
		size: "md"
	}
});

export type ProgressIconButtonProps = ProgressBarSizeVariants & IconButtonProps;

export const ProgressIconButton: React.FC<ProgressIconButtonProps> = ({
	className,
	size,
	icon,
	iconClassName,
	...props
}) => {
	const styles = progressIconButtonVariants({ size });
	return (
		<IconButton
			icon={icon}
			variant="text"
			className={styles.base({ className })}
			iconClassName={styles.icon({ className: iconClassName })}
			size={size}
			{...props}
		/>
	);
};

ProgressIconButton.displayName = "ProgressIconButton";
