import React from "react";
import { CircleAlert, Info, CircleCheckBig, TriangleAlert, LucideIcon } from "lucide-react";
import { tv } from "tailwind-variants";
import { useToastContext } from "../../hooks/useToastContext";
import { Icon } from "@/components/icon/Icon";

const titleIconStyles = tv({
	slots: {
		wrapper: "flex h-5 w-5 items-center justify-center",
		icon: "h-4 w-4 [&>svg]:h-4 [&>svg]:w-4"
	},
	variants: {
		status: {
			default: { wrapper: "text-status-neutral" },
			info: { wrapper: "text-status-info" },
			success: { wrapper: "text-status-success" },
			warning: { wrapper: "text-status-warning" },
			error: { wrapper: "text-status-error" }
		},
		focus: {
			low: "",
			medium: "",
			high: { wrapper: "text-secondary-bg" }
		}
	},
	compoundVariants: [
		{
			status: ["info", "success", "warning", "error"],
			focus: "high",
			class: { wrapper: "text-white" }
		}
	]
});

export type ToastIconProps = {
	icon?: React.ReactNode;
};

export const ToastIcon: React.FC<ToastIconProps> = ({ icon }) => {
	const toastProps = useToastContext();
	if (!toastProps) {
		throw new Error("ToastIcon must be used within Toast");
	}

	const { wrapper, icon: iconClass } = titleIconStyles({ focus: toastProps.focus, status: toastProps.status });
	const DefaultIcon = defaultTitleIcons[toastProps.status ?? "default"];

	const renderIcon = () => {
		if (icon) {
			return <div className={iconClass()}>{icon}</div>;
		}
		return <Icon icon={DefaultIcon} className={iconClass()} />;
	};

	return <div className={wrapper()}>{renderIcon()}</div>;
};

const defaultTitleIcons: Record<string, LucideIcon> = {
	default: CircleAlert,
	info: Info,
	success: CircleCheckBig,
	warning: TriangleAlert,
	error: CircleAlert
};
