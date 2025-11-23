import React from "react";
import { Button, ButtonProps } from "@/components/button/button/Button";
import { usePageStateButtonSize } from "../hooks/usePageStateButtonSize";

export const PageStateAction = React.forwardRef<HTMLButtonElement, ButtonProps>(({ children, size, ...props }, ref) => {
	const buttonSize = usePageStateButtonSize();

	return (
		<Button ref={ref} variant="primary" size={size || buttonSize} {...props}>
			{children}
		</Button>
	);
});

PageStateAction.displayName = "PageStateAction";
