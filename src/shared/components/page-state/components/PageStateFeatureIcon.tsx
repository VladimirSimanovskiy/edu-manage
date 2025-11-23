import React from "react";
import { tv } from "tailwind-variants";
import { PageStateVariants, usePageStateContext } from "../context/PageStateContext";
import { FeatureIcon } from "@/components/icon";
import { FeatureIconProps } from "@/components/icon/feature-icon/FeatureIcon";
import { VariantsConfig } from "@/lib/utils/variants";

const pageStateFeatureIconStyles = tv({
	base: "rounded-full bg-alpha-high-80 p-3.5 text-secondary-bg backdrop-blur-sm",
	variants: {
		size: {
			sm: "h-12 w-12",
			md: "h-14 w-14",
			lg: "h-14 w-14"
		}
	} satisfies VariantsConfig<PageStateVariants>
});

export type PageStateFeatureIconProps = FeatureIconProps & PageStateVariants;

export const PageStateFeatureIcon: React.FC<FeatureIconProps> = ({ className, size: sizeProp, icon, ...props }) => {
	const { size } = usePageStateContext();

	return (
		<FeatureIcon
			icon={icon}
			className={pageStateFeatureIconStyles({ className, size: sizeProp || size })}
			{...props}
		/>
	);
};

PageStateFeatureIcon.displayName = "PageStateFeatureIcon";
