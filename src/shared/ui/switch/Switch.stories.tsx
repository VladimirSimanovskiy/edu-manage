import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./Switch";

const meta = {
	component: Switch,
	parameters: {
		layout: "centered",
		controls: {
			exclude: ["asChild"]
		}
	},
	tags: ["autodocs"],
	argTypes: {
		size: {
			control: { type: "radio" },
			options: ["sm", "md"],
			description: "Размер переключателя"
		},
		disabled: {
			control: "boolean",
			defaultValue: false
		}
	},
	args: {
		size: "md"
	}
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
	render: (args) => <Switch {...args} />
};
