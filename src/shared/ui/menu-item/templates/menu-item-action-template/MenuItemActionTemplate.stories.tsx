import { Meta, StoryObj } from "@storybook/react";
import { Circle, Flower, Heart, Settings, Star } from "lucide-react";
import { MenuItemActionTemplate } from "./MenuItemActionTemplate";
import { MenuItemAction } from "../../MenuItemAction";

const meta: Meta<typeof MenuItemActionTemplate> = {
	component: MenuItemActionTemplate,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: `
Шаблон для создания элемента меню с действием. 

### Структура
Компонент состоит из трех частей:
- **MenuItemIcon** иконка действия
- **MenuItemText** текст описания действия
- **MenuItemShortcut** горячие клавиши
				`
			}
		}
	},
	decorators: [
		(Story) => (
			<MenuItemAction className="w-[300px]">
				<Story />
			</MenuItemAction>
		)
	],
	argTypes: {
		icon: {
			options: ["Circle", "Flower", "Star", "Heart", "Settings"],
			control: { type: "select" },
			mapping: {
				Circle,
				Flower,
				Star,
				Heart,
				Settings
			}
		}
	}
};

export default meta;

type Story = StoryObj<typeof MenuItemActionTemplate>;

export const Default: Story = {
	args: {
		icon: Circle,
		text: "Menu item",
		shortcut: "⌘K"
	}
};
