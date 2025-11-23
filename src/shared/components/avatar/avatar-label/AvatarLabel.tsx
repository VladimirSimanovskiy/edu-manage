import * as React from "react";
import { tv } from "tailwind-variants";
import { AvatarLabelContext, AvatarLabelChild } from "./AvatarLabelContext";
import { VariantsConfig } from "@/lib/utils/variants";

export interface AvatarLabelVariants {
	size?: "sm" | "md" | "lg" | "xl";
}

const avatarLabelStyles = tv({
	slots: {
		wrapper: "flex flex-row items-center gap-2",
		avatarWrapper: "relative",
		textWrapper: "flex flex-col",
		indicator: "absolute bottom-0 right-0 rounded-full border border-secondary-bg"
	},
	variants: {
		size: {
			sm: {},
			md: {},
			lg: {
				wrapper: "gap-3"
			},
			xl: {
				wrapper: "gap-4"
			}
		}
	} satisfies VariantsConfig<AvatarLabelVariants>,
	defaultVariants: {
		size: "md"
	}
});

type AvatarLabelProps = Omit<React.ComponentPropsWithoutRef<"div">, "title"> & AvatarLabelVariants;

export const AvatarLabel = React.forwardRef<HTMLDivElement, AvatarLabelProps>(
	({ className, children, size, ...props }, ref) => {
		const contextValue = React.useMemo(() => ({ size }), [size]);

		const sortedComponents = React.useMemo(() => {
			if (!children) return null;

			const childrenArray = React.Children.toArray(children) as React.ReactElement[];
			let avatar: React.ReactElement | null = null;
			let indicator: React.ReactElement | null = null;
			let title: React.ReactElement | null = null;
			let description: React.ReactElement | null = null;

			childrenArray.forEach((child) => {
				const componentType = (child.type as AvatarLabelChild)?.componentType;

				if (componentType === "avatar") {
					avatar = child;
				} else if (componentType === "indicator") {
					indicator = child;
				} else if (componentType === "title") {
					title = child;
				} else if (componentType === "description") {
					description = child;
				}
			});

			return { avatar, indicator, title, description };
		}, [children]);

		const renderContent = () => {
			if (!children) return null;
			const styles = avatarLabelStyles();

			if (!sortedComponents) {
				return (
					<div ref={ref} className={styles.wrapper({ className, size })} {...props}>
						{children}
					</div>
				);
			}

			const { avatar, indicator, title, description } = sortedComponents;

			return (
				<div ref={ref} className={styles.wrapper({ className, size })} {...props}>
					{avatar && (
						<div className={styles.avatarWrapper()}>
							{avatar}
							{indicator && <div className={styles.indicator()}>{indicator}</div>}
						</div>
					)}
					{(title || description) && (
						<div className={styles.textWrapper()}>
							{title}
							{description}
						</div>
					)}
				</div>
			);
		};

		return <AvatarLabelContext.Provider value={contextValue}>{renderContent()}</AvatarLabelContext.Provider>;
	}
);

AvatarLabel.displayName = "AvatarLabel";
