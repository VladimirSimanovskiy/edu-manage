import { Icon } from "@/components/icon";
import { IconProps } from "@/components/icon/Icon";
import { tv } from "tailwind-variants";

const menuItemIconStyles = tv({
	base: "truncate text-sm text-primary-fg"
});

type MenuItemIconProps = IconProps;

export const MenuItemIcon = ({ className, icon, ...props }: MenuItemIconProps) => (
	<Icon icon={icon} className={menuItemIconStyles({ className })} {...props} />
);

MenuItemIcon.displayName = "MenuItemIcon";
