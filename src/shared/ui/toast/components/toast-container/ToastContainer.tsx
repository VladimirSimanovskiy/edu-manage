import React, { useState } from "react";
import { Toast, ToastProps } from "../../ToastView";
import { tv } from "tailwind-variants";
import { ToastContainerContext } from "../../hooks/useToastContainer";

const containerStyles = tv({
	base: "fixed bottom-0 right-0 z-50 flex flex-col items-end gap-2 p-4"
});

type ToastItem = Omit<ToastProps, "onClose"> & {
	id: number;
};

let toastId = 0;

export const ToastContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [toasts, setToasts] = useState<ToastItem[]>([]);

	const addToast = (toast: Omit<ToastProps, "closeAction" | "onClose">) => {
		const id = toastId++;
		setToasts((prev) => [...prev, { ...toast, id }]);
		return id;
	};

	const removeToast = (id: number) => {
		setToasts((prev) => prev.filter((toast) => toast.id !== id));
	};

	return (
		<ToastContainerContext.Provider value={{ addToast, removeToast }}>
			{children}
			<div className={containerStyles()}>
				{toasts.map((toast) => (
					<Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
				))}
			</div>
		</ToastContainerContext.Provider>
	);
};
