import type { Meta, StoryObj } from "@storybook/react";
import { Check, GitBranch, Github, Gitlab, LucideIcon, Plus, Trash } from "lucide-react";
import { useState } from "react";
import { withFixedWidth } from "../../lib/utils/storybook";
import { Icon } from "../icon";
import { MenuItem, MenuItemActionTemplate, MenuItemIcon, MenuItemIconButton, MenuItemText } from "../menu-item";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectItemIndicator,
	SelectItemText,
	SelectLabel,
	SelectOption,
	SelectSeparator,
	SelectTrigger,
	SelectValue
} from "./Select";

const meta: Meta<typeof Select> = {
	title: "Components/Select",
	component: Select,
	parameters: {
		layout: "centered"
	},
	decorators: [withFixedWidth("300px")],
	tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
	render: () => (
		<Select>
			<SelectTrigger>
				<SelectValue placeholder="Выберите фрукт" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Фрукты</SelectLabel>
					<SelectItem value="apple">Яблоко</SelectItem>
					<SelectItem value="banana">Банан</SelectItem>
					<SelectItem value="orange">Апельсин</SelectItem>
					<SelectItem value="grape">Виноград</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	)
};

export const Disabled: Story = {
	render: () => (
		<Select disabled>
			<SelectTrigger>
				<SelectValue placeholder="Выберите фрукт" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Фрукты</SelectLabel>
					<SelectItem value="apple">Яблоко</SelectItem>
					<SelectItem value="banana">Банан</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	)
};

export const Invalid: Story = {
	render: () => (
		<Select>
			<SelectTrigger invalid={true}>
				<SelectValue placeholder="Выберите фрукт" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Фрукты</SelectLabel>
					<SelectItem value="apple">Яблоко</SelectItem>
					<SelectItem value="banana">Банан</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	)
};

export const WithGroups: Story = {
	render: () => (
		<Select>
			<SelectTrigger>
				<SelectValue placeholder="Выберите еду" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Фрукты</SelectLabel>
					<SelectItem value="apple">Яблоко</SelectItem>
					<SelectItem value="banana">Банан</SelectItem>
					<SelectItem value="orange">Апельсин</SelectItem>
					<SelectItem value="grape">Виноград</SelectItem>
					<SelectItem value="mango">Манго</SelectItem>
					<SelectItem value="lime">Лайм</SelectItem>
					<SelectItem value="lemon">Лимон</SelectItem>
				</SelectGroup>
				<SelectGroup>
					<SelectLabel>Овощи</SelectLabel>
					<SelectItem value="carrot">Морковь</SelectItem>
					<SelectItem value="potato">Картофель</SelectItem>
					<SelectItem value="onion">Лук</SelectItem>
					<SelectItem value="tomato">Томат</SelectItem>
					<SelectItem value="cucumber">Огурец</SelectItem>
					<SelectItem value="pepper">Перец</SelectItem>
					<SelectItem value="garlic">Чеснок</SelectItem>
					<SelectItem value="ginger">Имбирь</SelectItem>
					<SelectItem value="broccoli">Брокколи</SelectItem>
					<SelectItem value="cabbage">Капуста</SelectItem>
					<SelectItem value="cauliflower">Цветная капуста</SelectItem>
					<SelectItem value="zucchini">Кукуруза</SelectItem>
					<SelectItem value="pumpkin">Тыква</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	)
};

export const WithClearButton: Story = {
	render: () => {
		const SelectWithClearButton = () => {
			const [value, setValue] = useState("apple");

			const fruits = {
				apple: "🍎 Яблоко",
				banana: "🍌 Банан",
				orange: "🍊 Апельсин",
				grape: "🍇 Виноград"
			};

			const handleClear = () => {
				setValue("");
			};

			return (
				<Select value={value} onValueChange={setValue}>
					<SelectTrigger onClear={value ? handleClear : undefined}>
						<SelectValue placeholder="Выберите фрукт">
							{value && fruits[value as keyof typeof fruits]}
						</SelectValue>
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Фрукты</SelectLabel>
							<SelectItem value="apple">🍎 Яблоко</SelectItem>
							<SelectItem value="banana">🍌 Банан</SelectItem>
							<SelectItem value="orange">🍊 Апельсин</SelectItem>
							<SelectItem value="grape">🍇 Виноград</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			);
		};
		return <SelectWithClearButton />;
	}
};

const CustomSelectOption = ({ value, label, icon }: { value: string; label: string; icon: LucideIcon }) => {
	return (
		<SelectOption value={value} asChild>
			<MenuItem className="pl-8 lg:pl-8">
				<SelectItemIndicator asChild>
					<Icon icon={Check} className="absolute left-2" />
				</SelectItemIndicator>
				<SelectItemText asChild>
					<span className="flex flex-row items-center gap-2">
						<MenuItemIcon icon={icon} />
						<MenuItemText>{label}</MenuItemText>
					</span>
				</SelectItemText>
				<MenuItemIconButton
					icon={Trash}
					className="ml-auto"
					onPointerDown={(e) => {
						e.stopPropagation();
						alert(`Удалить хранилище ${label}`);
					}}
				/>
			</MenuItem>
		</SelectOption>
	);
};

export const WithCustomOption: Story = {
	render: function WithCustomOption() {
		const [open, setOpen] = useState(false);
		const [value, setValue] = useState<string | undefined>(undefined);

		return (
			<Select
				open={open}
				onOpenChange={setOpen}
				value={value}
				onValueChange={(newValue) => {
					if (newValue === "system_action") {
						alert("Добавить новое хранилище");
						return;
					}
					setValue(newValue);
				}}
			>
				<SelectTrigger>
					<SelectValue placeholder="Выберите хранилище" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<CustomSelectOption value="gitlab" label="gitlab" icon={Gitlab} />
						<CustomSelectOption value="github" label="github" icon={Github} />
						<CustomSelectOption value="gramax" label="git self-hosted" icon={GitBranch} />
					</SelectGroup>
					<SelectSeparator />
					<SelectOption value="system_action" asChild role="button" aria-label="Добавить новое хранилище">
						<MenuItem>
							<MenuItemActionTemplate icon={Plus} text="Добавить новое хранилище" />
						</MenuItem>
					</SelectOption>
				</SelectContent>
			</Select>
		);
	}
};
