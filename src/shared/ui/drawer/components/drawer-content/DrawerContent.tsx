import React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { DrawerOverlay } from "../drawer-overlay/DrawerOverlay";
import { DrawerPortal } from "../../Drawer";
import { DrawerHandler } from "../drawer-handler/DrawerHandler";
import { tv } from "tailwind-variants";
import { OverlayProps } from "@/components/overlay/Overlay";
import { usePortalContainer } from "../../../portal-container";

const drawerStyles = tv({
	base: "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto max-h-[calc(100vh-44px)] flex-col rounded-t-2xl after:!bg-secondary-bg"
});

const DrawerContent = React.forwardRef<
	React.ElementRef<typeof DrawerPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> & {
		overlayBlur?: OverlayProps["blur"];
		overlayType?: OverlayProps["type"];
		/**
		 * Контейнер для портала. Если не указан, используется хук usePortalContainer
		 * для поиска PortalContainer
		 */
		portalContainer?: HTMLElement;
	}
>(({ className, children, overlayBlur, overlayType, portalContainer, ...props }, ref) => {
	const container = usePortalContainer(portalContainer);
	return (
		<DrawerPortal container={container}>
			<DrawerOverlay blur={overlayBlur} type={overlayType} />
			<DrawerPrimitive.Content ref={ref} className={drawerStyles({ className })} {...props}>
				<DrawerHandler />
				{children}
			</DrawerPrimitive.Content>
		</DrawerPortal>
	);
});
DrawerContent.displayName = "DrawerContent";

export { DrawerContent };
