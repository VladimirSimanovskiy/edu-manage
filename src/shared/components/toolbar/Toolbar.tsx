import * as ToolbarPrimitive from "@radix-ui/react-toolbar";
import React, { PropsWithChildren } from "react";
import { tv } from "tailwind-variants";
import { Divider } from "../divider/Divider";
import { Icon } from "../icon";
import { ChevronDown, LucideIcon } from "lucide-react";
import { ScrollArea } from "../scroll-area/ScrollArea";
import { ToolbarProvider, ToolbarProviderProps, useToolbarContext } from "./ToolbarContext";

const toolbarStyles = tv({
	slots: {
		wrapper: "flex items-center gap-1 rounded-lg p-1.5 lg:p-1",
		scrollbar: "h-1.5 border-t-0 px-1.5",
		thumb: "",
		scrollarea: "lg:rounded-lg"
	},
	variants: {
		focus: {
			low: {
				wrapper: "border border-secondary-border bg-secondary-bg lg:shadow-soft-sm",
				thumb: "bg-primary-border"
			},
			high: {
				wrapper: "bg-inverse-secondary-bg lg:shadow-hard-base",
				thumb: "bg-inverse-active"
			}
		}
	}
});

export type ToolbarProps = React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Root> &
	Pick<ToolbarProviderProps, "focus">;

export const Toolbar = React.forwardRef<React.ElementRef<typeof ToolbarPrimitive.Root>, ToolbarProps>(
	({ className, focus = "high", ...props }, ref) => {
		const styles = toolbarStyles();

		return (
			<ToolbarProvider focus={focus}>
				<ScrollArea
					type="always"
					thumbClassName={styles.thumb({ focus })}
					scrollbarClassName={styles.scrollbar()}
					className={styles.scrollarea()}
					orientation="horizontal"
				>
					<ToolbarPrimitive.Root ref={ref} className={styles.wrapper({ className, focus })} {...props} />
				</ScrollArea>
			</ToolbarProvider>
		);
	}
);

Toolbar.displayName = "Toolbar";

const toolbarButtonStyles = tv({
	base: "inline-flex items-center justify-center gap-1.5 rounded-sm p-1.5",
	variants: {
		focus: {
			low: "hover:bg-secondary-bg-hover",
			high: "hover:bg-inverse-hover"
		}
	}
});

export type ToolbarButtonProps = React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.ToolbarButton>;

export const ToolbarButton = React.forwardRef<
	React.ElementRef<typeof ToolbarPrimitive.ToolbarButton>,
	ToolbarButtonProps
>(({ className, ...props }, ref) => {
	const { focus } = useToolbarContext();
	const styles = toolbarButtonStyles({ className, focus });
	return <ToolbarPrimitive.ToolbarButton ref={ref} className={styles} {...props} />;
});

ToolbarButton.displayName = "ToolbarButton";

const toolbarIconStyles = tv({
	base: "h-4 w-4",
	variants: {
		focus: {
			low: "text-primary-fg",
			high: "stroke-[1.75px] text-inverse-primary-fg"
		}
	}
});

export type ToolbarIconProps = React.ComponentPropsWithoutRef<typeof Icon>;

export const ToolbarIcon = React.forwardRef<React.ElementRef<typeof Icon>, ToolbarIconProps>(
	({ className, ...props }, ref) => {
		const { focus } = useToolbarContext();
		return <Icon ref={ref} className={toolbarIconStyles({ className, focus })} {...props} />;
	}
);

ToolbarIcon.displayName = "ToolbarIcon";

const toolbarTextStyles = tv({
	base: "text-base leading-none",
	variants: {
		focus: {
			low: "text-primary-fg",
			high: "text-inverse-primary-fg"
		}
	}
});

export type ToolbarTextProps = React.HTMLAttributes<HTMLDivElement>;

export const ToolbarText = React.forwardRef<HTMLDivElement, PropsWithChildren<ToolbarTextProps>>(
	({ className, ...props }, ref) => {
		const { focus } = useToolbarContext();
		return <div ref={ref} className={toolbarTextStyles({ className, focus })} {...props} />;
	}
);

ToolbarText.displayName = "ToolbarText";

const toolbarSubTriggerStyles = tv({
	base: "",
	slots: {
		icon: "h-2 w-2 stroke-[3px]"
	},
	variants: {
		focus: {
			low: "text-primary-fg",
			high: "text-inverse-primary-fg"
		}
	}
});

export type ToolbarSubTriggerProps = Omit<React.ComponentPropsWithoutRef<typeof Icon>, "icon"> & {
	icon?: LucideIcon;
};

export const ToolbarSubTrigger = React.forwardRef<React.ElementRef<typeof Icon>, ToolbarSubTriggerProps>(
	({ className, icon, ...props }, ref) => {
		const { focus } = useToolbarContext();
		const styles = toolbarSubTriggerStyles();
		return (
			<span className={styles.base({ className, focus })}>
				<Icon icon={icon || ChevronDown} ref={ref} className={styles.icon({ focus })} {...props} />
			</span>
		);
	}
);

ToolbarSubTrigger.displayName = "ToolbarSubTrigger";

const toolbarToggleGroupStyles = tv({
	base: ["flex items-center gap-1"]
});

export type ToolbarToggleGroupProps = React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.ToggleGroup>;

export const ToolbarToggleGroup = React.forwardRef<
	React.ElementRef<typeof ToolbarPrimitive.ToggleGroup>,
	ToolbarToggleGroupProps
>(({ className, ...props }, ref) => {
	const styles = toolbarToggleGroupStyles({ className });
	return <ToolbarPrimitive.ToggleGroup ref={ref} className={styles} {...props} />;
});
ToolbarToggleGroup.displayName = ToolbarPrimitive.ToggleGroup.displayName;

const toolbarToggleStyles = tv({
	extend: toolbarButtonStyles,
	base: "disabled:pointer-events-none disabled:opacity-50",
	variants: {
		focus: {
			low: "data-[state=on]:bg-primary-bg-hover",
			high: "data-[state=on]:bg-inverse-active"
		}
	}
});

export type ToolbarToggleItemProps = React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.ToolbarToggleItem> & {
	children: React.ReactNode;
};

export const ToolbarToggleItem = React.forwardRef<
	React.ElementRef<typeof ToolbarPrimitive.ToolbarToggleItem>,
	ToolbarToggleItemProps
>(({ className, children, ...props }, ref) => {
	const { focus } = useToolbarContext();
	const styles = toolbarToggleStyles({ className, focus });

	return (
		<ToolbarPrimitive.ToolbarToggleItem ref={ref} className={styles} {...props}>
			{children}
		</ToolbarPrimitive.ToolbarToggleItem>
	);
});

ToolbarToggleItem.displayName = "ToolbarToggleItem";

const toolbarDividerStyles = tv({
	base: "h-5 w-px",
	variants: {
		focus: {
			low: "bg-secondary-border",
			high: "bg-inverse-border"
		}
	}
});

export type ToolbarSeparatorProps = React.HTMLAttributes<HTMLDivElement>;

export const ToolbarSeparator = React.forwardRef<React.ElementRef<typeof Divider>, ToolbarSeparatorProps>(
	({ className, ...props }, ref) => {
		const { focus } = useToolbarContext();
		const styles = toolbarDividerStyles({ className, focus });
		return (
			<ToolbarPrimitive.ToolbarSeparator asChild data-orientation="vertical">
				<Divider ref={ref} orientation="vertical" className={styles} {...props} />
			</ToolbarPrimitive.ToolbarSeparator>
		);
	}
);

ToolbarSeparator.displayName = "ToolbarSeparator";

const toolbarTriggerChevronStyles = tv({
	slots: {
		wrapper: "pr-0.5",
		subtrigger: "py-0.5"
	},
	variants: {
		sub: {
			true: { wrapper: "-ml-0.5 px-0.5 py-2" }
		}
	}
});

export type ToolbarTriggerChevronProps = ToolbarTriggerProps & {
	sub?: boolean;
};

export const ToolbarTriggerChevron = React.forwardRef<
	React.ElementRef<typeof ToolbarPrimitive.ToolbarButton>,
	ToolbarTriggerChevronProps
>(({ className, children, sub, ...props }, ref) => {
	const styles = toolbarTriggerChevronStyles();

	return (
		<ToolbarTrigger ref={ref} data-stick-left className={styles.wrapper({ className, sub })} {...props}>
			{children}
			<ToolbarSubTrigger className={styles.subtrigger()} />
		</ToolbarTrigger>
	);
});

ToolbarTriggerChevron.displayName = "ToolbarTriggerChevron ";

const toolbarTriggerStyles = tv({
	base: "",
	variants: {
		focus: {
			low: "data-[state=open]:bg-primary-bg-hover",
			high: "data-[state=open]:bg-inverse-active"
		}
	}
});

export type ToolbarTriggerProps = ToolbarButtonProps & {
	"data-state"?: "open" | "closed";
};

export const ToolbarTrigger = React.forwardRef<
	React.ElementRef<typeof ToolbarPrimitive.ToolbarButton>,
	ToolbarTriggerProps
>(({ className, children, ...props }, ref) => {
	const { focus } = useToolbarContext();

	return (
		<ToolbarButton ref={ref} data-stick-left className={toolbarTriggerStyles({ className, focus })} {...props}>
			{children}
		</ToolbarButton>
	);
});

ToolbarTrigger.displayName = "ToolbarTrigger";
