import { Meta, StoryObj } from "@storybook/react";
import { ProgressText } from "./ProgressText";

const meta: Meta<typeof ProgressText> = {
	component: ProgressText,
	parameters: {
		layout: "centered"
	},
	argTypes: {
		size: {
			options: ["sm", "md", "lg"],
			control: { type: "radio" }
		}
	}
};

export default meta;

type Story = StoryObj<typeof ProgressText>;

export const Default: Story = {
	args: {
		size: "md",
		children: "Label"
	}
};
