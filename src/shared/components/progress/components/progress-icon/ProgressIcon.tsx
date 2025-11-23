import { Icon } from "@/components/icon";
import { IconProps } from "@/components/icon/Icon";
import { VariantsConfig } from "@/lib/utils/variants";
import React from "react";
import { tv } from "tailwind-variants";
import { ProgressBarSizeVariants } from "../../ProgressBarStyles";

const progressIconVariants = tv({
	base: "text-secondary-fg",
	variants: {
		size: {
			sm: "h-4 w-4",
			md: "h-4 w-4",
			lg: "h-5 w-5"
		}
	} satisfies VariantsConfig<ProgressBarSizeVariants>,
	defaultVariants: {
		size: "md"
	}
});

export type ProgressIconProps = ProgressBarSizeVariants & IconProps;

export const ProgressIcon: React.FC<ProgressIconProps> = ({ className, size, icon, ...props }) => {
	return <Icon icon={icon} className={progressIconVariants({ className, size })} {...props} />;
};

ProgressIcon.displayName = "ProgressIcon";
