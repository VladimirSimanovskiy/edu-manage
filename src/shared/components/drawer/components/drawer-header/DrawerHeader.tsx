import React from "react";
import { tv } from "tailwind-variants";

const drawerHeaderStyles = tv({
	base: "grid gap-1.5 bg-secondary-bg p-4 text-center sm:text-left"
});

const DrawerHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => <div ref={ref} className={drawerHeaderStyles({ className })} {...props} />
);

DrawerHeader.displayName = "DrawerHeader";

export { DrawerHeader };
