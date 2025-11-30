import { Meta, StoryObj } from "@storybook/react";
import { MenuItemSecondaryText } from "./MenuItemSecondaryText";

const meta: Meta<typeof MenuItemSecondaryText> = {
	component: MenuItemSecondaryText,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: `
**MenuItemSecondaryText** — это компонент для отображения вторичного (дополнительного) текста внутри пунктов меню.
Представляет собой span-элемент с уменьшенным размером шрифта и приглушенным цветом.
			`
			}
		}
	}
};

export default meta;

type Story = StoryObj<typeof MenuItemSecondaryText>;

export const Default: Story = {
	args: {
		children: "Secondary text"
	}
};
