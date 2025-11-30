import { ScrollShadowContainer } from "@/components/scroll-shadow-container";
import React from "react";
import { tv } from "tailwind-variants";

const drawerBodyStyles = tv({
	base: "overflow-auto bg-secondary-bg py-3",
	slots: {
		// Грид с 1 ячейкой задается, чтобы корректно отображался скролл
		wrapper: "grid h-full grid-cols-1 grid-rows-1"
	}
});

const DrawerBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, children, ...props }, ref) => {
		const styles = drawerBodyStyles();
		return (
			<ScrollShadowContainer wrapperClassName={styles.wrapper()} {...props} ref={ref}>
				<div className={styles.base({ className })} {...props}>
					{children}
				</div>
			</ScrollShadowContainer>
		);
	}
);

DrawerBody.displayName = "DrawerBody";

export { DrawerBody };
