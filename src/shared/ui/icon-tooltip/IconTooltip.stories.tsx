import type { Meta, StoryObj } from "@storybook/react";
import { IconTooltip } from "./IconTooltip";
import { HelpCircle } from "lucide-react";

const meta: Meta<typeof IconTooltip> = {
	component: IconTooltip,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
		controls: {
			exclude: ["icon"]
		}
	}
};

export default meta;
type Story = StoryObj<typeof IconTooltip>;

export const Default: Story = {
	args: {
		content: "Информация о поле или элементе",
		icon: HelpCircle,
		contentClassName: "",
		iconClassName: ""
	}
};
