import * as AvatarPrimitive from "@radix-ui/react-avatar";
import React from "react";
import { AvatarFallbackProps, avatarFallbackStyles } from "../avatar-fallback/AvatarFallback";
import { Icon } from "@/components/icon";
import { LucideIcon } from "lucide-react";

type AvatarIcon = Omit<AvatarFallbackProps, "children"> & {
	icon: LucideIcon;
};

export const AvatarIcon = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Fallback>, AvatarIcon>(
	({ className, icon, ...props }, ref) => (
		<AvatarPrimitive.Fallback ref={ref} className={avatarFallbackStyles({ className })} {...props}>
			<Icon icon={icon} />
		</AvatarPrimitive.Fallback>
	)
);

AvatarIcon.displayName = "AvatarIcon";
