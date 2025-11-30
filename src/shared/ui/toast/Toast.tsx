import { ExternalToast, Toaster as SonnerToaster, toast as sonnerToast } from "sonner";
import Toast, { ToastProps } from "./ToastView";
import { ToastAction } from "./components/toast-action/ToastAction";
import { UI_KIT_CLASS_NAME } from "../../uiKitClassName";

export const Toaster = SonnerToaster;

export type ToastOptions = Pick<ToastProps, "description" | "icon" | "size" | "status" | "focus" | "closeAction"> & {
	/** Вызывается при закрытии уведомления с помощью кнопки закрытия или с помощью свайпа */
	onDismiss?: () => void;
	/** Вызывается при закрытии уведомления при автоматическом закрытии через duration */
	onAutoClose?: () => void;
	/** Если false, пользователь не сможет закрыть уведомление */
	dismissible?: boolean;
	/** Время в ms, через которое уведомление будет закрыто */
	duration?: number;
	/** Позиция уведомления */
	position?: "top-center" | "top-right" | "top-left" | "bottom-center" | "bottom-right" | "bottom-left";
	/** Основное действие */
	primaryAction?: ToastActionData;
	/** Вспомогательное действие */
	secondaryAction?: ToastActionData;

	id?: number | string;
};

export type ToastActionData = {
	title: string;
	onClick: () => void;
	icon?: React.ReactNode;
};

export const toast = (message: string, options: ToastOptions = {}) => {
	const data: ExternalToast = {
		onDismiss: options.onDismiss,
		onAutoClose: options.onAutoClose,
		duration: options.duration,
		dismissible: options.dismissible,
		position: options.position
	};
	if (options.id != null) data.id = options.id;
	return sonnerToast.custom((id) => {
		return (
			<div className={UI_KIT_CLASS_NAME}>
				<Toast
					title={message}
					{...options}
					primaryAction={
						options.primaryAction ? (
							<ToastAction
								onClick={() => {
									options.primaryAction?.onClick();
									sonnerToast.dismiss(id);
								}}
							>
								{options.primaryAction.title}
							</ToastAction>
						) : undefined
					}
					secondaryAction={
						options.secondaryAction ? (
							<ToastAction
								onClick={() => {
									options.secondaryAction?.onClick();
									sonnerToast.dismiss(id);
								}}
							>
								{options.secondaryAction.title}
							</ToastAction>
						) : undefined
					}
					onClose={() => {
						if (options.dismissible !== false) {
							sonnerToast.dismiss(id);
							options.onDismiss?.();
						}
					}}
				/>
			</div>
		);
	}, data);
};

export const dismiss = sonnerToast.dismiss;

export type CustomToastProps = {
	id: number | string;
	toast: typeof sonnerToast;
};

export type CustomToastOptions = ExternalToast;

export const customToast = (jsx: (props: CustomToastProps) => React.ReactElement, options: CustomToastOptions = {}) => {
	return sonnerToast.custom((id) => jsx({ id, toast: sonnerToast }), options);
};
