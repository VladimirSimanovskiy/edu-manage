import React from "react";
import { tv } from "tailwind-variants";
import { useToastContext } from "../../hooks/useToastContext";
import { X } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { getButtonProps } from "../../utils/ToastUtils";
import { IconButton } from "@/components/button/icon-button/IconButton";

const toastCloseButtonVariants = tv({
	variants: {
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
			sm: "h-full rounded-none",
			md: "",
			lg: ""
		}
	},
	compoundVariants: [
		{
			size: "sm",
			focus: "medium",
			className: "text-primary-fg"
		},
		{
			size: "sm",
			focus: "high",
			status: "default",
			className: "bg-status-neutral hover:bg-status-neutral-hover"
		},
		{
			size: ["md", "lg"],
			focus: "high",
			status: "default",
			className: "text-primary-bg/70 hover:text-primary-bg"
		},
		{
			size: ["md", "lg"],
			focus: "high",
			status: ["info", "success", "warning", "error"],
			className: "text-white/70 hover:text-white"
		}
	]
});

export const ToastCloseButton: React.FC<{ className?: string }> = ({ className }) => {
	const toastProps = useToastContext();

	if (!toastProps) {
		throw new Error("ToastCloseButton must be used within Toast");
	}
	const buttonProps = getButtonProps(toastProps, "close");
	return (
		<IconButton
			{...buttonProps}
			icon={X}
			onClick={toastProps.onClose}
			className={twMerge(
				toastCloseButtonVariants({
					size: toastProps.size,
					focus: toastProps.focus,
					status: toastProps.status
				}),
				className
			)}
		/>
	);
};
