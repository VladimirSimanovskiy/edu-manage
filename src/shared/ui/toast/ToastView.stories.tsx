import type { Meta, StoryObj } from "@storybook/react";
import { Toast, ToastProps } from "./ToastView";
import { ToastAction } from "./components/toast-action/ToastAction";
import { ToastContainer } from "./components/toast-container/ToastContainer";
import { useToast } from "./hooks/useToast";
import { Button } from "../button/button/Button";

const meta: Meta<typeof Toast> = {
	component: Toast,
	parameters: {
		layout: "centered"
	},
	// argTypes: commonArgTypes,
	decorators: [
		(Story, { args }) => (
			<div style={{ "--width": "356px" } as React.CSSProperties}>
				<Story {...args} />
			</div>
		)
	]
};

type ToastDemoProps = Omit<ToastProps, "closeAction" | "onClose">;

const ToastDemo = ({
	status,
	focus,
	size,
	title,
	description,
	icon,
	primaryAction,
	secondaryAction
}: ToastDemoProps) => {
	const { toast } = useToast();

	return (
		<Button
			onClick={() => {
				toast({
					status,
					focus,
					size,
					title,
					description,
					icon,
					primaryAction,
					secondaryAction
				});
			}}
		>
			Show Toast
		</Button>
	);
};

export default meta;
type Story = StoryObj<typeof Toast>;

const commonConfig = {
	args: {
		title: "Toast Title",
		description: "Toast description",
		status: "default" as const,
		focus: "medium" as const,
		primaryAction: <ToastAction>Primary</ToastAction>,
		secondaryAction: <ToastAction>Secondary</ToastAction>,
		closeAction: true
	},
	parameters: {
		controls: {
			include: ["title", "status", "focus", "icon", "primaryAction", "secondaryAction", "closeAction"]
		}
	}
};

export const Small: Story = {
	args: {
		...commonConfig.args,
		size: "sm"
	},
	parameters: commonConfig.parameters
};

export const Medium: Story = {
	...commonConfig,
	args: {
		...commonConfig.args,
		size: "md"
	}
};

export const Large: Story = {
	args: {
		...commonConfig.args,
		size: "lg",
		description: "Toast description",
		secondaryAction: <ToastAction>Secondary</ToastAction>
	},
	parameters: {
		controls: {
			include: [
				"title",
				"description",
				"status",
				"focus",
				"icon",
				"primaryAction",
				"secondaryAction",
				"closeAction"
			]
		}
	}
};

export const Usage: Story = {
	args: {
		status: "error",
		focus: "high",
		size: "md",
		title: "Что-то пошло не так",
		description: "Возникла проблема с вашим запросом",
		primaryAction: <ToastAction>Повторить</ToastAction>,
		secondaryAction: <ToastAction>Отмена</ToastAction>
	},
	render: (args) => (
		<ToastContainer>
			<ToastDemo {...args} />
		</ToastContainer>
	)
};
