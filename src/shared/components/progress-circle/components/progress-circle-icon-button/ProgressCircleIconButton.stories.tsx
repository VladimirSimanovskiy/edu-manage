import { Meta, StoryObj } from "@storybook/react";
import { ProgressCircleIconButton } from "./ProgressCircleIconButton";
import { RotateCcw, X } from "lucide-react";

const meta: Meta<typeof ProgressCircleIconButton> = {
	component: ProgressCircleIconButton,
	parameters: {
		layout: "centered"
	},
	argTypes: {
		size: {
			options: ["xs", "sm", "md", "lg", "xl"],
			control: { type: "radio" }
		},
		icon: {
			options: ["X", "RotateCcw"],
			control: { type: "select" },
			mapping: {
				X,
				RotateCcw
			}
		}
	}
};

export default meta;

type Story = StoryObj<typeof ProgressCircleIconButton>;

export const Default: Story = {
	args: {
		size: "md",
		icon: RotateCcw,
		onClick: () => alert("Click!")
	}
};
