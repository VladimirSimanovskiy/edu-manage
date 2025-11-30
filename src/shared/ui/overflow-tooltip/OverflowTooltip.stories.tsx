import { storyDecorator } from "@/lib/utils/storybook";
import { OverflowTooltip } from "./OverflowTooltip";
import { Meta, StoryObj } from "@storybook/react";
import { Button } from "../button";
import { Badge } from "../badge/Badge";
import { ActionCard, CardSubTitle, CardTitle } from "../card";
import { Icon } from "../icon";
import { Circle, Info, User } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuShortcut,
	DropdownMenuTrigger
} from "../dropdown";
import { Alert, AlertDescription, AlertIcon, AlertTitle } from "../alert";
import { MenuItem, MenuItemIcon, MenuItemText } from "../menu-item";

const meta: Meta<typeof OverflowTooltip> = {
	component: OverflowTooltip,
	tags: ["autodocs"],
	decorators: [storyDecorator("mx-auto w-fit")],
	argTypes: {
		children: {
			control: "text",
			description: "Текст для отображения с возможностью показа в тултипе при переполнении"
		},
		className: {
			control: "text",
			description: "Дополнительные CSS классы"
		},
		tooltipClassName: {
			control: "text",
			description: "Дополнительные CSS классы для содержимого тултипа"
		},
		focus: {
			control: "select",
			options: ["high", ""],
			description: "Тип фокуса для тултипа"
		}
	}
};
export default meta;
type Story = StoryObj<typeof OverflowTooltip>;

export const Default: Story = {
	args: {
		children:
			"Очень длинный текст, который не помещается в контейнер и будет отображаться в подсказке при переполнении",
		className: "inline-block max-w-full truncate",
		tooltipClassName: "max-w-xs"
	},
	render: (args) => (
		<div className="w-48 overflow-hidden border p-2">
			<OverflowTooltip {...args} />
		</div>
	)
};

export const MultipleLines: Story = {
	args: {
		children: `Длинный многострочный текст
		который не помещается в контейнер 
		и будет отображаться 
		в подсказке при переполнении`,
		className: "line-clamp-2",
		tooltipClassName: "whitespace-pre-line"
	},
	render: (args) => (
		<div className="w-48 overflow-hidden border p-2">
			<OverflowTooltip {...args} />
		</div>
	)
};

export const WithFadeOut: Story = {
	args: {
		children:
			"Очень длинный текст, который не помещается в контейнер и будет отображаться в подсказке при переполнении",
		className: "[mask-image:linear-gradient(to_left,rgba(255,255,255,0),#fff_30%)] whitespace-nowrap block",
		tooltipClassName: "max-w-xs"
	},
	render: (args) => (
		<div className="w-56 overflow-hidden border p-2 pr-0">
			<OverflowTooltip {...args} />
		</div>
	)
};

export const WithComponents: Story = {
	args: {
		children:
			"Очень длинный текст, который не помещается в контейнер и будет отображаться в подсказке при переполнении",
		className: "inline-block max-w-full truncate",
		tooltipClassName: "max-w-xs"
	},
	render: (args) => (
		<div className="flex max-w-[600px] flex-col gap-2 overflow-hidden">
			<div className="flex flex-row gap-2">
				<Button>
					<OverflowTooltip {...args} />
				</Button>
				<Button variant="outline" status="info">
					<OverflowTooltip {...args} />
				</Button>
				<Button variant="primary">
					<OverflowTooltip {...args} />
				</Button>
			</div>
			<div className="flex flex-row gap-2">
				<Badge>
					<OverflowTooltip {...args} />
				</Badge>
				<Badge status="info">
					<OverflowTooltip {...args} />
				</Badge>
				<Badge status="success">
					<OverflowTooltip {...args} />
				</Badge>
				<Badge focus="high" status="success">
					<OverflowTooltip {...args} />
				</Badge>
				<Badge focus="high" status="info">
					<OverflowTooltip {...args} />
				</Badge>
			</div>
			<div className="flex flex-row gap-2">
				<ActionCard>
					<CardTitle>
						<OverflowTooltip {...args} className="block truncate">
							{args.children}
						</OverflowTooltip>
					</CardTitle>
					<CardSubTitle>
						<OverflowTooltip {...args} className="line-clamp-3">
							{args.children}
						</OverflowTooltip>
					</CardSubTitle>
				</ActionCard>
				<ActionCard>
					<CardTitle>
						<OverflowTooltip {...args} className="block truncate">
							{args.children}
						</OverflowTooltip>
					</CardTitle>
					<CardSubTitle>
						<OverflowTooltip {...args} className="line-clamp-3">
							{args.children}
						</OverflowTooltip>
					</CardSubTitle>
				</ActionCard>
				<ActionCard>
					<CardTitle>
						<OverflowTooltip {...args} className="block truncate">
							{args.children}
						</OverflowTooltip>
					</CardTitle>
					<CardSubTitle>
						<OverflowTooltip {...args} className="line-clamp-3">
							{args.children}
						</OverflowTooltip>
					</CardSubTitle>
				</ActionCard>
			</div>
			<div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline">Open</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-56">
						<DropdownMenuItem>
							<Icon icon={User} className="shrink-0" />
							<OverflowTooltip className="truncate">{args.children}</OverflowTooltip>
							<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div>
				<MenuItem className="max-w-[300px]">
					<MenuItemIcon icon={Circle} />
					<MenuItemText>
						<OverflowTooltip className="block truncate">
							Очень длинный текст, который не помещается в контейнер и будет отображаться в подсказке при
							переполнении
						</OverflowTooltip>
					</MenuItemText>
				</MenuItem>
			</div>
			<div className="flex flex-row gap-2">
				<Alert focus="low" status="info">
					<AlertIcon icon={Info} />
					<AlertTitle>
						<OverflowTooltip {...args} />
					</AlertTitle>
					<AlertDescription>
						<OverflowTooltip {...args} className="line-clamp-3" triggerTag="div">
							<p className="mb-2">
								Демонстрация работы с многострочным HTML-содержимым в компоненте OverflowTooltip.
							</p>
							<p>
								При работе с составными элементами, содержащими несколько блоков текста, рекомендуется
								использовать свойство triggerTag="div" для обеспечения корректной семантической
								структуры документа и соблюдения стандартов доступности.
							</p>
						</OverflowTooltip>
					</AlertDescription>
				</Alert>
			</div>
		</div>
	)
};
