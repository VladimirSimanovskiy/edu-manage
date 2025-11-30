import { Meta, StoryObj } from "@storybook/react";
import { ProgressIconButton } from "./ProgressIconButton";
import { RotateCcw, X } from "lucide-react";

const meta: Meta<typeof ProgressIconButton> = {
	component: ProgressIconButton,
	parameters: {
		layout: "centered"
	},
	argTypes: {
		size: {
			options: ["sm", "md", "lg"],
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

type Story = StoryObj<typeof ProgressIconButton>;

export const Default: Story = {
	args: {
		size: "md",
		icon: X,
		onClick: () => alert("Click!")
	}
};
