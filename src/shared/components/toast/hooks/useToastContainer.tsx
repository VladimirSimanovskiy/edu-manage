import { createContext, useContext } from "react";
import { ToastProps } from "../ToastView";

type ToastContainerContextType = {
	addToast: (toast: Omit<ToastProps, "closeAction" | "onClose">) => number;
	removeToast: (id: number) => void;
};

export const ToastContainerContext = createContext<ToastContainerContextType | null>(null);

export const useToastContainer = () => {
	const context = useContext(ToastContainerContext);
	if (!context) {
		throw new Error("useToastContainer must be used within ToastContainer");
	}
	return context;
};
