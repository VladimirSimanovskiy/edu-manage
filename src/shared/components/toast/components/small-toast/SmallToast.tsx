import { useToastContext } from "../../hooks/useToastContext";
import { ToastViewProps } from "../../ToastView";
import { ToastCloseButton } from "../toast-close-action/ToastCloseButton";
import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";
import { Divider } from "@/components/divider/Divider";

const toastStyles = tv({
	slots: {
		contentWrapper: "flex min-w-0 flex-grow items-center gap-2 pr-3",
		titleWrapper: "min-w-0 truncate"
	}
});

export const SmallToast: React.FC<ToastViewProps> = ({ titleIcon, ...styleProps }) => {
	const { titleText, close, divider } = styleProps;
	const { contentWrapper, titleWrapper } = toastStyles();
	const context = useToastContext();
	return (
		<>
			<div className={contentWrapper()}>
				{titleIcon}
				<div className={twMerge(titleWrapper(), titleText())}>
					<span>{context.title}</span>
				</div>
			</div>
			{context.primaryAction && (
				<>
					<Divider className={divider()} orientation="vertical" />
					{context.primaryAction}
				</>
			)}
			{context.closeAction && (
				<>
					<Divider className={divider()} orientation="vertical" />
					<ToastCloseButton className={close()} />
				</>
			)}
		</>
	);
};
