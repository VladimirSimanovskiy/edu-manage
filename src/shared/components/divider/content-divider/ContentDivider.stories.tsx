import type { Meta, StoryObj } from "@storybook/react";
import { ContentDivider } from "./ContentDivider";
import { Description } from "@/components/description/Description";

const meta: Meta<typeof ContentDivider> = {
	component: ContentDivider,
	tags: ["autodocs"],
	parameters: {
		layout: "centered"
	},
	args: {
		wrapperProps: {
			className: "w-[1000px] h-[500px]"
		}
	},
	argTypes: {
		orientation: {
			options: ["vertical", "horizontal"],
			control: { type: "radio" }
		}
	}
};

export default meta;
type Story = StoryObj<typeof ContentDivider>;

export const Default: Story = {
	args: {
		children: <Description>или</Description>
	}
};

export const Error: Story = {
	args: {
		children: <Description>или</Description>,
		dividerProps: {
			status: "error"
		}
	}
};
