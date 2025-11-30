import { Meta, StoryObj } from "@storybook/react";
import { Circle, Flower, Heart, Settings, Star } from "lucide-react";
import { MenuItemRichTemplate } from "./MenuItemRichTemplate";
import { MenuItem } from "../../MenuItem";

const meta: Meta<typeof MenuItemRichTemplate> = {
	component: MenuItemRichTemplate,
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
Шаблон для создания расширенного элемента меню с иконкой, заголовком и описанием.

### Структура
Компонент состоит из трех частей:
- **FeatureIcon** основная иконка элемента
- **Заголовок** основной текст элемента
- **Description** дополнительное описание
- **ChevronRight** иконка стрелки (добавляется автоматически)
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

type Story = StoryObj<typeof MenuItemRichTemplate>;

export const Default: Story = {
	args: {
		icon: Flower,
		title: "Item title",
		description: "Secondary text"
	}
};
