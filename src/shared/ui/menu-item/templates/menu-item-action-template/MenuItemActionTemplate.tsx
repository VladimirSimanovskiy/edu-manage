import { PropsWithChildren } from "react";
import { MenuItemIcon } from "../../components/menu-item-icon/MenuItemIcon";
import { LucideIcon } from "lucide-react";
import { MenuItemText } from "../../components/menu-item-text/MenuItemText";
import { MenuItemShortcut } from "../../components/menu-item-shortcut/MenuItemShortcut";

type MenuItemActionTemplateProps = {
	icon: LucideIcon;
	text: string;
	shortcut?: string;
};

export const MenuItemActionTemplate = ({ icon, text, shortcut }: PropsWithChildren<MenuItemActionTemplateProps>) => {
	return (
		<>
			<MenuItemIcon icon={icon} />
			<MenuItemText>{text}</MenuItemText>
			{shortcut && <MenuItemShortcut>{shortcut}</MenuItemShortcut>}
		</>
	);
};

MenuItemActionTemplate.displayName = "MenuItemActionTemplate";
