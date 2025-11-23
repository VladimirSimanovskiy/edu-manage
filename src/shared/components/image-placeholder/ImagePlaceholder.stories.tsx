import type { Meta, StoryObj } from "@storybook/react";
import { ImagePlaceholder } from "./ImagePlaceholder";

const meta: Meta<typeof ImagePlaceholder> = {
	component: ImagePlaceholder,
	tags: ["autodocs"],
	parameters: {
		layout: "centered"
	},
	argTypes: {
		size: {
			control: "select",
			options: ["xs", "sm", "md", "lg", "xl"]
		}
	}
};

export default meta;
type Story = StoryObj<typeof ImagePlaceholder>;

export const Default: Story = {
	args: {
		size: "sm"
	}
};
