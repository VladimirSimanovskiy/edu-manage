import React from "react";
import { tv } from "tailwind-variants";
import { useToastContext } from "../../hooks/useToastContext";
import { getButtonProps } from "../../utils/ToastUtils";
import { Button } from "@/components/button/button/Button";

const toastActionVariants = tv({
	variants: {
		actionType: {
			primary: "",
			/*
			 * Доступен только для toast размером sm и md
			 */
			secondary: ""
		},
		status: {
			default: "",
			info: "",
			success: "",
			warning: "",
			error: ""
		},
		focus: {
			low: "",
			medium: "",
			high: ""
		},
		size: {
			sm: "h-full rounded-none px-3 py-3 text-xs font-semibold leading-none",
			md: "rounded-none px-3 py-2 text-sm",
			lg: ""
		}
	},
	defaultVariants: {
		actionType: "primary"
	},
	compoundVariants: [
		// Small size
		{
			actionType: "primary",
			size: "sm",
			focus: "medium",
			className: "text-primary-fg"
		},
		{
			actionType: "primary",
			status: "default",
			size: "sm",
			focus: "high",
			className: "bg-status-neutral hover:bg-status-neutral-hover"
		},
		// Medium size
		{
			actionType: "primary",
			size: "md",
			focus: "high",
			status: "default",
			className: "text-primary-bg/70 hover:text-primary-bg"
		},
		{
			actionType: "primary",
			size: "md",
			focus: "high",
			status: ["info", "success", "warning", "error"],
			className: "text-white/70 hover:text-white"
		},
		// Large size
		{
			actionType: "primary",
			size: "lg",
			className: "px-4 py-2"
		},
		{
			actionType: "primary",
			size: "lg",
			focus: "low",
			status: "default",
			className: "bg-secondary-bg"
		},
		{
			actionType: "primary",
			size: "lg",
			focus: "high",
			status: "default",
			className: "bg-primary-bg"
		},
		{
			actionType: "primary",
			size: "lg",
			focus: "medium",
			status: "default",
			className: "bg-status-neutral"
		},
		{
			actionType: "secondary",
			size: "lg",
			className: "p-2"
		},
		{
			actionType: "primary",
			size: "lg",
			focus: "high",
			status: ["info", "success", "warning", "error"],
			className: "bg-white/70 text-black hover:bg-white"
		},
		{
			actionType: "secondary",
			size: "lg",
			focus: "high",
			status: "default",
			className: "text-primary-bg/70 hover:text-primary-bg"
		},
		{
			actionType: "secondary",
			size: "lg",
			focus: "high",
			status: ["info", "success", "warning", "error"],
			className: "text-white/70 hover:text-white"
		}
	]
});

export type ToastActionProps = React.PropsWithChildren<{
	onClick?: () => void;
}>;

export const ToastAction: React.FC<ToastActionProps> = ({ children, onClick }) => {
	const toastProps = useToastContext();

	if (!toastProps) {
		throw new Error("ToastAction must be used within Toast");
	}

	const actionType = toastProps.primaryAction?.props.children === children ? "primary" : "secondary";
	if (actionType === "secondary" && ["sm", "md"].includes(toastProps.size ?? "")) return null;
	const buttonProps = getButtonProps(toastProps, actionType);

	if (actionType === "primary" && toastProps.size === "lg" && toastProps.focus === "medium") {
		buttonProps.status = toastProps.status;
		buttonProps.variant = "primary";
	}

	return (
		<Button
			{...buttonProps}
			onClick={onClick}
			className={toastActionVariants({
				actionType,
				size: toastProps.size,
				focus: toastProps.focus,
				status: toastProps.status
			})}
		>
			{children}
		</Button>
	);
};
