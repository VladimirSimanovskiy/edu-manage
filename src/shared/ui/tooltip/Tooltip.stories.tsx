import type { Meta, StoryObj } from "@storybook/react";
import {
	Tooltip,
	TooltipContent,
	TooltipArrow,
	TooltipIcon,
	TooltipProvider,
	TooltipShortcut,
	TooltipText,
	TooltipTitle,
	TooltipTrigger
} from "./Tooltip";
import { Button } from "../button";
import { Globe } from "lucide-react";

const meta: Meta<typeof TooltipContent> = {
	component: TooltipContent,
	tags: ["autodocs"],
	parameters: {
		layout: "centered"
	},
	decorators: [
		(Story) => (
			<TooltipProvider>
				<Story />
			</TooltipProvider>
		)
	]
};

export default meta;
type Story = StoryObj<typeof TooltipContent>;

export const Default: Story = {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	render: (_) => (
		<div className="flex gap-4">
			<Tooltip>
				<TooltipTrigger asChild>
					<Button>Default focus</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>This is a tooltip</p>
				</TooltipContent>
			</Tooltip>

			<Tooltip>
				<TooltipTrigger asChild>
					<Button>High focus</Button>
				</TooltipTrigger>
				<TooltipContent focus="high">
					<p>This is a tooltip</p>
				</TooltipContent>
			</Tooltip>
		</div>
	)
};

export const AlwaysVisible: Story = {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	render: (_) => (
		<div className="flex gap-24">
			<Tooltip open={true}>
				<TooltipTrigger asChild>
					<Button>Default focus</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>This tooltip is always visible</p>
				</TooltipContent>
			</Tooltip>

			<Tooltip open={true}>
				<TooltipTrigger asChild>
					<Button>High focus</Button>
				</TooltipTrigger>
				<TooltipContent focus="high">
					<p>This tooltip is always visible</p>
				</TooltipContent>
			</Tooltip>
		</div>
	)
};

export const WithComponents: Story = {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	render: (_) => (
		<div className="flex gap-36">
			<Tooltip>
				<TooltipTrigger asChild>
					<Button>Default focus</Button>
				</TooltipTrigger>
				<TooltipContent className="flex max-w-[250px] flex-row gap-2.5 p-3">
					<TooltipIcon icon={Globe} />
					<div className="flex flex-col gap-1">
						<TooltipTitle>This is a tooltip title</TooltipTitle>
						<TooltipText>
							Tooltips are made to be highly customizable, with features like dynamic placement, rich
							content, and a robust API. You can even use them as a full-featured dropdown menu by setting
							the trigger prop to click
						</TooltipText>
						<svg
							width="80"
							height="60"
							viewBox="0 0 80 60"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className="mt-1 w-full rounded border bg-alpha-20"
						>
							<rect width="80" height="60" fill="currentColor" fillOpacity="0" />
							<g transform="translate(30, 20)">
								<rect
									x="0"
									y="0"
									width="20"
									height="20"
									rx="2"
									stroke="currentColor"
									strokeWidth="1.5"
									fill="none"
								/>
								<circle cx="6" cy="7" r="2" fill="currentColor" />
								<path
									d="M0 14 L6 10 L10 12 L20 6 L20 18 L0 18 Z"
									fill="currentColor"
									fillOpacity="0.6"
								/>
							</g>
						</svg>
					</div>
				</TooltipContent>
			</Tooltip>

			<Tooltip>
				<TooltipTrigger asChild>
					<Button>High focus</Button>
				</TooltipTrigger>
				<TooltipContent focus="high" className="flex max-w-[250px] flex-row gap-2.5 p-3">
					<TooltipIcon icon={Globe} />
					<div className="flex flex-col gap-1">
						<TooltipTitle>This is a tooltip title</TooltipTitle>
						<TooltipText>
							Tooltips are made to be highly customizable, with features like dynamic placement, rich
							content, and a robust API. You can even use them as a full-featured dropdown menu by setting
							the trigger prop to click
						</TooltipText>
						<svg
							width="80"
							height="60"
							viewBox="0 0 80 60"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className="mt-1 w-full rounded border bg-alpha-high-20"
						>
							<rect width="80" height="60" fill="currentColor" fillOpacity="0" />
							<g transform="translate(30, 20)">
								<rect
									x="0"
									y="0"
									width="20"
									height="20"
									rx="2"
									stroke="currentColor"
									strokeWidth="1.5"
									fill="none"
								/>
								<circle cx="6" cy="7" r="2" fill="currentColor" />
								<path
									d="M0 14 L6 10 L10 12 L20 6 L20 18 L0 18 Z"
									fill="currentColor"
									fillOpacity="0.6"
								/>
							</g>
						</svg>
					</div>
				</TooltipContent>
			</Tooltip>
		</div>
	)
};

export const WithArrow: Story = {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	render: (_) => (
		<div className="flex flex-col gap-24">
			<div className="grid grid-cols-5 place-items-center gap-36">
				<Tooltip>
					<TooltipTrigger asChild>
						<Button className="w-24">Bottom</Button>
					</TooltipTrigger>
					<TooltipContent side="bottom">
						<TooltipArrow />
						<p>Tooltip with arrow</p>
					</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button className="w-24">Top</Button>
					</TooltipTrigger>
					<TooltipContent side="top">
						<TooltipArrow />
						<p>Tooltip with arrow</p>
					</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button className="w-24">Left</Button>
					</TooltipTrigger>
					<TooltipContent side="left">
						<TooltipArrow />
						<p>Tooltip with arrow</p>
					</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button className="w-24">Right</Button>
					</TooltipTrigger>
					<TooltipContent side="right">
						<TooltipArrow />
						<p>Tooltip with arrow</p>
					</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button className="w-24">Custom</Button>
					</TooltipTrigger>
					<TooltipContent side="top">
						<TooltipArrow className="translate-x-11" />
						<p>Tooltip with custom styles</p>
					</TooltipContent>
				</Tooltip>
			</div>

			<div className="grid grid-cols-5 place-items-center gap-36">
				<Tooltip>
					<TooltipTrigger asChild>
						<Button className="w-24">Bottom</Button>
					</TooltipTrigger>
					<TooltipContent focus="high" side="bottom">
						<TooltipArrow />
						<p>Tooltip with arrow</p>
					</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button className="w-24">Top</Button>
					</TooltipTrigger>
					<TooltipContent focus="high" side="top">
						<TooltipArrow />
						<p>Tooltip with arrow</p>
					</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button className="w-24">Left</Button>
					</TooltipTrigger>
					<TooltipContent focus="high" side="left">
						<TooltipArrow />
						<p>Tooltip with arrow</p>
					</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button className="w-24">Right</Button>
					</TooltipTrigger>
					<TooltipContent focus="high" side="right">
						<TooltipArrow />
						<p>Tooltip with arrow</p>
					</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button className="w-24">Custom</Button>
					</TooltipTrigger>
					<TooltipContent focus="high" side="top">
						<TooltipArrow className="translate-x-11" />
						<p>Tooltip with custom styles</p>
					</TooltipContent>
				</Tooltip>
			</div>
		</div>
	)
};

export const WithShortcut: Story = {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	render: (_) => (
		<div className="flex gap-24">
			<Tooltip>
				<TooltipTrigger asChild>
					<Button>Default focus</Button>
				</TooltipTrigger>
				<TooltipContent className="flex flex-row gap-2">
					<p>This is a tooltip</p>
					<TooltipShortcut>⌘K</TooltipShortcut>
				</TooltipContent>
			</Tooltip>

			<Tooltip>
				<TooltipTrigger asChild>
					<Button>High focus</Button>
				</TooltipTrigger>
				<TooltipContent focus="high" className="flex flex-row gap-2">
					<p>This is a tooltip</p>
					<TooltipShortcut>⌘K</TooltipShortcut>
				</TooltipContent>
			</Tooltip>
		</div>
	)
};

type PlaygroundArgs = {
	side: "top" | "right" | "bottom" | "left";
	sideOffset: number;
	align: "start" | "center" | "end";
	focus: "high" | undefined;
	open?: boolean;
	showArrow: boolean;
	content: string;
};

export const Playground: StoryObj<PlaygroundArgs> = {
	argTypes: {
		side: {
			control: { type: "select" },
			options: ["top", "right", "bottom", "left"]
		},
		sideOffset: {
			control: { type: "number", min: 0, max: 20, step: 1 }
		},
		align: {
			control: { type: "select" },
			options: ["start", "center", "end"]
		},
		focus: {
			control: { type: "boolean" }
		},
		showArrow: {
			control: { type: "boolean" }
		},
		content: {
			control: { type: "text" }
		}
	},
	args: {
		side: "top",
		sideOffset: 4,
		align: "center",
		showArrow: false,
		content: "Это настраиваемый тултип с различными параметрами"
	},
	render: (args) => (
		<div className="flex flex-col items-center gap-8">
			<div className="mb-4 text-sm text-muted-foreground">
				Наведите курсор на кнопку, чтобы увидеть тултип с настройками
			</div>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button>Настройки тултипа</Button>
					</TooltipTrigger>
					<TooltipContent
						side={args.side}
						sideOffset={args.sideOffset}
						align={args.align}
						focus={args.focus ? "high" : undefined}
						className="max-w-xs p-3"
					>
						{args.showArrow && <TooltipArrow />}
						<div className="flex flex-col gap-2">
							<TooltipTitle>Настройки тултипа</TooltipTitle>
							<TooltipText>{args.content}</TooltipText>
						</div>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	)
};
