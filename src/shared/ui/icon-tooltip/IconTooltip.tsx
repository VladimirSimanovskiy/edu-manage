import * as React from "react";
import { Icon } from "@/components/icon/Icon";
import { LucideIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../tooltip/Tooltip";

export interface IconTooltipProps {
	content: React.ReactNode;
	icon: LucideIcon;
	iconSize?: "sm" | "md" | "lg";
	iconClassName?: string;
	contentClassName?: string;
}

export const IconTooltip = ({ content, icon, iconClassName, iconSize = "sm", contentClassName }: IconTooltipProps) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Icon size={iconSize} className={iconClassName} icon={icon} />
				</TooltipTrigger>
				<TooltipContent className={contentClassName}>{content}</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
