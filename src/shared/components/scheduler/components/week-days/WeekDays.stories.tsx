import type { Meta, StoryObj } from "@storybook/react";
import { WeekDays } from "./WeekDays";

const meta = {
	component: WeekDays,
	parameters: {
		layout: "centered"
	},
	args: {
		startDate: new Date(2024, 0, 1)
	},
	tags: ["autodocs"]
} satisfies Meta<typeof WeekDays>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
