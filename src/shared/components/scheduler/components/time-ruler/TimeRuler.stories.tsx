import { Meta, StoryObj } from "@storybook/react";
import { TimeRuler } from "./TimeRuler";

const meta: Meta<typeof TimeRuler> = {
	component: TimeRuler,
	parameters: {
		layout: "centered"
	},
	decorators: [
		(Story) => (
			<div style={{ height: "600px" }}>
				<Story />
			</div>
		)
	],
	tags: ["autodocs"]
};

export default meta;

type Story = StoryObj<typeof TimeRuler>;

export const Default: Story = {};

export const WithCurrentTime: Story = {
	args: {
		showCurrentTime: true
	}
};
