import type { Meta, StoryObj } from "@storybook/react";
import { HourRows } from "./HourRows";

const meta = {
	component: HourRows,
	parameters: {
		layout: "centered"
	},
	decorators: [
		(Story) => (
			<div className="relative h-[600px] w-[200px] border border-gray-300">
				<Story />
			</div>
		)
	]
} satisfies Meta<typeof HourRows>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
