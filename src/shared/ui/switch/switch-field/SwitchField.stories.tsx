import type { Meta, StoryObj } from "@storybook/react";
import { SwitchField } from "./SwitchField";

const meta = {
	component: SwitchField,
	parameters: {
		layout: "centered",
		controls: {
			exclude: ["id"]
		}
	},
	tags: ["autodocs"],
	argTypes: {
		alignment: {
			control: "radio",
			options: ["left", "right"]
		}
	}
} satisfies Meta<typeof SwitchField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: "Accept terms and conditions",
		description: "By accepting, you agree to our privacy policy and terms of service.",
		id: "switch-example",
		error: false,
		disabled: false,
		outline: false
	}
};

export const Error: Story = {
	args: {
		...Default.args,
		error: true
	}
};

export const Disabled: Story = {
	args: {
		...Default.args,
		disabled: true
	}
};

export const Outline: Story = {
	args: {
		...Default.args,
		outline: true
	}
};
