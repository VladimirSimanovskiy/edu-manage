import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../button/button/Button";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogIcon,
	AlertDialogTitle,
	AlertDialogTrigger
} from "./AlertDialog";
import { Info } from "lucide-react";

const meta = {
	component: AlertDialog,
	parameters: {
		layout: "centered"
	},
	tags: ["autodocs"]
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof AlertDialog>;

export const Default: Story = {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	render: (_) => (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="outline">Show Dialog</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your account and remove your data
						from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
};

type PlaygroundArgs = {
	status: "success" | "warning" | "error" | "info";
	focus: "low" | "medium" | "high";
	overlayBlur?: boolean;
	overlayType?: "default" | "gradient" | "transparent";
	withIcon: boolean;
	withTitle: boolean;
	withDescription: boolean;
	title: string;
	description: string;
	cancelText: string;
	actionText: string;
	cancelVariant: "primary" | "secondary" | "outline" | "ghost" | "link" | "text";
	actionVariant: "primary" | "secondary" | "outline" | "ghost" | "link" | "text";
	actionStatus: "default" | "info" | "success" | "warning" | "error";
};

export const Playground: StoryObj<PlaygroundArgs> = {
	parameters: {
		controls: {
			exclude: ["className", "children"]
		}
	},
	argTypes: {
		status: {
			options: ["default", "success", "warning", "error", "info"],
			control: { type: "radio" }
		},
		focus: {
			options: ["low", "medium", "high"],
			control: { type: "radio" }
		},
		overlayBlur: {
			control: "boolean"
		},
		overlayType: {
			options: ["default", "gradient", "transparent"],
			control: { type: "radio" }
		},
		withIcon: {
			control: "boolean"
		},
		withTitle: {
			control: "boolean"
		},
		withDescription: {
			control: "boolean"
		},
		title: {
			control: "text"
		},
		description: {
			control: "text"
		},
		cancelText: {
			control: "text"
		},
		actionText: {
			control: "text"
		},
		cancelVariant: {
			options: ["primary", "secondary", "outline", "ghost", "link", "text"],
			control: { type: "select" }
		},
		actionVariant: {
			options: ["primary", "secondary", "outline", "ghost", "link", "text"],
			control: { type: "select" }
		},
		actionStatus: {
			options: ["info", "success", "warning", "error"],
			control: { type: "select" }
		}
	},
	args: {
		focus: "low",
		overlayBlur: true,
		overlayType: "default",
		withIcon: true,
		withTitle: true,
		withDescription: true,
		title: "Are you sure?",
		description:
			"This action cannot be undone. This will permanently delete your account and all data from our servers.",
		cancelText: "Cancel",
		actionText: "Continue",
		cancelVariant: "text",
		actionVariant: "outline",
		actionStatus: "default"
	},
	render: (args) => {
		const {
			status,
			focus,
			overlayBlur,
			overlayType,
			withIcon,
			withTitle,
			withDescription,
			title,
			description,
			cancelText,
			actionText,
			cancelVariant,
			actionVariant,
			actionStatus
		} = args;

		return (
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button variant="outline">Open Dialog</Button>
				</AlertDialogTrigger>
				<AlertDialogContent status={status} focus={focus} overlayBlur={overlayBlur} overlayType={overlayType}>
					<AlertDialogHeader>
						{withIcon && <AlertDialogIcon icon={Info} />}
						{withTitle && <AlertDialogTitle>{title}</AlertDialogTitle>}
						{withDescription && <AlertDialogDescription>{description}</AlertDialogDescription>}
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel variant={cancelVariant}>{cancelText}</AlertDialogCancel>
						<AlertDialogAction variant={actionVariant} status={actionStatus}>
							{actionText}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		);
	}
};

export const Showcase: Story = {
	render: () => {
		const statusOptions: Array<"success" | "warning" | "error" | "info"> = ["success", "warning", "error", "info"];
		const focusOptions: Array<"low" | "medium" | "high"> = ["low", "medium", "high"];

		return (
			<div className="grid gap-6">
				{focusOptions.map((focus) => (
					<div key={focus} className="space-y-4">
						<h3 className="text-lg font-semibold capitalize">Focus: {focus}</h3>
						<div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
							{statusOptions.map((status) => {
								return (
									<AlertDialog key={`${focus}-${status}`}>
										<AlertDialogTrigger asChild>
											<Button status={status} className="w-full justify-center">
												{status}
											</Button>
										</AlertDialogTrigger>
										<AlertDialogContent status={status} focus={focus}>
											<AlertDialogHeader>
												<AlertDialogIcon icon={Info} />
												<AlertDialogTitle>Status: {status}</AlertDialogTitle>
												<AlertDialogDescription>
													Focus: {focus}. Этот диалог демонстрирует комбинацию статуса "
													{status}" и уровня фокуса "{focus}".
												</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel>Отмена</AlertDialogCancel>
												<AlertDialogAction>Продолжить</AlertDialogAction>
											</AlertDialogFooter>
										</AlertDialogContent>
									</AlertDialog>
								);
							})}
						</div>
					</div>
				))}
			</div>
		);
	}
};
