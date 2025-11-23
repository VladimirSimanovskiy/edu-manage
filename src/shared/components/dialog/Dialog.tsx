import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as React from "react";
import { tv } from "tailwind-variants";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const dialogOverlayStyle = tv({
	base: "fixed inset-0 z-50 bg-slate-950/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
});

const DialogOverlay = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Overlay>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Overlay ref={ref} className={dialogOverlayStyle({ className })} {...props} />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const dialogContentStyle = tv({
	base: "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg"
});

const DialogContent = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => {
	const styles = dialogContentStyle({ className });
	return (
		<DialogPortal>
			<DialogOverlay />
			<DialogPrimitive.Content ref={ref} className={styles} {...props}>
				{children}
			</DialogPrimitive.Content>
		</DialogPortal>
	);
});
DialogContent.displayName = DialogPrimitive.Content.displayName;

const dialogHeaderStyle = tv({
	base: "flex flex-col space-y-1.5 text-center sm:text-left"
});
const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
	const styles = dialogHeaderStyle({ class: className });
	return <div className={styles} {...props} />;
};
DialogHeader.displayName = "DialogHeader";

const dialogFooterStyle = tv({
	base: "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2"
});
const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
	const styles = dialogFooterStyle({ class: className });
	return <div className={styles} {...props} />;
};
DialogFooter.displayName = "DialogFooter";

const dialogTitleStyle = tv({
	base: "text-lg font-semibold leading-none tracking-tight"
});
const DialogTitle = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Title>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => {
	const styles = dialogTitleStyle({ class: className });
	return <DialogPrimitive.Title ref={ref} className={styles} {...props} />;
});
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const dialogDescriptionStyle = tv({
	base: "text-sm text-muted-foreground"
});
const DialogDescription = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Description>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => {
	const styles = dialogDescriptionStyle({ class: className });
	return <DialogPrimitive.Description ref={ref} className={styles} {...props} />;
});
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger
};
