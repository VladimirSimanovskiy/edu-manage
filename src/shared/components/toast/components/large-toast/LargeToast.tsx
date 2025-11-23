import { useToastContext } from "../../hooks/useToastContext";
import { ToastViewProps } from "../../ToastView";
import { ToastCloseButton } from "../toast-close-action/ToastCloseButton";
import { tv } from "tailwind-variants";

const toastStyles = tv({
	slots: {
		contentWrapper: "flex w-full flex-col gap-4",
		topZone: "flex gap-3",
		textWrapper: "flex flex-grow flex-col gap-1",
		actionsWrapper: "flex w-full justify-end gap-2"
	}
});

export const LargeToast: React.FC<ToastViewProps> = ({ titleIcon, ...styleProps }) => {
	const { titleText, close, descriptionText } = styleProps;
	const { contentWrapper, topZone, textWrapper, actionsWrapper } = toastStyles();
	const context = useToastContext();
	return (
		<>
			<div className={contentWrapper()}>
				<div className={topZone()}>
					{titleIcon}
					<div className={textWrapper()}>
						<span className={titleText()}>{context.title}</span>
						{context.description && <span className={descriptionText()}>{context.description}</span>}
					</div>
					{context.closeAction && <ToastCloseButton className={close()} />}
				</div>
				{context.secondaryAction || context.primaryAction ? (
					<div className={actionsWrapper()}>
						{context.secondaryAction}
						{context.primaryAction}
					</div>
				) : null}
			</div>
		</>
	);
};
