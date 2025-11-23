import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { tv } from "tailwind-variants";
import { Icon, IconProps } from "../icon/Icon";
import { Shortcut } from "../shortcut";
import { usePortalContainer } from "../portal-container";
import { VariantsConfig } from "@/lib/utils/variants";
import { TooltipContext, TooltipVariants, useTooltipContext } from "./useTooltipContext";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const tooltipArrowStyles = tv({
	slots: {
		fill: "fill-alpha-30",
		stroke: "stroke-secondary-border stroke-[0.5px]",
		svg: "rotate-180"
	},
	variants: {
		focus: {
			high: {
				fill: "fill-alpha-high-20",
				stroke: "stroke-none"
			}
		}
	} satisfies VariantsConfig<TooltipVariants>
});

type TooltipArrowProps = React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Arrow>;

const TooltipArrow = React.forwardRef<React.ElementRef<typeof TooltipPrimitive.Arrow>, TooltipArrowProps>(
	({ width, height, className, ...props }, ref) => {
		const { focus } = useTooltipContext();
		const styles = tooltipArrowStyles({ focus });

		return (
			<TooltipPrimitive.Arrow ref={ref} asChild {...props}>
				<svg
					width={width || "10"}
					height={height || "5"}
					viewBox="0 0 10 5"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className={styles.svg({ className })}
				>
					<path d="M5.00082 0.248638L10 5.99523L0 6.00001L5.00082 0.248638Z" className={styles.fill()} />
					<path
						d="M9.57422 5.25L5.37732 0.433047C5.17793 0.204195 4.82228 0.204345 4.62308 0.433365L0.433594 5.25"
						className={styles.stroke()}
						stroke-linecap="round"
					/>
				</svg>
			</TooltipPrimitive.Arrow>
		);
	}
);

TooltipArrow.displayName = TooltipPrimitive.Arrow.displayName;

const tooltipContentStyles = tv({
	base: [
		"z-50 rounded-lg border-[0.5px] px-2 py-1.5 text-xs backdrop-blur-sm animate-in fade-in-0 zoom-in-95",
		"border-secondary-border bg-alpha-30 text-primary-fg shadow-soft-base",
		"data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
		"data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
	],
	variants: {
		focus: {
			high: "border-0 bg-alpha-high-20 text-inverse-primary-fg shadow-hard-sm"
		}
	} satisfies VariantsConfig<TooltipVariants>
});

type TooltipContentProps = React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> &
	TooltipVariants & {
		/**
		 * Контейнер для портала. Если не указан, используется хук usePortalContainer
		 * для поиска PortalContainer
		 */
		portalContainer?: HTMLElement;
	};

const TooltipContent = React.forwardRef<React.ElementRef<typeof TooltipPrimitive.Content>, TooltipContentProps>(
	({ className, sideOffset = 4, portalContainer, focus, ...props }, ref) => {
		const container = usePortalContainer(portalContainer);

		return (
			<TooltipContext.Provider value={{ focus }}>
				<TooltipPrimitive.Portal container={container}>
					<TooltipPrimitive.Content
						ref={ref}
						sideOffset={sideOffset}
						className={tooltipContentStyles({ className, focus })}
						{...props}
					/>
				</TooltipPrimitive.Portal>
			</TooltipContext.Provider>
		);
	}
);
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

const tooltipTitleStyles = tv({
	base: "text-sm font-medium text-primary-fg",
	variants: {
		focus: {
			high: "text-inverse-primary-fg"
		}
	} satisfies VariantsConfig<TooltipVariants>
});

type TooltipTitleProps = React.HTMLAttributes<HTMLDivElement>;

const TooltipTitle = React.forwardRef<HTMLDivElement, TooltipTitleProps>(({ className, children, ...props }, ref) => {
	const { focus } = useTooltipContext();
	return (
		<div ref={ref} className={tooltipTitleStyles({ className, focus })} {...props}>
			{children}
		</div>
	);
});
TooltipTitle.displayName = "TooltipTitle";

const tooltipTextStyles = tv({
	base: "text-xs text-secondary-fg",
	variants: {
		focus: {
			high: "text-inverse-secondary-fg"
		}
	} satisfies VariantsConfig<TooltipVariants>
});

type TooltipTextProps = React.HTMLAttributes<HTMLDivElement>;

const TooltipText = React.forwardRef<HTMLDivElement, TooltipTextProps>(({ className, children, ...props }, ref) => {
	const { focus } = useTooltipContext();
	return (
		<div ref={ref} className={tooltipTextStyles({ className, focus })} {...props}>
			{children}
		</div>
	);
});
TooltipText.displayName = "TooltipText";

const tooltipIconStyles = tv({
	base: "flex-shrink-0 text-xs text-primary-fg",
	variants: {
		focus: {
			high: "text-inverse-primary-fg"
		}
	} satisfies VariantsConfig<TooltipVariants>
});

type TooltipIconProps = IconProps;

const TooltipIcon = React.forwardRef<SVGSVGElement, TooltipIconProps>(({ className, ...props }, ref) => {
	const { focus } = useTooltipContext();
	return <Icon size="lg" className={tooltipIconStyles({ className, focus })} ref={ref} {...props} />;
});
TooltipIcon.displayName = "TooltipIcon";

const tooltipShortcutStyles = tv({
	base: "h-auto p-0 text-xs text-muted",
	variants: {
		focus: {
			high: "text-inverse-secondary-fg opacity-70"
		}
	} satisfies VariantsConfig<TooltipVariants>
});

type TooltipShortcutProps = React.HTMLAttributes<HTMLDivElement>;

const TooltipShortcut = React.forwardRef<HTMLDivElement, TooltipShortcutProps>(({ className, ...props }, ref) => {
	const { focus } = useTooltipContext();
	return <Shortcut variant="ghost" className={tooltipShortcutStyles({ className, focus })} ref={ref} {...props} />;
});
TooltipShortcut.displayName = "TooltipShortcut";

export {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
	TooltipArrow,
	TooltipProvider,
	TooltipTitle,
	TooltipText,
	TooltipIcon,
	TooltipShortcut
};
