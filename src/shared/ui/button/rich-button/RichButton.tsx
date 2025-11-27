import React, { PropsWithChildren } from "react";
import { ButtonBase, ButtonBaseProps } from "../button-base/ButtonBase";
import { tv } from "tailwind-variants";
import { LucideIcon } from "lucide-react";
import { FeatureIcon } from "@/components/icon";
import { Description } from "@/components/description";
import { VariantsConfig } from "@/shared/lib/utils/variants";

export interface RichButtonVariants {
	size?: "sm" | "lg";
}

export const richButtonStyles = tv({
	slots: {
		base: "w-full justify-start",
		wrapper: "flex flex-col items-start",
		description: "",
		text: "font-semibold"
	},
	variants: {
		size: {
			sm: {
				base: "h-12 gap-2 rounded-xl px-2 py-1.5",
				description: "text-xs",
				text: "text-sm"
			},
			lg: {
				base: "h-[4.5rem] gap-3 rounded-2xl p-3",
				wrapper: "gap-1",
				description: "text-sm",
				text: "text-base"
			}
		}
	} satisfies VariantsConfig<RichButtonVariants>,
	defaultVariants: {
		size: "sm"
	}
});

export type RichButtonProps = ButtonBaseProps &
	RichButtonVariants & {
		title: React.ReactNode;
		description: React.ReactNode;
		icon: LucideIcon;
	};

export const RichButton = React.forwardRef<HTMLButtonElement, PropsWithChildren<RichButtonProps>>(
	({ icon, size, title, description, className, ...props }, ref) => {
		const styles = richButtonStyles({ size });
		const iconSize = size === "lg" ? "lg" : "md";

		return (
			<ButtonBase variant="outline" className={styles.base({ class: className })} ref={ref} {...props}>
				<FeatureIcon size={iconSize} type="primary" icon={icon}></FeatureIcon>

				<div className={styles.wrapper()}>
					<span className={styles.text()}>{title}</span>
					<Description className={styles.description()}>{description}</Description>
				</div>
			</ButtonBase>
		);
	}
);

RichButton.displayName = "RichButton";
