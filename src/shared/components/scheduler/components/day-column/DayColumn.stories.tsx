import { resizeDecorator } from "@/lib/utils/storybook";
import type { Meta, StoryObj } from "@storybook/react";
import { schedulerContextDecorator } from "../../story-utils/SchedulerContextDecorator";
import { DayColumn } from "./DayColumn";

const meta = {
	component: DayColumn,
	parameters: {
		layout: "centered"
	},
	decorators: [schedulerContextDecorator, resizeDecorator({ height: "600px", width: "200px" })],
	args: {
		day: new Date(2024, 2, 20), // 20 марта 2024
		events: [
			{
				id: "1",
				title: "Встреча с клиентом",
				startDate: new Date(2024, 2, 20, 10, 0), // 10:00
				endDate: new Date(2024, 2, 20, 11, 30) // 11:30
			},
			{
				id: "2",
				title: "Обед",
				startDate: new Date(2024, 2, 20, 13, 0), // 13:00
				endDate: new Date(2024, 2, 20, 14, 0) // 14:00
			}
		]
	}
} satisfies Meta<typeof DayColumn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithOverlappingEvents: Story = {
	args: {
		day: new Date(2024, 2, 20),
		events: [
			{
				id: "1",
				title: "Встреча 1",
				startDate: new Date(2024, 2, 20, 10, 0),
				endDate: new Date(2024, 2, 20, 12, 0)
			},
			{
				id: "2",
				title: "Встреча 2",
				startDate: new Date(2024, 2, 20, 11, 0),
				endDate: new Date(2024, 2, 20, 13, 0)
			},
			{
				id: "3",
				title: "Встреча 3",
				startDate: new Date(2024, 2, 20, 11, 30),
				endDate: new Date(2024, 2, 20, 14, 0)
			}
		]
	}
};
