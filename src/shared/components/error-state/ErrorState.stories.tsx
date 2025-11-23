import type { Meta, StoryObj } from "@storybook/react";
import { ErrorState } from "./ErrorState";

const meta: Meta<typeof ErrorState> = {
	component: ErrorState,
	parameters: {
		layout: "centered"
	},
	tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof ErrorState>;

export const Default: Story = {
	args: {
		children: "Something went wrong"
	},
	render: (args) => (
		<div className="w-[600px]">
			<ErrorState {...args} />
		</div>
	)
};
