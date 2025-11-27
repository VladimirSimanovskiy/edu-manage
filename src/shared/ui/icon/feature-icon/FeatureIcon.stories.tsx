import { StoryObj } from "@storybook/react";
import { FileUpIcon, Flower } from "lucide-react";
import { FeatureIcon } from "./FeatureIcon";

const meta = {
	component: FeatureIcon,
	parameters: {
		layout: "centered",
		controls: {
			exclude: ["icon", "className"]
		}
	},
	argTypes: {
		size: {
			options: ["sm", "md", "lg"],
			control: { type: "radio" }
		},
		type: {
			options: ["primary", "secondary"],
			control: { type: "radio" }
		}
	}
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {
		icon: Flower,
		size: "md"
	}
};

export const Rounded: Story = {
	args: {
		icon: FileUpIcon,
		size: "md",
		className: "rounded-full"
	}
};
