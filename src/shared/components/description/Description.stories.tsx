import type { Meta, StoryObj } from "@storybook/react";
import { Description } from "./Description";

const meta = {
	component: Description,
	parameters: {
		layout: "centered"
	},
	tags: ["autodocs"]
} satisfies Meta<typeof Description>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "This is a description"
	}
};
