import React from "react";
import { tv } from "tailwind-variants";
import { Button, ButtonProps } from "../button/button/Button";

const retryStyles = tv({
	base: "h-5 px-3 py-0"
});

export type RetryProps = Omit<ButtonProps, "size">;

/**
 * Компонент Retry - кнопка для повторного выполнения действия
 *
 * @example
 * <Retry onClick={handleRetry}>Повторить</Retry>
 */
export const Retry = React.forwardRef<HTMLButtonElement, RetryProps>(
	({ className, children = "Повторить", ...props }, ref) => {
		return (
			<Button ref={ref} variant="link" className={retryStyles({ className })} {...props}>
				{children}
			</Button>
		);
	}
);

Retry.displayName = "Retry";
