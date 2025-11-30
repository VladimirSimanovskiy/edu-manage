import { useCallback } from "react";
import { ToastProps } from "../ToastView";
import { useToastContainer } from "./useToastContainer";

type ToastOptions = Omit<ToastProps, "closeAction" | "onClose">;

export const useToast = () => {
	const { addToast } = useToastContainer();

	const toast = useCallback(
		(options: ToastOptions) => {
			return addToast(options);
		},
		[addToast]
	);

	return { toast };
};
