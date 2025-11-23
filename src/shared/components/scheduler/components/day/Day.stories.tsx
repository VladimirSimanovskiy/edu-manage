import { Meta, StoryObj } from "@storybook/react";
import { Day } from "./Day";

const meta: Meta<typeof Day> = {
	component: Day,
	parameters: {
		layout: "centered"
	},
	args: {
		date: new Date(2024, 2, 20)
	},
	tags: ["autodocs"],
	render: (args) => {
		const date = new Date(args.date);
		return <Day {...args} date={date} />;
	}
};

export default meta;

type Story = StoryObj<typeof Day>;

export const Default: Story = {};
