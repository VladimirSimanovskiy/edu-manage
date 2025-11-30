import { Meta, StoryObj } from "@storybook/react";
import { MenuItemShortcut } from "./MenuItemShortcut";

const meta: Meta<typeof MenuItemShortcut> = {
	component: MenuItemShortcut,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: `
**MenuItemShortcut** — это компонент для отображения горячих клавиш (шорткатов) внутри пунктов меню.
Представляет собой обертку над базовым компонентом Shortcut с вариантом ghost.
		`
			}
		}
	}
};

export default meta;

type Story = StoryObj<typeof MenuItemShortcut>;

export const Default: Story = {
	args: {
		children: "⌘K"
	}
};
