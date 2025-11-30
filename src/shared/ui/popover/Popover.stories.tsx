import type { Meta, StoryObj } from "@storybook/react";
import { Popover, PopoverContent, PopoverAnchor, PopoverTriggerButton, PopoverTrigger } from "./Popover";
import { Switch } from "../switch/Switch";
import { Label } from "../label/Label";
import { Divider } from "../divider/Divider";
import { Badge } from "../badge/Badge";
import { useState } from "react";
import { Button } from "../button";

const meta: Meta<typeof Popover> = {
	title: "Components/Popover",
	component: Popover,
	tags: ["autodocs"],
	parameters: {
		layout: "centered"
	}
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
	render: () => (
		<Popover>
			<PopoverTriggerButton variant="outline">Открыть Popover</PopoverTriggerButton>
			<PopoverContent>
				<div>Содержимое всплывающего окна</div>
			</PopoverContent>
		</Popover>
	)
};

type PlaygroundArgs = {
	modal: boolean;
	side: "top" | "right" | "bottom" | "left";
	sideOffset: number;
	align: "start" | "center" | "end";
	avoidCollisions: boolean;
};

export const Playground: StoryObj<{ render: (args: PlaygroundArgs) => JSX.Element }> = {
	args: {
		modal: false,
		side: "bottom",
		sideOffset: 0,
		align: "start",
		avoidCollisions: true
	},
	argTypes: {
		modal: {
			control: "boolean",
			description:
				"Определяет, должно ли всплывающее окно быть модальным. Если true, то взаимодействие с внешними элементами будет заблокировано, и только содержимое всплывающего окна будет доступно для скринридеров."
		},
		side: {
			control: "select",
			options: ["top", "right", "bottom", "left"]
		},
		sideOffset: {
			control: "number",
			description: "Расстояние в пикселях от anchor."
		},
		align: {
			control: "select",
			options: ["start", "center", "end"]
		},
		avoidCollisions: {
			control: "boolean",
			description: "Если true, то переопределяет side и align для предотвращения столкновений с краями экрана."
		}
	},
	render: function PlaygroundStory({ modal, side, sideOffset, align, avoidCollisions }) {
		const [openState, setOpen] = useState(false);

		return (
			<Popover open={openState} onOpenChange={setOpen} modal={modal}>
				<PopoverTriggerButton variant="outline">Открыть Popover</PopoverTriggerButton>
				<PopoverContent
					className="w-80"
					side={side}
					sideOffset={sideOffset}
					align={align}
					avoidCollisions={avoidCollisions}
				>
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<h4 className="font-medium leading-none">Настройки уведомлений</h4>
							<Badge status="success">Новое</Badge>
						</div>
						<Divider />
						<div className="space-y-3">
							<div className="flex items-center justify-between">
								<Label>Push уведомления</Label>
								<Switch />
							</div>
							<div className="flex items-center justify-between">
								<Label>Email уведомления</Label>
								<Switch />
							</div>
							<div className="flex items-center justify-between">
								<Label>SMS уведомления</Label>
								<Switch />
							</div>
						</div>
					</div>
				</PopoverContent>
			</Popover>
		);
	}
};

export const WithAnchor: Story = {
	render: () => (
		<div className="flex flex-col items-center space-y-8 p-8">
			<div className="text-sm text-muted-foreground">
				Popover позиционируется относительно якоря (красная рамка), а не триггера
			</div>
			<Popover>
				<div className="flex items-center space-x-4">
					<PopoverTriggerButton variant="outline">Открыть Popover</PopoverTriggerButton>
					<span className="text-muted-foreground">←→</span>
					<PopoverAnchor asChild>
						<div className="flex h-16 w-16 items-center justify-center rounded-md border-2 border-dashed border-red-500 text-xs text-red-500">
							Якорь
						</div>
					</PopoverAnchor>
				</div>
				<PopoverContent>
					<div className="space-y-2">
						<h4 className="font-medium">Позиционирование с якорем</h4>
						<p className="text-sm text-muted-foreground">
							Это всплывающее окно позиционируется относительно красного якоря, а не кнопки-триггера.
						</p>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	)
};

export const WithCustomTrigger: Story = {
	render: () => (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="link">Открыть Popover</Button>
			</PopoverTrigger>
			<PopoverContent>
				<div>Содержимое всплывающего окна</div>
			</PopoverContent>
		</Popover>
	)
};
