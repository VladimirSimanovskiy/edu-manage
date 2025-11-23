import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import * as React from "react";
import { tv } from "tailwind-variants";
import { Dialog, DialogClose, DialogOverlay, DialogPortal, DialogTrigger } from "../dialog/Dialog";
import { FormBody } from "../form/components/form-body/FormBody";
import { FormFooter } from "../form/components/form-footer/FormFooter";
import { formDescriptionStyles, FormHeader, formTitleStyles } from "../form/components/form-header/FormHeader";
import { Icon } from "../icon";
import { overlayStyles, OverlayVariants } from "../overlay/Overlay";
import { usePortalContainer } from "../portal-container";

const Modal = Dialog;
Modal.displayName = "Modal";

const ModalTrigger = DialogTrigger;
ModalTrigger.displayName = "ModalTrigger";

const ModalPortal = DialogPortal;
ModalPortal.displayName = "ModalPortal";

const ModalTitle = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Title>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => {
	const styles = formTitleStyles({ class: className });
	return <DialogPrimitive.Title ref={ref} className={styles} {...props} />;
});
ModalTitle.displayName = "ModalTitle";

const ModalDescription = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Description>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => {
	const styles = formDescriptionStyles({ class: className });
	return <DialogPrimitive.Description ref={ref} className={styles} {...props} />;
});
ModalDescription.displayName = "ModalDescription";

const ModalHeader = FormHeader;
ModalHeader.displayName = "ModalHeader";

const ModalBody = FormBody;
ModalBody.displayName = "ModalBody";

const ModalFooter = FormFooter;
ModalFooter.displayName = "ModalFooter";

const ModalClose = DialogClose;
ModalClose.displayName = "ModalClose";

const modalOverlayStyles = tv({ extend: overlayStyles });

interface ModalOverlayProps extends React.ComponentPropsWithoutRef<typeof DialogOverlay>, OverlayVariants {}

const ModalOverlay = React.forwardRef<React.ElementRef<typeof DialogOverlay>, ModalOverlayProps>(
	({ className, blur, type, ...props }, ref) => (
		<DialogOverlay ref={ref} className={modalOverlayStyles({ class: className, blur, type })} {...props} />
	)
);
ModalOverlay.displayName = DialogOverlay.displayName;

const modalContentStyles = tv({
	base: [
		"fixed left-[50%] top-[45%] z-50 max-h-[min(90vh,calc(100vh-44px))] w-full max-w-[min(480px,calc(100vw-32px))] translate-x-[-50%] translate-y-[-45%] lg:top-[35%] lg:max-h-[min(90vh,830px)] lg:max-w-[min(544px,calc(100vw-32px))] lg:translate-y-[-35%]",
		"flex flex-col gap-0 overflow-hidden rounded-xl bg-secondary-bg p-0 shadow-lg",
		"duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]"
	],
	slots: {
		closeButton: "absolute right-0 z-50 h-11 w-11 p-3.5 text-muted lg:right-2 lg:top-2 lg:p-3",
		closeIcon: "h-4 w-4 lg:h-5 lg:w-5"
	}
});

type BackgroundProps = OverlayVariants;

const ModalContent = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
		overlayBlur?: BackgroundProps["blur"];
		overlayType?: BackgroundProps["type"];
		showCloseButton?: boolean;
		/**
		 * Контейнер для портала. Если не указан, используется хук usePortalContainer
		 * для поиска PortalContainer
		 */
		portalContainer?: HTMLElement;
	}
>((props, ref) => {
	const {
		className,
		children,
		overlayBlur,
		overlayType,
		showCloseButton = true,
		portalContainer,
		...restProps
	} = props;
	const styles = modalContentStyles();
	const container = usePortalContainer(portalContainer);
	return (
		<DialogPortal container={container}>
			<ModalOverlay blur={overlayBlur} type={overlayType} />
			<DialogPrimitive.Content ref={ref} className={styles.base({ className })} {...restProps}>
				{children}
				{showCloseButton && (
					<ModalClose className={styles.closeButton()}>
						<Icon className={styles.closeIcon()} size="lg" icon={X}></Icon>
					</ModalClose>
				)}
			</DialogPrimitive.Content>
		</DialogPortal>
	);
});
ModalContent.displayName = "ModalContent";

export {
	Modal,
	ModalBody,
	ModalClose,
	ModalContent,
	ModalDescription,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	ModalPortal,
	ModalTitle,
	ModalTrigger
};
