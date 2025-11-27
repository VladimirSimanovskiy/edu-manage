import { Meta, StoryObj } from "@storybook/react";
import { TriggerButton } from "./TriggerButton";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTriggerButton
} from "@/components/dropdown/Dropdown";

const meta: Meta<typeof TriggerButton> = {
	component: TriggerButton,
	parameters: {
		layout: "centered"
	},
	argTypes: {
		variant: {
			options: ["outline", "ghost", "text"],
			control: { type: "radio" }
		},
		size: {
			options: ["xs", "sm", "md", "lg", "xl"],
			control: { type: "radio" }
		},
		"data-state": {
			control: "select",
			options: ["closed", "open"]
		}
	}
};

export default meta;

type Story = StoryObj<typeof TriggerButton>;

export const Default: Story = {
	args: {
		children: "Button",
		"data-state": "closed"
	}
};

export const InDropdown: Story = {
	render: (args) => (
		<DropdownMenu>
			<DropdownMenuTriggerButton {...args}>{args.children || "Open Menu"}</DropdownMenuTriggerButton>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Profile</DropdownMenuItem>
				<DropdownMenuItem>Settings</DropdownMenuItem>
				<DropdownMenuItem>Logout</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
	args: {
		children: "Open Menu",
		variant: "outline"
	}
};
