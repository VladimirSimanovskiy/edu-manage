import { PopoverContent } from "@/components/popover";
import React, { ComponentPropsWithoutRef } from "react";
import { tv } from "tailwind-variants";

type SearchSelectContentProps = ComponentPropsWithoutRef<typeof PopoverContent>;

const searchSelectContentStyles = tv({
	base: "w-full min-w-[var(--radix-popper-anchor-width)] border-secondary-border p-0"
});

/**
 * Контейнер содержимого для SearchSelect.
 * Обертка вокруг PopoverContent с настроенными стилями и интеграцией с Command.
 * Планируется рефакторинг для вынесения input логики.
 */
export const SearchSelectContent = React.forwardRef<React.ElementRef<typeof PopoverContent>, SearchSelectContentProps>(
	({ className, children, ...props }, ref) => {
		return (
			<PopoverContent ref={ref} className={searchSelectContentStyles({ className })} align="start" {...props}>
				{children}
			</PopoverContent>
		);
	}
);

SearchSelectContent.displayName = "SearchSelectContent";
