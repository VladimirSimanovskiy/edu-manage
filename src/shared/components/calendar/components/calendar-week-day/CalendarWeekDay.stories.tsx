import type { Meta, StoryObj } from "@storybook/react";
import { CalendarWeekDay } from "./CalendarWeekDay";

const meta: Meta<typeof CalendarWeekDay> = {
	component: CalendarWeekDay,
	tags: ["autodocs"],
	parameters: {
		layout: "centered"
	},
	argTypes: {
		children: {
			control: { type: "text" }
		}
	},
	decorators: [
		(Story) => (
			<table>
				<thead>
					<tr>
						<Story />
					</tr>
				</thead>
			</table>
		)
	]
};

export default meta;
type Story = StoryObj<typeof CalendarWeekDay>;

export const Default: Story = {
	args: {
		children: "Пн"
	}
};

export const Showcase: Story = {
	render: () => {
		const englishDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
		return (
			<>
				{englishDays.map((day) => (
					<CalendarWeekDay key={day} children={day} />
				))}
			</>
		);
	},
	parameters: {
		controls: {
			disable: true
		}
	}
};
