import type { Meta, StoryObj } from "@storybook/react";
import { Loader } from "./Loader";

const meta: Meta<typeof Loader> = {
	component: Loader,
	parameters: {
		layout: "centered"
	},
	tags: ["autodocs"],
	argTypes: {
		size: {
			control: { type: "select" },
			options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl"]
		}
	}
};

export default meta;
type Story = StoryObj<typeof Loader>;

export const Default: Story = {
	args: {
		children: "Loading..."
	}
};
