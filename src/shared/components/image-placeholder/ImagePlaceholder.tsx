import { VariantsConfig } from "@/lib/utils/variants";
import React from "react";
import { tv } from "tailwind-variants";

export interface ImagePlaceholderVariants {
	size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const imagePlaceholderStyles = tv({
	base: "aspect-square rounded-xl border border-dashed border-primary-border",
	variants: {
		size: {
			xs: "h-[3.75rem] w-[3.75rem]",
			sm: "h-20 w-20",
			md: "h-[7.5rem] w-[7.5rem]",
			lg: "h-[11.5rem] w-[11.5rem]",
			xl: "h-96 w-96"
		}
	} satisfies VariantsConfig<ImagePlaceholderVariants>
});

export type ImagePlaceholderProps = React.HTMLAttributes<HTMLDivElement> & ImagePlaceholderVariants;

export const ImagePlaceholder = React.forwardRef<HTMLDivElement, ImagePlaceholderProps>(
	({ className, size, ...props }, ref) => {
		return <div ref={ref} className={imagePlaceholderStyles({ className, size })} {...props} />;
	}
);

ImagePlaceholder.displayName = "ImagePlaceholder";
