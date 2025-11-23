import * as AvatarPrimitive from "@radix-ui/react-avatar";
import React from "react";
import { tv } from "tailwind-variants";

export const avatarFallbackStyles = tv({
	base: "flex h-full w-full items-center justify-center rounded-full bg-secondary-bg-hover text-secondary-fg"
});

export type AvatarFallbackProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>;

export const AvatarFallback = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Fallback>, AvatarFallbackProps>(
	({ className, ...props }, ref) => (
		<AvatarPrimitive.Fallback ref={ref} className={avatarFallbackStyles({ className })} {...props} />
	)
);

AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;
