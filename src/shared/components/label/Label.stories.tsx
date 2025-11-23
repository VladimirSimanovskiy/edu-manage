import { StoryObj } from "@storybook/react";
import { Label } from "./Label";

const meta = {
	component: Label,
	parameters: {
		layout: "centered"
	},
	args: {}
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {
		children: "Label"
	}
};
