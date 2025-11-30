import React from "react";
import { Description } from "@/components/description/Description";
import { Button } from "@/components/button";
import { X, ArrowLeft } from "lucide-react";
import { Icon } from "@/components/icon/Icon";
import { DrawerHeader } from "../../components/drawer-header/DrawerHeader";
import { DrawerClose, DrawerTitle } from "../../Drawer";
import { ButtonProps } from "@/components/button/button/Button";
import { tv } from "tailwind-variants";

const drawerHeaderTemplateStyles = tv({
	base: "flex flex-row items-start gap-1 p-0 pr-1",
	variants: {
		hasBackButton: {
			true: "pl-1",
			false: "pl-4"
		}
	},
	slots: {
		titleWrapper: "flex flex-1 flex-col items-start py-2",
		title: "text-lg font-semibold",
		button: "aspect-square p-3"
	}
});

type DrawerHeaderTemplateProps = React.ComponentPropsWithoutRef<typeof DrawerHeader> & {
	title: string;
	description?: string;
	showBackButton?: boolean;
	backButtonProps?: ButtonProps;
	showCloseButton?: boolean;
	closeButtonProps?: ButtonProps;
};

export const DrawerHeaderTemplate = React.forwardRef<HTMLDivElement, DrawerHeaderTemplateProps>(
	(
		{ className, description, title, showBackButton, backButtonProps, showCloseButton, closeButtonProps, ...props },
		ref
	) => {
		const styles = drawerHeaderTemplateStyles({ className, hasBackButton: !!showBackButton });

		return (
			<DrawerHeader ref={ref} className={styles.base()} {...props}>
				{showBackButton !== false && (
					<DrawerClose asChild>
						<Button size="xl" variant="text" className={styles.button()} {...backButtonProps}>
							<Icon icon={ArrowLeft} size="lg" />
						</Button>
					</DrawerClose>
				)}
				<div className={styles.titleWrapper()}>
					<DrawerTitle className={styles.title()}>{title}</DrawerTitle>
					<Description>{description}</Description>
				</div>
				{showCloseButton !== false && (
					<DrawerClose asChild>
						<Button size="xl" variant="text" className={styles.button()} {...closeButtonProps}>
							<Icon icon={X} size="lg" />
						</Button>
					</DrawerClose>
				)}
			</DrawerHeader>
		);
	}
);

DrawerHeaderTemplate.displayName = "DrawerHeaderTemplate";
