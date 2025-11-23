import type { Meta, StoryObj } from "@storybook/react";
import { ScheduledEvent } from "./ScheduledEvent";
import { fn } from "@storybook/test";
import { schedulerContextDecorator } from "../../story-utils/SchedulerContextDecorator";

const meta: Meta<typeof ScheduledEvent> = {
	component: ScheduledEvent,
	parameters: {
		layout: "centered"
	},
	argTypes: {},
	decorators: [
		schedulerContextDecorator,
		(Story) => (
			<div style={{ height: "200px", width: "200px", position: "relative" }}>
				<Story />
			</div>
		)
	],
	args: {
		event: {
			id: 1,
			title: "Meeting with team",
			startDate: new Date(2024, 0, 1, 10, 0),
			endDate: new Date(2024, 0, 1, 11, 30)
		},
		top: "20%",
		onEventClick: fn()
	}
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Resizable: Story = {
	parameters: {
		layout: "fullscreen"
	}
};
