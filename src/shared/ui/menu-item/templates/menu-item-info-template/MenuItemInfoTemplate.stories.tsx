import { Meta, StoryObj } from "@storybook/react";
import { MenuItemInfoTemplate } from "./MenuItemInfoTemplate";
import { MenuItem } from "../../MenuItem";

const meta: Meta<typeof MenuItemInfoTemplate> = {
	component: MenuItemInfoTemplate,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: `
Шаблон для создания информационного элемента меню.

### Структура
Компонент состоит из трех частей:
- **Icon** иконка выбора
- **MenuItemText** основной текст
- **MenuItemSecondaryText** дополнительное описание
				`
			}
		}
	},
	decorators: [
		(Story) => (
			<MenuItem className="w-[300px]">
				<Story />
			</MenuItem>
		)
	]
};

export default meta;

type Story = StoryObj<typeof MenuItemInfoTemplate>;

export const Default: Story = {
	args: {
		text: "company/product/1",
		description: "10 мин назад",
		isSelected: false
	}
};
