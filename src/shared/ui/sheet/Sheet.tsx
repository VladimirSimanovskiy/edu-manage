import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { tv } from "tailwind-variants";
import { X } from "lucide-react";
import { overlayStyles, OverlayVariants } from "../overlay/Overlay";
import { usePortalContainer } from "../portal-container";
import { Icon } from "../icon";
import { VariantsConfig } from "@/lib/utils/variants";

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

const sheetOverlayStyles = tv({ extend: overlayStyles });

interface SheetOverlayProps extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>, OverlayVariants {}

const SheetOverlay = React.forwardRef<React.ElementRef<typeof SheetPrimitive.Overlay>, SheetOverlayProps>(
	({ className, blur, type, ...props }, ref) => (
		<SheetPrimitive.Overlay className={sheetOverlayStyles({ blur, type, className })} {...props} ref={ref} />
	)
);
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetCloseButtonStyles = tv({
	base: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
});

const SheetCloseButton = React.forwardRef<
	React.ElementRef<typeof SheetPrimitive.Close>,
	React.ComponentPropsWithoutRef<typeof SheetPrimitive.Close>
>(({ className, ...props }, ref) => (
	<SheetPrimitive.Close ref={ref} className={sheetCloseButtonStyles({ className })} {...props}>
		<Icon icon={X} />
		<span className="sr-only">Close</span>
	</SheetPrimitive.Close>
));

SheetCloseButton.displayName = SheetPrimitive.Close.displayName;

export interface SheetContentVariants {
	side?: "top" | "bottom" | "left" | "right";
}

const sheetContentStyles = tv({
	base: "fixed z-50 flex flex-col bg-background shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
	variants: {
		side: {
			top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
			bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
			left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
			right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
		}
	} satisfies VariantsConfig<SheetContentVariants>,
	defaultVariants: {
		side: "right"
	}
});

interface SheetContentProps
	extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
		SheetContentVariants {
	showCloseButton?: boolean;
	overlayType?: OverlayVariants["type"];
	overlayBlur?: OverlayVariants["blur"];
	/**
	 * Контейнер для портала. Если не указан, используется хук usePortalContainer
	 * для поиска PortalContainer
	 */
	portalContainer?: HTMLElement;
}

const SheetContent = React.forwardRef<React.ElementRef<typeof SheetPrimitive.Content>, SheetContentProps>(
	(
		{
			side = "right",
			className,
			children,
			showCloseButton = true,
			overlayType,
			overlayBlur,
			portalContainer,
			...props
		},
		ref
	) => {
		const styles = sheetContentStyles({ side, className });
		const container = usePortalContainer(portalContainer);

		return (
			<SheetPortal container={container}>
				<SheetOverlay type={overlayType} blur={overlayBlur} />
				<SheetPrimitive.Content ref={ref} className={styles} {...props}>
					{children}
					{showCloseButton && <SheetCloseButton />}
				</SheetPrimitive.Content>
			</SheetPortal>
		);
	}
);

SheetContent.displayName = SheetPrimitive.Content.displayName;

const sheetHeaderStyles = tv({
	base: "flex flex-col space-y-2 p-6 text-center sm:text-left"
});

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={sheetHeaderStyles({ className })} {...props} />
);

SheetHeader.displayName = "SheetHeader";

const sheetFooterStyles = tv({
	base: "flex flex-col-reverse p-6 pt-0 sm:flex-row sm:justify-end sm:space-x-2"
});

const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={sheetFooterStyles({ className })} {...props} />
);

SheetFooter.displayName = "SheetFooter";

const sheetTitleStyles = tv({
	base: "text-lg font-semibold text-foreground"
});

const SheetTitle = React.forwardRef<
	React.ElementRef<typeof SheetPrimitive.Title>,
	React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
	<SheetPrimitive.Title ref={ref} className={sheetTitleStyles({ className })} {...props} />
));

SheetTitle.displayName = SheetPrimitive.Title.displayName;

const sheetDescriptionStyles = tv({
	base: "text-sm text-muted-foreground"
});

const SheetDescription = React.forwardRef<
	React.ElementRef<typeof SheetPrimitive.Description>,
	React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
	<SheetPrimitive.Description ref={ref} className={sheetDescriptionStyles({ className })} {...props} />
));

SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
	Sheet,
	SheetPortal,
	SheetOverlay,
	SheetTrigger,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetFooter,
	SheetTitle,
	SheetDescription
};
