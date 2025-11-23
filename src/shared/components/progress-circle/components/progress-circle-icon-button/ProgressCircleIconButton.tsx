import { IconButton } from "@/components/button";
import { IconButtonProps } from "@/components/button/icon-button/IconButton";
import React from "react";
import { tv, VariantProps } from "tailwind-variants";

const progressCircleIconButtonVariants = tv({
	slots: {
		base: "p-0 text-muted",
		icon: "h-full w-full"
	},
	variants: {
		size: {
			xs: {
				base: "h-4 w-4"
			},
			sm: {
				base: "h-5 w-5"
			},
			md: {
				base: "h-[1.375rem] w-[1.375rem]"
			},
			lg: {
				base: "h-8 w-8"
			},
			xl: {
				base: "h-11 w-11"
			}
		}
	},
	defaultVariants: {
		size: "md"
	}
});

export type ProgressCircleIconButtonProps = VariantProps<typeof progressCircleIconButtonVariants> & IconButtonProps;

export const ProgressCircleIconButton: React.FC<ProgressCircleIconButtonProps> = ({
	className,
	size,
	icon,
	...props
}) => {
	const styles = progressCircleIconButtonVariants();
	return (
		<IconButton
			icon={icon}
			variant="text"
			className={styles.base({ className, size })}
			iconClassName={styles.icon()}
			size={size}
			{...props}
		/>
	);
};

ProgressCircleIconButton.displayName = "ProgressCircleIconButton";
