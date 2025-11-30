import { Meta, StoryObj } from "@storybook/react";
import { MenuItemInteractiveTemplate } from "./MenuItemInteractiveTemplate";
import { Circle, Flower, Heart, Settings, Star, Trash } from "lucide-react";
import { MenuItem } from "../../MenuItem";

const meta: Meta<typeof MenuItemInteractiveTemplate> = {
	component: MenuItemInteractiveTemplate,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: `
Шаблон для создания расширенного элемента меню с дополнительными действиями.

### Структура
Компонент состоит из четырех частей:
- **Icon** иконка выбора
- **MenuItemIcon** основная иконка элемента
- **MenuItemText** текст элемента
- **MenuItemIconButton** кнопка с дополнительным действием
				`
			}
		}
	},
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
		},
		buttonIcon: {
			options: ["Trash", "Flower", "Star", "Heart", "Settings"],
			control: { type: "select" },
			mapping: {
				Trash,
				Flower,
				Star,
				Heart,
				Settings
			}
		},
		isSelected: {
			control: "boolean"
		},
		text: {
			control: "text"
		}
	}
};

export default meta;

type Story = StoryObj<typeof MenuItemInteractiveTemplate>;

export const Default: Story = {
	args: {
		text: "company/product/1",
		icon: Circle,
		buttonIcon: Trash,
		isSelected: false
	},
	render: (args) => (
		<MenuItem className="w-[300px] py-1">
			<MenuItemInteractiveTemplate {...args} />
		</MenuItem>
	)
};
