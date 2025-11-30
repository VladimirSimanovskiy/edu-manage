import { cn } from "@/lib/utils";
import React from "react";
import { OverflowTooltip } from "./OverflowTooltip";

type TextOverflowTooltipProps = {
	children?: React.ReactNode;
	className?: string;
	tooltipClassName?: string;
};

export const TextOverflowTooltip = ({ children, className, tooltipClassName }: TextOverflowTooltipProps) => {
	return (
		<OverflowTooltip
			className={cn("inline-block max-w-full truncate", className)}
			tooltipClassName={tooltipClassName}
		>
			{children}
		</OverflowTooltip>
	);
};

TextOverflowTooltip.displayName = "TextOverflowTooltip";
