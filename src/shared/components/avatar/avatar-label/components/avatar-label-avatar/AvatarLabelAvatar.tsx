import React from "react";
import { Avatar } from "../../../Avatar";
import { useAvatarLabelContext, AvatarLabelChild } from "../../AvatarLabelContext";

type AvatarLabelAvatarProps = React.ComponentPropsWithoutRef<typeof Avatar>;

export const AvatarLabelAvatar = React.forwardRef<React.ElementRef<typeof Avatar>, AvatarLabelAvatarProps>(
	({ className, children, size, ...props }, ref) => {
		const { size: labelSize } = useAvatarLabelContext();

		return (
			<Avatar ref={ref} className={className} size={size || labelSize} {...props}>
				{children}
			</Avatar>
		);
	}
) as AvatarLabelChild<AvatarLabelAvatarProps>;

AvatarLabelAvatar.displayName = "AvatarLabelAvatar";
AvatarLabelAvatar.componentType = "avatar";
