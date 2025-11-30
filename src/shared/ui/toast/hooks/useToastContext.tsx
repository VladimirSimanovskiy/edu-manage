import { createContext, useContext } from "react";
import { ToastProps } from "../ToastView";

type ToastContextType = ToastProps & {
	id?: number | string;
};

export const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider: React.FC<{
	children: React.ReactNode;
	value: ToastContextType;
}> = ({ children, value }) => {
	return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};

export const useToastContext = () => {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error("useToastContext must be used within a ToastProvider");
	}
	return context;
};
