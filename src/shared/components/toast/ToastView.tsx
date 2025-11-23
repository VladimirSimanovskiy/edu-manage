import React from "react";
import { tv } from "tailwind-variants";
import { LargeToast } from "./components/large-toast/LargeToast";
import { MediumToast } from "./components/medium-toast/MediumToast";
import { SmallToast } from "./components/small-toast/SmallToast";
import { ToastAction } from "./components/toast-action/ToastAction";
import { ToastIcon } from "./components/toast-icon/ToastIcon";
import { ToastProvider } from "./hooks/useToastContext";
import { VariantsConfig } from "@/lib/utils/variants";

export interface ToastVariants {
	status?: "default" | "info" | "success" | "warning" | "error";
	focus?: "low" | "medium" | "high";
	size?: "sm" | "md" | "lg";
}

const toastStyles = tv({
	slots: {
		/**
		 * Ширина уведомления задается в переменной --width.
		 * Библиотека sonner не поддерживает динамические ширины и использует эту переменную для вычисления позиции уведомления.
		 */
		wrapper:
			"inline-flex w-[--width] items-start overflow-hidden rounded-lg border border-solid border-secondary-border",
		text: "flex min-w-0 flex-auto flex-col justify-center gap-1 truncate pr-3",
		titleText: "min-w-0 text-sm font-semibold text-primary-fg",
		descriptionText: "inline-block text-sm font-normal text-secondary-fg",
		contentWrapper: "flex items-center",
		content: "flex",
		actions: "flex items-center justify-center gap-2",
		close: "",
		divider: ""
	},
	variants: {
		status: {
			default: {
				wrapper: ""
			},
			success: {
				wrapper: "bg-status-success-bg"
			},
			info: {
				wrapper: "bg-status-info-bg"
			},
			warning: {
				wrapper: "bg-status-warning-bg"
			},
			error: {
				wrapper: "bg-status-error-bg"
			}
		},
		focus: {
			low: {
				wrapper: "bg-secondary-bg"
			},
			medium: {
				wrapper: "bg-status-neutral-bg"
			},
			high: {
				titleText: "text-white",
				descriptionText: "text-white/70",
				divider: "bg-white"
			}
		},
		size: {
			sm: {
				wrapper: "h-10 items-center pl-3 shadow-sm",
				titleText: "text-xs font-medium leading-5",
				contentWrapper: "gap-2"
			},
			md: {
				wrapper: "py-1.5 pl-4 pr-1.5 shadow-md",
				contentWrapper: "gap-3"
			},
			lg: {
				wrapper: "relative items-start p-4 shadow-lg",
				contentWrapper: "items-start gap-3",
				content: "flex flex-1 flex-col gap-4",
				actions: "justify-end self-stretch",
				close: "mr-[-16px] mt-[-16px]",
				titleText: "text-wrap"
			}
		}
	} satisfies VariantsConfig<ToastVariants>,
	defaultVariants: {
		status: "default",
		focus: "medium",
		size: "sm"
	},
	compoundVariants: [
		// Medium focus
		{
			status: "info",
			focus: "medium",
			class: {
				divider: "bg-status-info/30",
				wrapper: "border-status-info/30 bg-status-info-bg",
				titleText: "text-status-info"
			}
		},
		{
			status: "success",
			focus: "medium",
			class: {
				divider: "bg-status-success/30",
				wrapper: "border-status-success/30 bg-status-success-bg",
				titleText: "text-status-success"
			}
		},
		{
			status: "warning",
			focus: "medium",
			class: {
				divider: "bg-status-warning/30",
				wrapper: "border-status-warning/30 bg-status-warning-bg",
				titleText: "text-status-warning"
			}
		},
		{
			status: "error",
			focus: "medium",
			class: {
				divider: "bg-status-error/30",
				wrapper: "border-status-error/30 bg-status-error-bg",
				titleText: "text-status-error"
			}
		},
		// High focus
		{
			status: "default",
			focus: "high",
			class: {
				wrapper: "bg-primary",
				titleText: "text-primary-bg",
				descriptionText: "text-primary-bg/70",
				divider: "bg-primary-border"
			}
		},
		{
			status: "info",
			focus: "high",
			class: {
				wrapper: "bg-status-info"
			}
		},
		{
			status: "success",
			focus: "high",
			class: {
				wrapper: "bg-status-success"
			}
		},
		{
			status: "warning",
			focus: "high",
			class: {
				wrapper: "bg-status-warning"
			}
		},
		{
			status: "error",
			focus: "high",
			class: {
				wrapper: "bg-status-error"
			}
		}
	]
});

export type ToastProps = ToastVariants & {
	title: string | React.ReactNode;
	description?: string | React.ReactNode;
	icon?: React.ReactNode;
	primaryAction?: React.ReactElement<React.ComponentProps<typeof ToastAction>>;
	secondaryAction?: React.ReactElement<React.ComponentProps<typeof ToastAction>>;
	closeAction?: boolean;
	onClose?: () => void;
};

export type ToastSize = "sm" | "md" | "lg";

export const Toast = React.forwardRef<HTMLDivElement, ToastProps & { id?: number | string }>(
	({ closeAction = true, id, onClose, ...props }, ref) => {
		const { wrapper, titleText, descriptionText, actions, close, divider } = toastStyles({
			status: props.status,
			focus: props.focus,
			size: props.size
		});

		const titleIcon = props.icon ? <ToastIcon icon={props.icon} /> : null;

		const contextValue = {
			id,
			status: props.status,
			focus: props.focus,
			size: props.size,
			title: props.title,
			description: props.description,
			icon: props.icon,
			primaryAction: props.primaryAction,
			secondaryAction: props.secondaryAction,
			closeAction,
			onClose
		};

		const toastViewProps = {
			titleText,
			descriptionText,
			actions,
			close,
			divider,
			titleIcon
		};

		let toastView = null;
		const size = props.size || "md";
		if (size === "sm") {
			toastView = <SmallToast {...toastViewProps} />;
		} else if (size === "md") {
			toastView = <MediumToast {...toastViewProps} />;
		} else if (size === "lg") {
			toastView = <LargeToast {...toastViewProps} />;
		}

		return (
			<ToastProvider value={contextValue}>
				<div ref={ref} className={wrapper()}>
					{toastView}
				</div>
			</ToastProvider>
		);
	}
);

Toast.displayName = "Toast";

export default Toast;

export interface ToastViewProps {
	titleText: () => string;
	descriptionText: () => string;
	actions: () => string;
	close: () => string;
	divider: () => string;
	titleIcon: JSX.Element | null;
}
