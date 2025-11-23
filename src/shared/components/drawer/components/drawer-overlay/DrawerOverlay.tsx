import { OverlayProps, overlayStyles } from "@/components/overlay/Overlay";
import React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

export const DrawerOverlay = React.forwardRef<
	React.ElementRef<typeof DrawerPrimitive.Overlay>,
	React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay> & {
		blur?: OverlayProps["blur"];
		type?: OverlayProps["type"];
	}
>(({ blur, type, ...props }, ref) => {
	return <DrawerPrimitive.Overlay ref={ref} className={overlayStyles({ blur, type })} {...props} />;
});

DrawerOverlay.displayName = "DrawerOverlay";
