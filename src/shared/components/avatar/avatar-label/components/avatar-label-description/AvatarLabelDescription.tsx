import React from "react";
import { tv } from "tailwind-variants";
import { useAvatarLabelContext, AvatarLabelChild } from "../../AvatarLabelContext";
import { AvatarLabelVariants } from "../../AvatarLabel";
import { VariantsConfig } from "@/lib/utils/variants";

const avatarLabelDescriptionStyles = tv({
	base: "text-muted",
	variants: {
		size: {
			sm: "text-xs",
			md: "text-sm",
			lg: "text-base",
			xl: "text-base"
		}
	} satisfies VariantsConfig<AvatarLabelVariants>,
	defaultVariants: {
		size: "md"
	}
});

type AvatarLabelDescriptionProps = React.ComponentPropsWithoutRef<"span"> & AvatarLabelVariants;

export const AvatarLabelDescription = React.forwardRef<HTMLSpanElement, AvatarLabelDescriptionProps>(
	({ className, size, children, ...props }, ref) => {
		const { size: labelSize } = useAvatarLabelContext();

		return (
			<span ref={ref} className={avatarLabelDescriptionStyles({ className, size: size || labelSize })} {...props}>
				{children}
			</span>
		);
	}
) as AvatarLabelChild<AvatarLabelDescriptionProps>;

AvatarLabelDescription.displayName = "AvatarLabelDescription";
AvatarLabelDescription.componentType = "description";
