import { VariantsConfig } from "@/lib/utils/variants";
import React from "react";
import { PropsWithChildren } from "react";
import { tv } from "tailwind-variants";

interface ColorTileVariants {
	selected?: boolean;
}

const colorTileVariants = tv({
	slots: {
		wrapper: "flex aspect-square h-[1.375rem] w-[1.375rem] items-center justify-center rounded-md",
		color: "aspect-square h-4 w-4 rounded-sm border border-alpha-high-90 hover:cursor-pointer"
	},
	variants: {
		selected: {
			true: {
				wrapper: "border border-muted"
			}
		}
	} satisfies VariantsConfig<ColorTileVariants>
});

export type ColorTileProps = ColorTileVariants & React.HTMLAttributes<HTMLDivElement>;

export const ColorTile = React.forwardRef<HTMLDivElement, PropsWithChildren<ColorTileProps>>(
	({ className, selected, ...props }, ref) => {
		const styles = colorTileVariants({ selected });

		return (
			<div className={styles.wrapper()}>
				<div className={styles.color({ className })} ref={ref} {...props} />
			</div>
		);
	}
);

ColorTile.displayName = "ColorTile";
