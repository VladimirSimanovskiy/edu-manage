import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { tv } from "tailwind-variants";
import { usePortalContainer } from "../portal-container";
import { overlayStyles, OverlayVariants } from "../overlay/Overlay";
import { Button, ButtonProps } from "../button";
import { AlertContext, useAlert } from "../alert/AlertContext";
import { Icon } from "../icon";
import { IconProps } from "../icon/Icon";
import { VariantsConfig } from "@/lib/utils/variants";
import { AlertVariants } from "../alert/Alert";

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

const alertDialogOverlayStyles = tv({
	extend: overlayStyles
});

interface AlertDialogOverlayProps
	extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>,
		OverlayVariants {}

const AlertDialogOverlay = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
	AlertDialogOverlayProps
>(({ className, blur, type, ...props }, ref) => (
	<AlertDialogPrimitive.Overlay
		className={alertDialogOverlayStyles({ className, blur, type })}
		{...props}
		ref={ref}
	/>
));

AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const alertDialogContent = tv({
	base: [
		"fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-secondary-border bg-secondary-bg p-6 shadow-lg duration-200 sm:rounded-lg",
		"data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
		"data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]"
	],
	variants: {
		status: {
			success: "",
			warning: "",
			error: "",
			info: ""
		},
		focus: {
			low: "",
			medium: "border-primary-border bg-status-neutral-bg",
			high: "border-transparent bg-status-neutral"
		}
	} satisfies VariantsConfig<AlertVariants>,
	compoundVariants: [
		{
			status: "success",
			focus: "medium",
			class: "border-status-success-border bg-status-success-bg"
		},
		{
			status: "warning",
			focus: "medium",
			class: "border-status-warning-border bg-status-warning-bg"
		},
		{
			status: "error",
			focus: "medium",
			class: "border-status-error-secondary-border bg-status-error-bg"
		},
		{
			status: "info",
			focus: "medium",
			class: "border-status-info-border bg-status-info-bg"
		},
		{
			status: "success",
			focus: "high",
			class: "bg-status-success"
		},
		{
			status: "warning",
			focus: "high",
			class: "bg-status-warning"
		},
		{
			status: "error",
			focus: "high",
			class: "bg-status-error"
		},
		{
			status: "info",
			focus: "high",
			class: "bg-status-info"
		}
	],
	defaultVariants: {
		focus: "low"
	}
});

type BackgroundProps = OverlayVariants;

export type AlertDialogContentProps = React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content> &
	AlertVariants & {
		overlayBlur?: BackgroundProps["blur"];
		overlayType?: BackgroundProps["type"];
		/**
		 * Контейнер для портала. Если не указан, используется хук usePortalContainer
		 * для поиска PortalContainer
		 */
		portalContainer?: HTMLElement;
	};

const AlertDialogContent = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Content>,
	AlertDialogContentProps
>(({ className, overlayBlur, overlayType, status, focus = "low", children, portalContainer, ...props }, ref) => {
	const contextValue = React.useMemo(
		() => ({
			status,
			focus
		}),
		[status, focus]
	);

	const container = usePortalContainer(portalContainer);

	return (
		<AlertContext.Provider value={contextValue}>
			<AlertDialogPortal container={container}>
				<AlertDialogOverlay blur={overlayBlur} type={overlayType} />
				<AlertDialogPrimitive.Content
					ref={ref}
					className={alertDialogContent({ className, status, focus })}
					{...props}
				>
					{children}
				</AlertDialogPrimitive.Content>
			</AlertDialogPortal>
		</AlertContext.Provider>
	);
});

AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const alertDialogHeaderStyles = tv({
	base: "grid grid-cols-[0_1fr] items-start gap-y-2 has-[>svg]:grid-cols-[1.5rem_1fr] has-[>svg]:gap-x-4"
});

const AlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={alertDialogHeaderStyles({ className })} {...props} />
);

AlertDialogHeader.displayName = "AlertDialogHeader";

const alertDialogFooterStyles = tv({
	base: "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2"
});

const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={alertDialogFooterStyles({ className })} {...props} />
);

AlertDialogFooter.displayName = "AlertDialogFooter";

const alertDialogTitleStyles = tv({
	base: "col-start-2 text-lg font-semibold text-primary-fg",
	variants: {
		status: {
			success: "text-status-success",
			warning: "text-status-warning",
			error: "text-status-error",
			info: "text-status-info"
		},
		focus: {
			low: "text-primary-fg",
			medium: "",
			high: "text-primary-bg"
		}
	} satisfies VariantsConfig<AlertVariants>,
	defaultVariants: {
		focus: "low"
	}
});

export type AlertDialogTitleProps = React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title> & AlertVariants;

const AlertDialogTitle = React.forwardRef<React.ElementRef<typeof AlertDialogPrimitive.Title>, AlertDialogTitleProps>(
	({ className, status: statusProp, focus: focusProp, ...props }, ref) => {
		const { status, focus } = useAlert({ status: statusProp, focus: focusProp });

		return (
			<AlertDialogPrimitive.Title
				ref={ref}
				className={alertDialogTitleStyles({ className, status, focus })}
				{...props}
			/>
		);
	}
);

AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const alertDialogIconStyles = tv({
	base: "text-primary-fg",
	variants: {
		status: {
			success: "text-status-success",
			warning: "text-status-warning",
			error: "text-status-error",
			info: "text-status-info"
		},
		focus: {
			low: "",
			medium: "",
			high: "text-primary-bg"
		}
	} satisfies VariantsConfig<AlertVariants>,
	defaultVariants: {
		focus: "low"
	}
});

export type AlertDialogIconProps = IconProps & AlertVariants;

const AlertDialogIcon = React.forwardRef<SVGSVGElement, AlertDialogIconProps>(
	({ className, size, icon, status: statusProp, focus: focusProp, ...props }, ref) => {
		const { status, focus } = useAlert({ status: statusProp, focus: focusProp });

		return (
			<Icon
				ref={ref}
				icon={icon}
				size={size ?? "xl"}
				className={alertDialogIconStyles({ className, status, focus })}
				{...props}
			/>
		);
	}
);

AlertDialogIcon.displayName = "AlertDialogIcon";

const alertDialogDescriptionStyles = tv({
	base: "col-start-2 text-sm text-secondary-fg",
	variants: {
		focus: {
			low: "",
			medium: "",
			high: "text-primary-bg"
		}
	} satisfies VariantsConfig<AlertDialogDescriptionVariants>,
	defaultVariants: {
		focus: "low"
	}
});

type AlertDialogDescriptionVariants = Omit<AlertVariants, "status">;

export type AlertDialogDescriptionProps = React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description> &
	AlertDialogDescriptionVariants;

const AlertDialogDescription = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Description>,
	AlertDialogDescriptionProps
>(({ className, focus: focusProp, ...props }, ref) => {
	const { focus } = useAlert({ focus: focusProp });

	return (
		<AlertDialogPrimitive.Description
			ref={ref}
			className={alertDialogDescriptionStyles({ className, focus })}
			{...props}
		/>
	);
});

AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

const AlertDialogAction = React.forwardRef<React.ElementRef<typeof AlertDialogPrimitive.Action>, ButtonProps>(
	({ children, status: statusProp, variant, ...props }, ref) => {
		const { status, focus } = useAlert();

		const statusBtn = focus === "medium" ? status : "default";

		let variantBtn: ButtonProps["variant"] = "outline";
		if (focus === "high") variantBtn = "secondary";
		if (focus === "medium") variantBtn = "primary";

		return (
			<AlertDialogPrimitive.Action ref={ref} asChild>
				<Button status={statusProp || statusBtn} variant={variant || variantBtn} {...props}>
					{children}
				</Button>
			</AlertDialogPrimitive.Action>
		);
	}
);
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

type AlertDialogCancelVariants = Omit<AlertVariants, "status">;

const alertDialogCancelStyles = tv({
	base: "mt-2 sm:mt-0",
	variants: {
		focus: {
			low: "",
			medium: "",
			high: "text-white opacity-70"
		}
	} satisfies VariantsConfig<AlertDialogCancelVariants>
});

const AlertDialogCancel = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
	Omit<ButtonProps, "focus"> & AlertDialogCancelVariants
>(({ className, children, variant, ...props }, ref) => {
	const { focus } = useAlert();

	return (
		<AlertDialogPrimitive.Cancel ref={ref} asChild>
			<Button variant={variant || "text"} className={alertDialogCancelStyles({ className, focus })} {...props}>
				{children}
			</Button>
		</AlertDialogPrimitive.Cancel>
	);
});
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

const AlertDialogPrimitiveAction = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Action>,
	React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ ...props }, ref) => <AlertDialogPrimitive.Action ref={ref} {...props} />);

AlertDialogPrimitiveAction.displayName = "AlertDialogPrimitiveAction";

const AlertDialogPrimitiveCancel = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
	React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ ...props }, ref) => <AlertDialogPrimitive.Cancel ref={ref} {...props} />);

AlertDialogPrimitiveCancel.displayName = "AlertDialogPrimitiveCancel";

export {
	AlertDialog,
	AlertDialogPortal,
	AlertDialogOverlay,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogFooter,
	AlertDialogTitle,
	AlertDialogIcon,
	AlertDialogDescription,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogPrimitiveAction,
	AlertDialogPrimitiveCancel
};
