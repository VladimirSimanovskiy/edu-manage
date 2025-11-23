import { createContext } from "react";
import { ToastProps } from "../ToastView";

type ToastContextType = ToastProps & {
	id?: number;
};

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider: React.FC<{
	children: React.ReactNode;
	value: ToastContextType;
}> = ({ children, value }) => {
	return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};
