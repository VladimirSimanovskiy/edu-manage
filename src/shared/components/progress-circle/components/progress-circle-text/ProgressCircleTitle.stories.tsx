import { Meta, StoryObj } from "@storybook/react";
import { ProgressCircleTitle } from "./ProgressCircleTitle";

const meta: Meta<typeof ProgressCircleTitle> = {
	component: ProgressCircleTitle,
	parameters: {
		layout: "centered"
	},
	argTypes: {
		size: {
			options: ["xs", "sm", "md", "lg", "xl"],
			control: { type: "radio" }
		}
	}
};

export default meta;

type Story = StoryObj<typeof ProgressCircleTitle>;

export const Default: Story = {
	args: {
		size: "md",
		children: "50%"
	}
};
