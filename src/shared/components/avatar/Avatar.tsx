import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { tv } from "tailwind-variants";
import { VariantsConfig } from "@/lib/utils/variants";

export interface AvatarVariants {
	size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
}

const avatarStyles = tv({
	base: "relative flex shrink-0 overflow-hidden rounded-full border border-secondary-border",
	variants: {
		size: {
			"2xs": "h-4 w-4 text-2xs [&_svg]:h-2.5 [&_svg]:w-2.5",
			xs: "h-6 w-6 text-xs [&_svg]:h-3.5 [&_svg]:w-3.5",
			sm: "h-8 w-8 text-sm [&_svg]:h-4 [&_svg]:w-4",
			md: "h-10 w-10 text-base [&_svg]:h-5 [&_svg]:w-5",
			lg: "h-12 w-12 text-lg [&_svg]:h-6 [&_svg]:w-6",
			xl: "h-14 w-14 text-xl [&_svg]:h-7 [&_svg]:w-7",
			"2xl": "h-16 w-16 text-2xl [&_svg]:h-8 [&_svg]:w-8"
		}
	} satisfies VariantsConfig<AvatarVariants>,
	defaultVariants: {
		size: "md"
	}
});

type AvatarProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & AvatarVariants;

export const Avatar = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(
	({ className, size, ...props }, ref) => (
		<AvatarPrimitive.Root ref={ref} className={avatarStyles({ className, size })} {...props} />
	)
);

Avatar.displayName = AvatarPrimitive.Root.displayName;
