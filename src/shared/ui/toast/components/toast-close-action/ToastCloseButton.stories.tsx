import type { StoryObj } from "@storybook/react";
import { ToastCloseButton } from "./ToastCloseButton";
import { ToastProvider } from "../../hooks/useToastContext";
import { ToastProps } from "../../ToastView";

type StoryProps = {
	status: ToastProps["status"];
	focus: ToastProps["focus"];
	size: ToastProps["size"];
	title: string;
	description: string;
};

const meta = {
	component: ToastCloseButton,
	parameters: {
		layout: "centered"
	},
	argTypes: {
		status: {
			control: "inline-radio",
			options: ["default", "info", "success", "warning", "error"]
		},
		focus: {
			control: "inline-radio",
			options: ["low", "medium", "high"]
		},
		size: {
			control: "inline-radio",
			options: ["sm", "md", "lg"]
		},
		title: {
			control: "text"
		},
		description: {
			control: "text"
		}
	}
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Default: Story = {
	args: {
		status: "default",
		focus: "high",
		size: "sm",
		title: "Title",
		description: "Error description"
	},
	render: (args) => (
		<ToastProvider
			value={{
				status: args.status,
				focus: args.focus,
				size: args.size,
				title: args.title,
				description: args.description
			}}
		>
			<ToastCloseButton />
		</ToastProvider>
	)
};
