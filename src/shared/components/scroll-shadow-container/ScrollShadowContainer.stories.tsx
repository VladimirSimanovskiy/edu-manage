import type { Meta, StoryObj } from "@storybook/react";
import { ScrollShadowContainer } from "./ScrollShadowContainer";

const meta = {
	component: ScrollShadowContainer,
	parameters: {
		layout: "centered"
	},
	tags: ["autodocs"]
} satisfies Meta<typeof ScrollShadowContainer>;

export default meta;
type Story = StoryObj<typeof ScrollShadowContainer>;

export const Default: Story = {
	args: {
		className: "w-[300px] h-[200px] border",
		children: <div className="h-[600px] w-full"></div>
	}
};
