import { Meta, StoryObj } from "@storybook/react";
import { Circle } from "lucide-react";
import { ButtonBase } from "./ButtonBase";
import { Icon } from "../../icon/Icon";

const meta: Meta<typeof ButtonBase> = {
	component: ButtonBase,
	parameters: {
		layout: "centered"
	},
	argTypes: {
		variant: {
			options: ["primary", "secondary", "outline", "ghost", "link", "text"],
			control: { type: "radio" }
		},
		status: {
			options: ["default", "info", "success", "warning", "error"],
			control: { type: "radio" }
		},
		size: {
			options: ["xs", "sm", "md", "lg", "xl"],
			control: { type: "radio" }
		}
	}
};

export default meta;

type Story = StoryObj<typeof ButtonBase>;

export const Default: Story = {
	args: {
		children: "Button"
	}
};

export const WithIcons: Story = {
	args: {
		status: "success",
		children: (
			<>
				<Icon icon={Circle} />
				Button
				<Icon icon={Circle} />
			</>
		),
		onClick: () => {
			alert("Button clicked");
		}
	}
};
