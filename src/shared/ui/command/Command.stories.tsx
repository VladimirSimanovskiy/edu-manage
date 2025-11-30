import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Search, Settings, User, Mail, Calendar, FileText, Home } from "lucide-react";
import {
	Command,
	CommandDialog,
	CommandInput,
	CommandList,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandShortcut,
	CommandSeparator
} from "./Command";
import { Button } from "../button";
import { Icon } from "../icon";
import { ComponentVariantProvider } from "@/shared/providers/component-variant-context";

const meta = {
	component: Command,
	parameters: {
		layout: "centered"
	},
	tags: ["autodocs"]
} satisfies Meta<typeof Command>;

export default meta;
type Story = StoryObj<typeof Command>;

export const Default: Story = {
	render: () => (
		<Command className="shadow-md">
			<CommandInput placeholder="Поиск команд..." />
			<CommandList>
				<CommandEmpty>Ничего не найдено.</CommandEmpty>
				<CommandGroup heading="Предложения">
					<CommandItem>
						<Icon icon={Calendar} />
						<span>Календарь</span>
					</CommandItem>
					<CommandItem>
						<Icon icon={Mail} />
						<span>Почта</span>
					</CommandItem>
					<CommandItem>
						<Icon icon={FileText} />
						<span>Документы</span>
					</CommandItem>
				</CommandGroup>
			</CommandList>
		</Command>
	)
};

export const WithShortcuts: Story = {
	render: () => (
		<Command className="shadow-md">
			<CommandInput placeholder="Поиск команд..." />
			<CommandList>
				<CommandEmpty>Ничего не найдено.</CommandEmpty>
				<CommandGroup heading="Навигация">
					<CommandItem>
						<Icon icon={Home} />
						<span>Главная</span>
						<CommandShortcut>⌘H</CommandShortcut>
					</CommandItem>
					<CommandItem>
						<Icon icon={Search} />
						<span>Поиск</span>
						<CommandShortcut>⌘K</CommandShortcut>
					</CommandItem>
				</CommandGroup>
				<CommandSeparator />
				<CommandGroup heading="Настройки">
					<CommandItem>
						<Icon icon={Settings} />
						<span>Настройки</span>
						<CommandShortcut>⌘,</CommandShortcut>
					</CommandItem>
					<CommandItem>
						<Icon icon={User} />
						<span>Профиль</span>
						<CommandShortcut>⌘P</CommandShortcut>
					</CommandItem>
				</CommandGroup>
			</CommandList>
		</Command>
	)
};

const DialogExample = () => {
	const [open, setOpen] = React.useState(false);

	return (
		<>
			<Button onClick={() => setOpen(true)}>Открыть командную палитру</Button>
			<CommandDialog
				open={open}
				onOpenChange={setOpen}
				title="Список команд"
				description="Выбор команды для выполнения..."
			>
				<CommandInput placeholder="Поиск команд..." />
				<CommandList>
					<CommandEmpty>Ничего не найдено.</CommandEmpty>
					<CommandGroup heading="Файлы">
						<CommandItem>
							<Icon icon={FileText} />
							<span>Новый файл</span>
							<CommandShortcut>⌘N</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<Icon icon={FileText} />
							<span>Открыть файл</span>
							<CommandShortcut>⌘O</CommandShortcut>
						</CommandItem>
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading="Редактирование">
						<CommandItem>
							<span>Копировать</span>
							<CommandShortcut>⌘C</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<span>Вставить</span>
							<CommandShortcut>⌘V</CommandShortcut>
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</>
	);
};

export const Dialog: Story = {
	render: () => <DialogExample />
};

export const MultipleGroups: Story = {
	render: () => (
		<Command className="shadow-md">
			<CommandInput placeholder="Поиск команд..." />
			<CommandList>
				<CommandEmpty>Ничего не найдено.</CommandEmpty>
				<CommandGroup heading="Быстрые действия">
					<CommandItem>
						<Icon icon={Search} />
						<span>Быстрый поиск</span>
						<CommandShortcut>⌘K</CommandShortcut>
					</CommandItem>
					<CommandItem>
						<Icon icon={FileText} />
						<span>Создать документ</span>
						<CommandShortcut>⌘N</CommandShortcut>
					</CommandItem>
				</CommandGroup>
				<CommandSeparator />
				<CommandGroup heading="Навигация">
					<CommandItem>
						<Icon icon={Home} />
						<span>Главная страница</span>
					</CommandItem>
					<CommandItem>
						<Icon icon={Calendar} />
						<span>Календарь</span>
					</CommandItem>
					<CommandItem>
						<Icon icon={Mail} />
						<span>Почта</span>
					</CommandItem>
				</CommandGroup>
				<CommandSeparator />
				<CommandGroup heading="Настройки">
					<CommandItem>
						<Icon icon={Settings} />
						<span>Общие настройки</span>
					</CommandItem>
					<CommandItem>
						<Icon icon={User} />
						<span>Профиль пользователя</span>
					</CommandItem>
				</CommandGroup>
			</CommandList>
		</Command>
	)
};

export const Inverse: Story = {
	render: () => (
		<ComponentVariantProvider variant="inverse">
			<Command className="shadow-md">
				<CommandInput placeholder="Поиск команд..." />
				<CommandList>
					<CommandEmpty>Ничего не найдено.</CommandEmpty>
					<CommandGroup heading="Предложения">
						<CommandItem>
							<Icon icon={Calendar} />
							<span>Календарь</span>
						</CommandItem>
						<CommandItem>
							<Icon icon={Mail} />
							<span>Почта</span>
						</CommandItem>
						<CommandItem>
							<Icon icon={FileText} />
							<span>Документы</span>
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</Command>
		</ComponentVariantProvider>
	)
};
