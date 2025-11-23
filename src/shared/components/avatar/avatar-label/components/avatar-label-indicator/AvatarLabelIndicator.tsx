import React from "react";
import { useAvatarLabelContext, AvatarLabelChild } from "../../AvatarLabelContext";
import { Indicator } from "@/components/indicator";

type AvatarLabelIndicatorProps = React.ComponentPropsWithoutRef<typeof Indicator>;

export const AvatarLabelIndicator = React.forwardRef<React.ElementRef<typeof Indicator>, AvatarLabelIndicatorProps>(
	({ children, ...props }, ref) => {
		const { size: labelSize } = useAvatarLabelContext();

		return (
			<Indicator ref={ref} size={labelSize} {...props} rounded>
				{children}
			</Indicator>
		);
	}
) as AvatarLabelChild<AvatarLabelIndicatorProps>;

AvatarLabelIndicator.displayName = "AvatarLabelIndicator";
AvatarLabelIndicator.componentType = "indicator";
