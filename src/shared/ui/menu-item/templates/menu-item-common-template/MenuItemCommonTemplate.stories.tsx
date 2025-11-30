import { Meta, StoryObj } from "@storybook/react";
import { Circle, Flower, Heart, Settings, Star } from "lucide-react";
import { MenuItemCommonTemplate } from "./MenuItemCommonTemplate";
import { MenuItem } from "../../MenuItem";

const meta: Meta<typeof MenuItemCommonTemplate> = {
	component: MenuItemCommonTemplate,
	decorators: [
		(Story) => (
			<MenuItem className="w-[300px]">
				<Story />
			</MenuItem>
		)
	],
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: `
Базовый шаблон для создания элемента меню с поддержкой галочек выбора.

### Структура
Компонент состоит из следующих частей:
- **Start Check** галочка слева (опционально)
- **MenuItemIcon** основная иконка элемента
- **MenuItemText** текст элемента
- **End Check** галочка справа (опционально)
				`
			}
		},
		controls: {
			exclude: ["children"]
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
		}
	}
};

export default meta;

type Story = StoryObj<typeof MenuItemCommonTemplate>;

export const Default: Story = {
	args: {
		icon: Circle,
		text: "Menu item",
		isSelected: false,
		showStartCheck: false,
		showEndCheck: false
	}
};
