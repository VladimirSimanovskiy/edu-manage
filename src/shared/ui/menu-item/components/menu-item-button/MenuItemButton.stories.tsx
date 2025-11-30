import { Meta, StoryObj } from "@storybook/react";
import { MenuItemButton } from "./MenuItemButton";

const meta: Meta<typeof MenuItemButton> = {
	component: MenuItemButton,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: `
**MenuItemButton** — это компонент-кнопка, специально адаптированный для использования внутри пунктов меню.
Представляет собой обертку над базовым компонентом Button с предустановленными стилями для меню.
				`
			}
		}
	}
};

export default meta;

type Story = StoryObj<typeof MenuItemButton>;

export const Default: Story = {
	args: {
		children: "Button"
	}
};

export const Variant: Story = {
	args: {
		children: "Button",
		variant: "outline"
	}
};
