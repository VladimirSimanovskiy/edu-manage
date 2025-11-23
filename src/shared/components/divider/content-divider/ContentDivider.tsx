import React from "react";
import { PropsWithChildren } from "react";
import { tv } from "tailwind-variants";
import { Divider, DividerProps } from "../Divider";
import { VariantsConfig } from "@/lib/utils/variants";

export interface ContentDividerVariants {
	orientation?: "horizontal" | "vertical";
}

const contentDividerVariants = tv({
	base: "flex items-center gap-2",
	variants: {
		orientation: {
			vertical: "w-5 flex-col",
			horizontal: "h-5"
		}
	} satisfies VariantsConfig<ContentDividerVariants>,
	defaultVariants: {
		orientation: "horizontal"
	}
});

export type ContentDividerProps = ContentDividerVariants &
	PropsWithChildren<{
		wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
		dividerProps?: Omit<DividerProps, "orientation">;
	}>;

export const ContentDivider = React.forwardRef<HTMLDivElement, ContentDividerProps>(
	({ wrapperProps, dividerProps, orientation, children }, ref) => {
		return (
			<div
				ref={ref}
				{...wrapperProps}
				className={contentDividerVariants({ orientation, className: wrapperProps?.className })}
			>
				<Divider orientation={orientation} {...dividerProps} />
				{children}
				<Divider orientation={orientation} {...dividerProps} />
			</div>
		);
	}
);

ContentDivider.displayName = "ContentDivider";
