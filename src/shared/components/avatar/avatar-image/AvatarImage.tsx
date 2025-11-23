import * as AvatarPrimitive from "@radix-ui/react-avatar";
import React from "react";
import { tv } from "tailwind-variants";

const avatarImageStyles = tv({
	base: "aspect-square h-full w-full"
});

type AvatarImageProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>;

export const AvatarImage = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Image>, AvatarImageProps>(
	({ className, ...props }, ref) => (
		<AvatarPrimitive.Image ref={ref} className={avatarImageStyles({ className })} {...props} />
	)
);

AvatarImage.displayName = AvatarPrimitive.Image.displayName;
