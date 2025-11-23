import React from "react";
import { tv } from "tailwind-variants";
import { Slot } from "@radix-ui/react-slot";
import { PageStateVariants, usePageStateContext } from "../context/PageStateContext";
import { VariantsConfig } from "@/lib/utils/variants";

const pageStateTitleStyles = tv({
	base: "mt-5 font-semibold text-primary-fg",
	variants: {
		size: {
			sm: "text-base",
			md: "text-xl",
			lg: "text-2xl"
		}
	} satisfies VariantsConfig<PageStateVariants>
});

export type PageStateTitleProps = React.HTMLAttributes<HTMLHeadingElement> &
	PageStateVariants & {
		asChild?: boolean;
	};

export const PageStateTitle = React.forwardRef<HTMLHeadingElement, PageStateTitleProps>(
	({ className, size: propSize, asChild = false, ...props }, ref) => {
		const { size: contextSize } = usePageStateContext();
		const size = propSize || contextSize;

		const Comp = asChild ? Slot : "h2";
		return <Comp ref={ref} className={pageStateTitleStyles({ className, size })} {...props} />;
	}
);

PageStateTitle.displayName = "PageStateTitle";
