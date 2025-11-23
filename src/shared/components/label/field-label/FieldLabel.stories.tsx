import type { Meta, StoryObj } from "@storybook/react";
import { FieldLabel } from "./FieldLabel";
import { CircleHelp } from "lucide-react";

const meta: Meta<typeof FieldLabel> = {
	component: FieldLabel,
	parameters: {
		layout: "centered",
		controls: {
			exclude: ["htmlFor"]
		}
	},
	tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof FieldLabel>;

export const Default: Story = {
	args: {
		children: "Лейбл поля",
		required: false
	}
};

export const WithIcon: Story = {
	args: {
		...Default.args,
		icon: CircleHelp,
		tooltip: "Подробное описание в тултипе"
	}
};
