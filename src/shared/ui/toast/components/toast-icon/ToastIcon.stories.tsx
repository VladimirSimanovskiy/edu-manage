import type { StoryObj } from "@storybook/react";
import { ToastIcon } from "./ToastIcon";
import { ToastProvider } from "../../hooks/useToastContext";
import { ToastProps } from "../../ToastView";
import { Settings } from "lucide-react";

type StoryProps = {
	status: ToastProps["status"];
	focus: ToastProps["focus"];
	size: ToastProps["size"];
	title: string;
	customIcon: boolean;
};

const meta = {
	component: ToastIcon,
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
		customIcon: {
			control: "boolean"
		}
	}
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Default: Story = {
	args: {
		status: "default",
		focus: "medium",
		size: "md",
		title: "Title",
		customIcon: false
	},
	render: (args) => (
		<div className="bg-primary-bg p-4">
			<ToastProvider
				value={{
					status: args.status,
					focus: args.focus,
					size: args.size,
					title: args.title
				}}
			>
				<ToastIcon />
			</ToastProvider>
		</div>
	)
};

export const WithCustomIcon: Story = {
	args: {
		status: "default",
		focus: "medium",
		size: "md",
		title: "Title",
		customIcon: true
	},
	render: (args) => (
		<div className="bg-primary-bg p-4">
			<ToastProvider
				value={{
					status: args.status,
					focus: args.focus,
					size: args.size,
					title: args.title
				}}
			>
				<ToastIcon icon={args.customIcon ? <Settings /> : undefined} />
			</ToastProvider>
		</div>
	)
};
