import { Meta, StoryObj } from "@storybook/react";
import { MenuItemIcon } from "./MenuItemIcon";
import { Circle } from "lucide-react";

const meta: Meta<typeof MenuItemIcon> = {
	component: MenuItemIcon,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: `
**MenuItemIcon** — это компонент-иконка, специально адаптированный для использования внутри пунктов меню.
Представляет собой обертку над базовым компонентом Icon с предустановленными стилями для меню.
				`
			}
		}
	}
};

export default meta;

type Story = StoryObj<typeof MenuItemIcon>;

export const Default: Story = {
	args: {
		icon: Circle
	}
};
