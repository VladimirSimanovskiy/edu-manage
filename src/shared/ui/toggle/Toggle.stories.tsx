import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "./Toggle";
import { Icon } from "../icon/Icon";
import { Star } from "lucide-react";

const meta: Meta<typeof Toggle> = {
	component: Toggle,
	tags: ["autodocs"],
	parameters: {
		layout: "centered"
	},
	argTypes: {
		variant: {
			control: "select",
			options: ["default", "outline"]
		},
		size: {
			control: "select",
			options: ["xs", "sm", "md", "lg", "xl"]
		}
	}
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
	args: {
		children: "Toggle",
		disabled: false
	}
};

export const WithIcon: Story = {
	args: {
		variant: "outline",
		size: "md",
		children: <Icon icon={Star} />
	}
};

export const WithIconAndText: Story = {
	args: {
		variant: "default",
		size: "sm",
		children: (
			<>
				<Icon icon={Star} />
				<span>Toggle</span>
			</>
		)
	}
};
