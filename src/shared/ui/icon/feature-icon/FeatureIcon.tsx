import type { VariantsConfig } from "@/shared/lib/utils/variants";
import { LucideIcon } from "lucide-react";
import { tv } from "tailwind-variants";

export interface FeatureIconVariants {
	size?: "sm" | "md" | "lg";
	type?: "primary" | "secondary";
}

const featureIconVariants = tv({
	base: "flex items-center justify-center text-secondary-fg shadow-sm ring-1 ring-inset",
	variants: {
		size: {
			sm: "h-6 w-6 rounded-sm p-1.5",
			md: "h-8 w-8 rounded-md p-2",
			lg: "h-12 w-12 rounded-lg p-3"
		},
		type: {
			primary: "bg-secondary-bg-hover ring-primary-border",
			secondary: "bg-primary-bg ring-secondary-border"
		}
	} satisfies VariantsConfig<FeatureIconVariants>,
	defaultVariants: {
		size: "md",
		type: "secondary"
	}
});

export type FeatureIconProps = FeatureIconVariants & {
	icon: LucideIcon;
	className?: string;
};

export const FeatureIcon: React.FC<FeatureIconProps> = ({ icon: Icon, size, type, className }) => {
	return <Icon className={featureIconVariants({ size, type, className })} />;
};
