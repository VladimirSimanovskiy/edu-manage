import { Meta, StoryObj } from "@storybook/react";
import { MenuItem } from "./MenuItem";
import { MenuItemText } from "./components/menu-item-text/MenuItemText";
import { MenuItemIcon } from "./components/menu-item-icon/MenuItemIcon";
import { withFixedWidth } from "../../lib/utils/storybook";
import { Circle } from "lucide-react";

const meta: Meta<typeof MenuItem> = {
	component: MenuItem,
	decorators: [withFixedWidth("300px")],
	parameters: {
		layout: "centered",
		controls: {
			exclude: ["children"]
		}
	}
};

export default meta;

type Story = StoryObj<typeof MenuItem>;

export const Default: Story = {
	args: {
		children: (
			<>
				<MenuItemIcon icon={Circle} />
				<MenuItemText>Menu text</MenuItemText>
			</>
		),
		disabled: false
	}
};
