import React from "react";
import { tv } from "tailwind-variants";
import { useAvatarLabelContext, AvatarLabelChild } from "../../AvatarLabelContext";
import { AvatarLabelVariants } from "../../AvatarLabel";
import { VariantsConfig } from "@/lib/utils/variants";

const avatarLabelTitleStyles = tv({
	base: "font-semibold text-primary-fg",
	variants: {
		size: {
			sm: "text-sm",
			md: "text-sm",
			lg: "text-base",
			xl: "text-lg"
		}
	} satisfies VariantsConfig<AvatarLabelVariants>,
	defaultVariants: {
		size: "md"
	}
});

type AvatarLabelTitleProps = React.ComponentPropsWithoutRef<"span"> & AvatarLabelVariants;

export const AvatarLabelTitle = React.forwardRef<HTMLSpanElement, AvatarLabelTitleProps>(
	({ className, size, children, ...props }, ref) => {
		const { size: labelSize } = useAvatarLabelContext();

		return (
			<span ref={ref} className={avatarLabelTitleStyles({ className, size: size || labelSize })} {...props}>
				{children}
			</span>
		);
	}
) as AvatarLabelChild<AvatarLabelTitleProps>;

AvatarLabelTitle.displayName = "AvatarLabelTitle";
AvatarLabelTitle.componentType = "title";
