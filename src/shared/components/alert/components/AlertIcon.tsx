import { Icon, IconProps } from "@/components/icon/Icon";
import React from "react";
import { tv } from "tailwind-variants";
import { useAlert } from "../AlertContext";
import { AlertVariants } from "../Alert";
import { VariantsConfig } from "@/lib/utils/variants";

type AlertIconVariants = Omit<AlertVariants, "focus">;

const alertIconStyles = tv({
	base: "text-status-default mr-3 translate-y-0.5",
	variants: {
		status: {
			success: "text-status-success-hover",
			warning: "text-status-warning-hover",
			error: "text-status-error-hover",
			info: "text-status-info-hover"
		}
	} satisfies VariantsConfig<AlertIconVariants>
});

export type AlertIconProps = IconProps & AlertIconVariants;

/**
 * Компонент AlertIcon для отображения иконки алерта
 */
export const AlertIcon = React.forwardRef<SVGSVGElement, AlertIconProps>(
	({ className, status: statusProp, ...props }, ref) => {
		const { status } = useAlert({ status: statusProp });

		return <Icon ref={ref} className={alertIconStyles({ status, className })} {...props} />;
	}
);

AlertIcon.displayName = "AlertIcon";
