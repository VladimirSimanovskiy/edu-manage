import type { Meta, StoryObj } from "@storybook/react";
import { TextOverflowTooltip } from "./TextOverflowTooltip";

const meta: Meta<typeof TextOverflowTooltip> = {
	component: TextOverflowTooltip,
	parameters: {
		layout: "centered"
	},
	args: {
		children: "Это очень длинный текст, который не поместится в ограниченное пространство и будет обрезан"
	},
	argTypes: {
		children: {
			control: "text",
			description: "Содержимое компонента"
		},
		className: {
			control: "text",
			description: "Дополнительные CSS классы для контейнера"
		},
		tooltipClassName: {
			control: "text",
			description: "CSS классы для содержимого тултипа"
		}
	}
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => (
		<div className="w-48 rounded border border-gray-200 p-4">
			<TextOverflowTooltip {...args} />
		</div>
	)
};
