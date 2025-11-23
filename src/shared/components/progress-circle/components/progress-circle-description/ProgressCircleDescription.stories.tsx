import { Meta, StoryObj } from "@storybook/react";
import { ProgressCircleDescription } from "./ProgressCircleDescription";

const meta: Meta<typeof ProgressCircleDescription> = {
	component: ProgressCircleDescription,
	parameters: {
		layout: "centered"
	}
};

export default meta;

type Story = StoryObj<typeof ProgressCircleDescription>;

export const Default: Story = {
	args: {
		children: "Label"
	}
};
