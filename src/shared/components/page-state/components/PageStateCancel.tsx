import React from "react";
import { Button, ButtonProps } from "@/components/button/button/Button";
import { usePageStateButtonSize } from "../hooks/usePageStateButtonSize";

export const PageStateCancel = React.forwardRef<HTMLButtonElement, ButtonProps>(({ children, size, ...props }, ref) => {
	const buttonSize = usePageStateButtonSize();

	return (
		<Button ref={ref} variant="outline" size={size || buttonSize} {...props}>
			{children}
		</Button>
	);
});

PageStateCancel.displayName = "PageStateCancel";
