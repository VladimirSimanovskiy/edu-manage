import type { Meta, StoryObj } from "@storybook/react";
import { DayColumns } from "./DayColumns";
import { schedulerContextDecorator } from "../../story-utils/SchedulerContextDecorator";

const meta = {
	component: DayColumns,
	parameters: {
		layout: "fullscreen"
	},
	tags: ["autodocs"],
	decorators: [schedulerContextDecorator],
	args: {
		events: [
			{
				id: 1,
				title: "Morning Meeting",
				startDate: new Date(2024, 0, 1, 9, 0),
				endDate: new Date(2024, 0, 1, 10, 30)
			},
			{
				id: 2,
				title: "Lunch Break",
				startDate: new Date(2024, 0, 1, 12, 0),
				endDate: new Date(2024, 0, 1, 13, 0)
			},
			{
				id: 3,
				title: "Project Review",
				startDate: new Date(2024, 0, 2, 14, 0),
				endDate: new Date(2024, 0, 2, 16, 0)
			}
		]
	}
} satisfies Meta<typeof DayColumns>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
