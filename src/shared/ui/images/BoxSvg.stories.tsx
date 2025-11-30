import { StoryObj } from "@storybook/react";
import { BoxSvg } from "./BoxSvg";

const meta = {
	component: BoxSvg,
	parameters: {
		layout: "centered"
	}
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {}
};
