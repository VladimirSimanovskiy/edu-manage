import type { Meta, StoryObj } from "@storybook/react";
import { ScrollArea } from "./ScrollArea";

const meta = {
	component: ScrollArea,
	parameters: {
		layout: "centered",
		controls: {
			exclude: ["children", "className", "asChild"]
		}
	},
	tags: ["autodocs"]
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		className: "w-[300px] h-[200px] border",
		children: <div className="h-[600px] w-[600px]"></div>
	}
};
