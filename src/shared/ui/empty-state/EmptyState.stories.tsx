import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "./EmptyState";

const meta: Meta<typeof EmptyState> = {
	component: EmptyState,
	parameters: {
		layout: "centered"
	},
	tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
	args: {
		children: "No results found"
	},
	render: (args) => (
		<div className="w-[600px]">
			<EmptyState {...args} />
		</div>
	)
};
