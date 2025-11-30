import type { StoryObj } from "@storybook/react";
import { ToastAction } from "./ToastAction";
import { ToastProvider } from "../../hooks/useToastContext";
import { ToastProps } from "../../ToastView";

type StoryProps = {
	actionType: "primary" | "secondary";
	status: ToastProps["status"];
	focus: ToastProps["focus"];
	size: ToastProps["size"];
	title: string;
};

const meta = {
	component: ToastAction,
	parameters: {
		layout: "centered"
	},
	argTypes: {
		actionType: {
			control: "radio",
			options: ["primary", "secondary"]
		},
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
		}
	}
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Primary: Story = {
	args: {
		actionType: "primary",
		status: "default",
		focus: "medium",
		size: "md",
		title: "Error"
	},
	render: (args) => (
		<ToastProvider
			value={{
				status: args.status,
				focus: args.focus,
				size: args.size,
				title: args.title
			}}
		>
			<ToastAction>Action</ToastAction>
		</ToastProvider>
	)
};
