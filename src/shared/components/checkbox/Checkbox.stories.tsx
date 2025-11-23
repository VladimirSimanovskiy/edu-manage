import { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
	title: "Components/Checkbox",
	component: Checkbox,
	parameters: {
		layout: "centered",
		controls: {
			exclude: ["defaultChecked", "asChild"]
		}
	},
	tags: ["autodocs"],
	argTypes: {
		checked: {
			control: "select",
			options: [true, false, "indeterminate"],
			defaultValue: false
		},
		disabled: {
			control: "boolean",
			defaultValue: false
		},
		defaultChecked: {
			control: "boolean",
			defaultValue: false
		}
	}
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
	render: (args) => <Checkbox {...args} />
};
