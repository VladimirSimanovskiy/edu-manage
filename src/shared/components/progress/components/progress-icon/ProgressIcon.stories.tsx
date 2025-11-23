import { Meta, StoryObj } from "@storybook/react";
import { ProgressIcon } from "./ProgressIcon";
import { CircleAlert, RotateCcw } from "lucide-react";

const meta: Meta<typeof ProgressIcon> = {
	component: ProgressIcon,
	parameters: {
		layout: "centered"
	},
	argTypes: {
		size: {
			options: ["sm", "md", "lg"],
			control: { type: "radio" }
		},
		icon: {
			options: ["CircleAlert", "RotateCcw"],
			control: { type: "select" },
			mapping: {
				CircleAlert,
				RotateCcw
			}
		}
	}
};

export default meta;

type Story = StoryObj<typeof ProgressIcon>;

export const Default: Story = {
	args: {
		size: "md",
		icon: CircleAlert
	}
};
