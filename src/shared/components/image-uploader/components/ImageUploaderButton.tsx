import { Button } from "@/components/button";
import { Icon } from "@/components/icon";
import { LucideIcon } from "lucide-react";
import React from "react";
import { tv } from "tailwind-variants";

const imageUploaderButtonStyles = tv({
	slots: {
		container: "h-4 w-4 rounded-full border border-muted bg-primary-bg p-1",
		icon: "h-2 w-2 stroke-[3px] text-muted"
	}
});

export type ImageUploaderButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
	icon: LucideIcon;
};

export const ImageUploaderButton = React.forwardRef<HTMLButtonElement, ImageUploaderButtonProps>(
	({ className, onClick, icon, ...props }, ref) => {
		const styles = imageUploaderButtonStyles();

		return (
			<Button
				variant="outline"
				ref={ref}
				className={styles.container({ className })}
				onClick={onClick}
				{...props}
			>
				<Icon className={styles.icon()} icon={icon} />
			</Button>
		);
	}
);

ImageUploaderButton.displayName = "ImageUploaderButton";
