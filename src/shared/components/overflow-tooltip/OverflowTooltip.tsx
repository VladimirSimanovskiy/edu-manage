import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../tooltip";
import { useOverflowTooltip } from "./useOverflowTooltip";
import React from "react";

type OverflowTooltipProps = {
	children: React.ReactNode;
	/**
	 * HTML-элемент для обертки содержимого.
	 * Используется для соблюдения правильной HTML-семантики.
	 * Например:
	 * - span (по умолчанию) для текста и инлайн-элементов
	 * - div для блочного содержимого и сложных структур
	 * @default span
	 */
	triggerTag?: React.ElementType;
	/**
	 * Классы для обработки переполненного содержимого.
	 * Например: "truncate", "line-clamp-3" и т.д.
	 */
	className?: string;
	/**
	 * Классы для содержимого тултипа.
	 * С помощью них можно управлять стилями тултипа, например шириной, переносом текста и т.д.
	 */
	tooltipClassName?: string;
	focus?: "high";
};

export const OverflowTooltip = ({ children, className, focus, triggerTag, tooltipClassName }: OverflowTooltipProps) => {
	const { open, onOpenChange, ref } = useOverflowTooltip<HTMLDivElement>();
	const TriggerTag = triggerTag || "span";
	return (
		<TooltipProvider>
			<Tooltip open={open} onOpenChange={onOpenChange}>
				<TooltipTrigger asChild>
					<TriggerTag ref={ref} className={cn(className)}>
						{children}
					</TriggerTag>
				</TooltipTrigger>
				<TooltipContent focus={focus} className={cn("max-w-xs", tooltipClassName)}>
					{children}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

OverflowTooltip.displayName = "OverflowTooltip";
