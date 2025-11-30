import { useToastContext } from "../../hooks/useToastContext";
import { ToastViewProps } from "../../ToastView";
import { ToastCloseButton } from "../toast-close-action/ToastCloseButton";
import { tv } from "tailwind-variants";

const toastStyles = tv({
	slots: {
		contentWrapper: "flex flex-grow gap-3 py-2.5 pr-2.5"
	}
});

export const MediumToast: React.FC<ToastViewProps> = ({ titleIcon, ...styleProps }) => {
	const { titleText, close } = styleProps;
	const { contentWrapper } = toastStyles();
	const context = useToastContext();
	return (
		<>
			<div className={contentWrapper()}>
				{titleIcon}
				<span className={titleText()}>{context.title}</span>
			</div>
			{context.primaryAction && context.primaryAction}
			{context.closeAction && <ToastCloseButton className={close()} />}
		</>
	);
};
