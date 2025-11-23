import { Icon } from "@/components/icon";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import React from "react";
import { tv } from "tailwind-variants";

export type RadioGroupItemProps = React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>;

export const radioGroupItemStyles = tv({
	slots: {
		item: [
			"aspect-square h-4 w-4 rounded-full border border-primary-border bg-secondary-bg shadow-soft-sm data-[state=checked]:border-primary-accent data-[state=checked]:bg-primary-accent",
			"hover:border-muted hover:shadow-soft-base",
			"focus:outline-none focus-visible:shadow-focus",
			"disabled:cursor-not-allowed disabled:opacity-50"
		],
		indicator: "flex items-center justify-center",
		icon: "h-2 w-2 fill-secondary-bg"
	}
});

export const RadioGroupItem = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Item>, RadioGroupItemProps>(
	({ className, ...props }, ref) => {
		const styles = radioGroupItemStyles();

		return (
			<RadioGroupPrimitive.Item ref={ref} className={styles.item({ className })} {...props}>
				<RadioGroupPrimitive.Indicator className={styles.indicator()}>
					<Icon icon={Circle} className={styles.icon()} />
				</RadioGroupPrimitive.Indicator>
			</RadioGroupPrimitive.Item>
		);
	}
);
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;
