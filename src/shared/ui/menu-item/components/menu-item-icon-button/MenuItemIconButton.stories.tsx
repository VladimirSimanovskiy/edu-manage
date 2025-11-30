import { Meta, StoryObj } from "@storybook/react";
import { MenuItemIconButton } from "./MenuItemIconButton";
import { Circle } from "lucide-react";

const meta: Meta<typeof MenuItemIconButton> = {
	component: MenuItemIconButton,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: `
**MenuItemIconButton** — это кнопка с иконкой, специально адаптированная для использования внутри пунктов меню.
Представляет собой обертку над базовым компонентом IconButton с предустановленными стилями для меню.
				`
			}
		}
	}
};

export default meta;

type Story = StoryObj<typeof MenuItemIconButton>;

export const Default: Story = {
	args: {
		icon: Circle
	}
};

export const Variant: Story = {
	args: {
		icon: Circle,
		variant: "outline"
	}
};
