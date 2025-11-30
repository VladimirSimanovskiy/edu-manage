import { ButtonProps } from "@/components/button/button/Button";
import { ToastProps } from "../ToastView";

type ActionType = "primary" | "secondary" | "close";

const getVariantByFocus = (toastFocus: ToastProps["focus"]): ButtonProps["variant"] => {
	const variantByFocus: Record<NonNullable<ToastProps["focus"]>, ButtonProps["variant"]> = {
		low: "ghost",
		medium: "secondary",
		high: "primary"
	};
	return variantByFocus[toastFocus ?? "low"];
};

export function getButtonProps(toastProps: ToastProps, actionType: ActionType): ButtonProps {
	const { size: toastSize, focus: toastFocus, status: toastStatus } = toastProps;
	const isHighFocusSmall = ["medium", "high"].includes(toastFocus ?? "") && toastSize === "sm";

	const baseProps: ButtonProps = {
		status: isHighFocusSmall ? toastStatus : "default"
	};

	if (actionType === "close") {
		return {
			...baseProps,
			size: toastSize === "lg" ? "xl" : "lg",
			variant: toastSize === "sm" ? getVariantByFocus(toastFocus) : "text"
		};
	}

	const variantBySize: Record<NonNullable<ToastProps["size"]>, ButtonProps["variant"]> = {
		sm: getVariantByFocus(toastFocus),
		md: "link",
		lg: actionType === "primary" ? (toastFocus === "high" ? "secondary" : "outline") : "text"
	};

	return {
		...baseProps,
		size: toastSize === "lg" ? "md" : "lg",
		variant: variantBySize[toastSize ?? "sm"]
	};
}
