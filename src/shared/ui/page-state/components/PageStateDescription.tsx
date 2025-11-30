import React from "react";
import { tv } from "tailwind-variants";
import { Slot } from "@radix-ui/react-slot";
import { PageStateVariants, usePageStateContext } from "../context/PageStateContext";
import { VariantsConfig } from "@/lib/utils/variants";

const pageStateDescriptionStyles = tv({
	base: "mt-2.5 text-center text-muted",
	variants: {
		size: {
			sm: "text-xs",
			md: "text-sm",
			lg: "text-base"
		}
	} satisfies VariantsConfig<PageStateVariants>
});

export type PageStateDescriptionProps = React.HTMLAttributes<HTMLDivElement> &
	PageStateVariants & {
		asChild?: boolean;
	};

export const PageStateDescription = React.forwardRef<HTMLDivElement, PageStateDescriptionProps>(
	({ className, size: propSize, asChild = false, children, ...props }, ref) => {
		const { size: contextSize } = usePageStateContext();
		const size = propSize || contextSize;

		const Comp = asChild ? Slot : "div";
		return (
			<Comp ref={ref} className={pageStateDescriptionStyles({ className, size })} {...props}>
				{children}
			</Comp>
		);
	}
);

PageStateDescription.displayName = "PageStateDescription";
