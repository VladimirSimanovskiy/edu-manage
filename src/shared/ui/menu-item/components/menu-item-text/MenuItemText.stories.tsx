import { Meta, StoryObj } from "@storybook/react";
import { MenuItemText } from "./MenuItemText";

const meta: Meta<typeof MenuItemText> = {
	component: MenuItemText,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: `
**MenuItemText** — это компонент для отображения основного текста внутри пунктов меню.
Представляет собой span-элемент, который занимает доступное пространство и обрезает слишком длинный текст.
		`
			}
		}
	}
};

export default meta;

type Story = StoryObj<typeof MenuItemText>;

export const Default: Story = {
	args: {
		children: "Menu item text"
	}
};
