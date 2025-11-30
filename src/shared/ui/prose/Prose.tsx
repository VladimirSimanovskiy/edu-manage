import { PropsWithChildren } from "react";
import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export type ProseProps = React.HTMLAttributes<HTMLDivElement> & {
	asChild?: boolean;
};

export const Prose = React.forwardRef<HTMLDivElement, PropsWithChildren<ProseProps>>(
	({ className, children, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "div";

		return (
			<Comp className={cn("prose max-w-none", className)} ref={ref} {...props}>
				{children}
			</Comp>
		);
	}
);

Prose.displayName = "Prose";
