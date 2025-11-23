import React from "react";
import { tv } from "tailwind-variants";

const drawerFooterStyles = tv({
	base: "mt-auto flex flex-col gap-2 bg-secondary-bg p-4"
});

const DrawerFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => <div ref={ref} className={drawerFooterStyles({ className })} {...props} />
);

DrawerFooter.displayName = "DrawerFooter";

export { DrawerFooter };
