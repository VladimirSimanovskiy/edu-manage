import type { Meta, StoryObj } from "@storybook/react";
import { Info, CheckCircle, AlertTriangle, XCircle, AlertCircle } from "lucide-react";
import { Alert, type AlertProps } from "./Alert";
import { AlertTitle } from "./components/AlertTitle";
import { AlertDescription } from "./components/AlertDescription";
import { AlertIcon } from "./components/AlertIcon";
import { AlertButton } from "./components/AlertButton";

interface PlaygroundArgs extends AlertProps {
	withIcon?: boolean;
	withTitle?: boolean;
	withDescription?: boolean;
	withButton?: boolean;
	title?: string;
	description?: string;
	button?: string;
}

const meta = {
	component: Alert,
	parameters: {
		layout: "centered"
	},
	tags: ["autodocs"],
	argTypes: {
		status: {
			options: ["default", "success", "warning", "error", "info"],
			control: { type: "select" }
		},
		focus: {
			options: ["low", "medium", "high"],
			control: { type: "radio" }
		}
	}
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
	parameters: {
		controls: {
			exclude: ["children"]
		}
	},
	args: {
		children: (
			<>
				<AlertTitle>Alert Title</AlertTitle>
				<AlertDescription>
					This is a basic alert message that provides important information to the user
				</AlertDescription>
				<AlertButton>Close</AlertButton>
			</>
		)
	}
};

export const Playground: StoryObj<PlaygroundArgs> = {
	parameters: {
		controls: {
			exclude: ["className", "children"]
		}
	},
	argTypes: {
		withIcon: {
			control: "boolean"
		},
		withTitle: {
			control: "boolean"
		},
		withDescription: {
			control: "boolean"
		},
		withButton: {
			control: "boolean"
		},
		title: {
			control: "text"
		},
		description: {
			control: "text"
		},
		button: {
			control: "text"
		}
	},
	args: {
		focus: "low",
		withIcon: true,
		withTitle: true,
		withDescription: true,
		withButton: true,
		title: "Information",
		description: "This alert includes an icon to better communicate the message type",
		button: "Button"
	},
	render: (args) => {
		const { withIcon, withTitle, withDescription, withButton, title, description, button, ...alertProps } = args;

		return (
			<Alert {...alertProps}>
				{withIcon && <AlertIcon icon={Info} />}
				{withTitle && <AlertTitle>{title}</AlertTitle>}
				{withDescription && <AlertDescription>{description}</AlertDescription>}
				{withButton && <AlertButton>{button}</AlertButton>}
			</Alert>
		);
	}
};

export const Showcase: Story = {
	parameters: {
		controls: {
			exclude: ["className", "children", "status", "focus"]
		}
	},
	render: () => (
		<div className="w-full space-y-6">
			{/* Default статусы */}
			<div className="space-y-3">
				<h3 className="text-sm font-medium text-gray-700">Default статус</h3>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					<Alert focus="low">
						<AlertIcon icon={AlertCircle} />
						<AlertTitle>Default Low</AlertTitle>
						<AlertDescription>Базовое сообщение с низкой важностью</AlertDescription>
						<AlertButton>Button</AlertButton>
					</Alert>
					<Alert focus="medium">
						<AlertIcon icon={AlertCircle} />
						<AlertTitle>Default Medium</AlertTitle>
						<AlertDescription>Базовое сообщение со средней важностью</AlertDescription>
						<AlertButton>Button</AlertButton>
					</Alert>
					<Alert focus="high">
						<AlertIcon icon={AlertCircle} />
						<AlertTitle>Default High</AlertTitle>
						<AlertDescription>Базовое сообщение с высокой важностью</AlertDescription>
						<AlertButton>Button</AlertButton>
					</Alert>
				</div>
			</div>

			{/* Info статусы */}
			<div className="space-y-3">
				<h3 className="text-sm font-medium text-blue-700">Info статус</h3>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					<Alert status="info" focus="low">
						<AlertIcon icon={Info} />
						<AlertTitle>Info Low</AlertTitle>
						<AlertDescription>Информационное сообщение с низкой важностью</AlertDescription>
						<AlertButton>Button</AlertButton>
					</Alert>
					<Alert status="info" focus="medium">
						<AlertIcon icon={Info} />
						<AlertTitle>Info Medium</AlertTitle>
						<AlertDescription>Информационное сообщение со средней важностью</AlertDescription>
						<AlertButton>Button</AlertButton>
					</Alert>
					<Alert status="info" focus="high">
						<AlertIcon icon={Info} />
						<AlertTitle>Info High</AlertTitle>
						<AlertDescription>Информационное сообщение с высокой важностью</AlertDescription>
						<AlertButton>Button</AlertButton>
					</Alert>
				</div>
			</div>

			{/* Success статусы */}
			<div className="space-y-3">
				<h3 className="text-sm font-medium text-green-700">Success статус</h3>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					<Alert status="success" focus="low">
						<AlertIcon icon={CheckCircle} />
						<AlertTitle>Success Low</AlertTitle>
						<AlertDescription>Сообщение об успехе с низкой важностью</AlertDescription>
						<AlertButton>Button</AlertButton>
					</Alert>
					<Alert status="success" focus="medium">
						<AlertIcon icon={CheckCircle} />
						<AlertTitle>Success Medium</AlertTitle>
						<AlertDescription>Сообщение об успехе со средней важностью</AlertDescription>
						<AlertButton>Button</AlertButton>
					</Alert>
					<Alert status="success" focus="high">
						<AlertIcon icon={CheckCircle} />
						<AlertTitle>Success High</AlertTitle>
						<AlertDescription>Сообщение об успехе с высокой важностью</AlertDescription>
						<AlertButton>Button</AlertButton>
					</Alert>
				</div>
			</div>

			{/* Warning статусы */}
			<div className="space-y-3">
				<h3 className="text-sm font-medium text-yellow-700">Warning статус</h3>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					<Alert status="warning" focus="low">
						<AlertIcon icon={AlertTriangle} />
						<AlertTitle>Warning Low</AlertTitle>
						<AlertDescription>Предупреждение с низкой важностью</AlertDescription>
						<AlertButton>Button</AlertButton>
					</Alert>
					<Alert status="warning" focus="medium">
						<AlertIcon icon={AlertTriangle} />
						<AlertTitle>Warning Medium</AlertTitle>
						<AlertDescription>Предупреждение со средней важностью</AlertDescription>
						<AlertButton>Button</AlertButton>
					</Alert>
					<Alert status="warning" focus="high">
						<AlertIcon icon={AlertTriangle} />
						<AlertTitle>Warning High</AlertTitle>
						<AlertDescription>Предупреждение с высокой важностью</AlertDescription>
						<AlertButton>Button</AlertButton>
					</Alert>
				</div>
			</div>

			{/* Error статусы */}
			<div className="space-y-3">
				<h3 className="text-sm font-medium text-red-700">Error статус</h3>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					<Alert status="error" focus="low">
						<AlertIcon icon={XCircle} />
						<AlertTitle>Error Low</AlertTitle>
						<AlertDescription>Сообщение об ошибке с низкой важностью</AlertDescription>
						<AlertButton>Button</AlertButton>
					</Alert>
					<Alert status="error" focus="medium">
						<AlertIcon icon={XCircle} />
						<AlertTitle>Error Medium</AlertTitle>
						<AlertDescription>Сообщение об ошибке со средней важностью</AlertDescription>
						<AlertButton>Button</AlertButton>
					</Alert>
					<Alert status="error" focus="high">
						<AlertIcon icon={XCircle} />
						<AlertTitle>Error High</AlertTitle>
						<AlertDescription>Сообщение об ошибке с высокой важностью</AlertDescription>
						<AlertButton>Button</AlertButton>
					</Alert>
				</div>
			</div>
		</div>
	)
};
