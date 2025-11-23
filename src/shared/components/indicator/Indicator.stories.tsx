import { Meta, StoryObj } from "@storybook/react";
import { Indicator } from "./Indicator";

const meta: Meta<typeof Indicator> = {
	component: Indicator,
	tags: ["autodocs"],
	parameters: {
		layout: "centered"
	},
	argTypes: {
		size: {
			control: { type: "select" },
			options: ["xs", "sm", "md", "lg", "xl"]
		}
	}
};

export default meta;
type Story = StoryObj<typeof Indicator>;

export const Default: Story = {
	args: {
		rounded: false,
		className: "bg-status-success"
	}
};
