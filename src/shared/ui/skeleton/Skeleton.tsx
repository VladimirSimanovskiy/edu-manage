import { VariantsConfig } from "@/lib/utils/variants";
import { tv } from "tailwind-variants";

export interface SkeletonVariants {
	variant?: "default" | "light";
}

const skeletonStyles = tv({
	base: "animate-pulse rounded-xl bg-secondary-bg-hover",
	variants: {
		variant: {
			default: "",
			light: "opacity-50"
		}
	} satisfies VariantsConfig<SkeletonVariants>,
	defaultVariants: {
		variant: "default"
	}
});

type SkeletonProps = React.HTMLAttributes<HTMLDivElement> & SkeletonVariants;

export function Skeleton({ className, variant, ...props }: SkeletonProps) {
	return <div className={skeletonStyles({ className, variant })} {...props} />;
}
