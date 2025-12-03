import type { Meta, StoryObj } from "@storybook/react";
import { LogOut, Settings, User, X } from "lucide-react";
import { Button } from "../button/button/Button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
	SheetClose
} from "./Sheet";
import { Field } from "../field";
import { TextInput } from "../input";
import { FormBody, FormStack } from "../form";
import { useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTriggerButton
} from "../dropdown";
import { Icon } from "../icon";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../tooltip";
import { Popover, PopoverContent, PopoverTriggerButton } from "../popover";
import { Badge } from "../badge";
import { Divider } from "../divider";
import { Switch } from "../switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select";
import {
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerFooterTemplate,
	DrawerHeaderTemplate,
	DrawerTrigger
} from "../drawer";
import { Label } from "../label";

const meta = {
	component: Sheet,
	parameters: {
		layout: "centered"
	},
	tags: ["autodocs"]
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof Sheet>;

export const Default: Story = {
	render: () => (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline">Открыть панель</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Редактировать профиль</SheetTitle>
					<SheetDescription>
						Внесите изменения в ваш профиль. Нажмите сохранить когда закончите.
					</SheetDescription>
				</SheetHeader>
				<FormBody>
					<FormStack>
						<Field title="Имя" labelClassName="w-20" control={() => <TextInput placeholder="Email" />} />
						<Field
							title="Username"
							labelClassName="w-20"
							control={() => <TextInput placeholder="Email" />}
						/>
					</FormStack>
				</FormBody>
				<SheetFooter>
					<Button type="submit">Сохранить изменения</Button>
					<SheetClose asChild>
						<Button variant="outline">Закрыть</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
};

export const SheetSides: Story = {
	render: () => (
		<div className="flex gap-4">
			<Sheet>
				<SheetTrigger asChild>
					<Button variant="outline">Слева</Button>
				</SheetTrigger>
				<SheetContent side="left">
					<SheetHeader>
						<SheetTitle>Панель слева</SheetTitle>
						<SheetDescription>Эта панель выдвигается слева.</SheetDescription>
					</SheetHeader>
					<FormBody>
						<p>Содержимое левой панели.</p>
					</FormBody>
				</SheetContent>
			</Sheet>

			<Sheet>
				<SheetTrigger asChild>
					<Button variant="outline">Сверху</Button>
				</SheetTrigger>
				<SheetContent side="top">
					<SheetHeader>
						<SheetTitle>Панель сверху</SheetTitle>
						<SheetDescription>Эта панель выдвигается сверху.</SheetDescription>
					</SheetHeader>
					<FormBody>
						<p>Содержимое верхней панели.</p>
					</FormBody>
				</SheetContent>
			</Sheet>

			<Sheet>
				<SheetTrigger asChild>
					<Button variant="outline">Снизу</Button>
				</SheetTrigger>
				<SheetContent side="bottom">
					<SheetHeader>
						<SheetTitle>Панель снизу</SheetTitle>
						<SheetDescription>Эта панель выдвигается снизу.</SheetDescription>
					</SheetHeader>
					<FormBody>
						<p>Содержимое нижней панели.</p>
					</FormBody>
				</SheetContent>
			</Sheet>
		</div>
	)
};

export const WithoutCloseButton: Story = {
	render: () => (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline">Без кнопки закрытия</Button>
			</SheetTrigger>
			<SheetContent showCloseButton={false}>
				<SheetHeader>
					<SheetTitle>Без кнопки закрытия</SheetTitle>
					<SheetDescription>У этой панели нет стандартной кнопки закрытия.</SheetDescription>
				</SheetHeader>
				<FormBody>
					<p>Кликните снаружи или используйте кнопку в футере для закрытия.</p>
				</FormBody>
				<SheetFooter>
					<SheetClose asChild>
						<Button variant="primary">Закрыть</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
};

export const WithCustomCloseButton: Story = {
	render: () => (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline">С кастомной кнопкой</Button>
			</SheetTrigger>
			<SheetContent showCloseButton={false}>
				<SheetHeader>
					<SheetTitle>Кастомная кнопка закрытия</SheetTitle>
					<SheetDescription>Эта панель использует кастомную кнопку закрытия.</SheetDescription>
					<SheetClose className="absolute right-4 top-4 rounded-sm opacity-70">
						<X className="h-4 w-4" />
					</SheetClose>
				</SheetHeader>
				<FormBody>
					<p>Обратите внимание на кастомную иконку закрытия в правом верхнем углу.</p>
				</FormBody>
			</SheetContent>
		</Sheet>
	)
};

export const WithoutBackdropClose: Story = {
	render: () => (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline">Без закрытия по бэкдропу</Button>
			</SheetTrigger>
			<SheetContent
				onInteractOutside={(event) => {
					event.preventDefault();
				}}
			>
				<SheetHeader>
					<SheetTitle>Без закрытия по бэкдропу</SheetTitle>
					<SheetDescription>Эта панель не закрывается при клике снаружи.</SheetDescription>
				</SheetHeader>
				<FormBody>
					<p>Используйте кнопку закрытия или клавишу Escape для закрытия панели.</p>
				</FormBody>
				<SheetFooter>
					<SheetClose asChild>
						<Button variant="primary">Закрыть</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
};

export const CustomOverlay: Story = {
	render: () => (
		<div className="flex gap-4">
			<Sheet>
				<SheetTrigger asChild>
					<Button variant="outline">Градиентный оверлей</Button>
				</SheetTrigger>
				<SheetContent overlayBlur overlayType="gradient">
					<SheetHeader>
						<SheetTitle>Градиентный оверлей</SheetTitle>
						<SheetDescription>У этой панели градиентный оверлей с размытием.</SheetDescription>
					</SheetHeader>
					<FormBody>
						<p>Фон имеет градиентный эффект с размытием.</p>
					</FormBody>
				</SheetContent>
			</Sheet>

			<Sheet>
				<SheetTrigger asChild>
					<Button variant="outline">Прозрачный оверлей</Button>
				</SheetTrigger>
				<SheetContent overlayType="transparent">
					<SheetHeader>
						<SheetTitle>Прозрачный оверлей</SheetTitle>
						<SheetDescription>У этой панели прозрачный оверлей.</SheetDescription>
					</SheetHeader>
					<FormBody>
						<p>Фон полностью прозрачный.</p>
					</FormBody>
				</SheetContent>
			</Sheet>
		</div>
	)
};

export const WithDropdownTooltipPopover: Story = {
	render: () => {
		const WithDropdownTooltipPopoverComponent = () => {
			const [open, setOpen] = useState(false);
			const [popoverOpen, setPopoverOpen] = useState(false);
			const [drawerOpen, setDrawerOpen] = useState(false);
			const [selectValue, setSelectValue] = useState("");

			return (
				<Sheet open={open} onOpenChange={setOpen} modal={false}>
					<SheetTrigger asChild>
						<Button variant="primary">Открыть sheet с компонентами</Button>
					</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>Демонстрация компонентов</SheetTitle>
							<SheetDescription>
								Внутри sheet используются Dropdown, Tooltip, Popover, Select и Drawer
							</SheetDescription>
						</SheetHeader>
						<div className="space-y-6 px-6">
							<div className="space-y-2">
								<h3 className="text-sm font-medium">Dropdown:</h3>
								<DropdownMenu modal={true}>
									<DropdownMenuTriggerButton variant="outline">
										Выберите действие
									</DropdownMenuTriggerButton>
									<DropdownMenuContent className="w-56">
										<DropdownMenuLabel>Действия</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<DropdownMenuItem onSelect={() => alert("Действие 1")}>
											<Icon icon={User} />
											Действие 1
										</DropdownMenuItem>
										<DropdownMenuItem onSelect={() => alert("Действие 2")}>
											<Icon icon={Settings} />
											Действие 2
										</DropdownMenuItem>
										<DropdownMenuItem onSelect={() => alert("Действие 3")}>
											<Icon icon={LogOut} />
											Действие 3
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>

							<div className="space-y-2">
								<h3 className="text-sm font-medium">Tooltip:</h3>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<Button variant="outline">Наведите для подсказки</Button>
										</TooltipTrigger>
										<TooltipContent>
											<p>Это подсказка</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</div>

							<div className="space-y-2">
								<h3 className="text-sm font-medium">Popover:</h3>
								<Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
									<PopoverTriggerButton variant="outline">Открыть Popover</PopoverTriggerButton>
									<PopoverContent className="w-80">
										<div className="space-y-4">
											<div className="flex items-center justify-between">
												<h4 className="font-medium leading-none">Настройки</h4>
												<Badge status="success">Новое</Badge>
											</div>
											<Divider />
											<div className="space-y-3">
												<div className="flex items-center justify-between">
													<Label>Опция 1</Label>
													<Switch />
												</div>
												<div className="flex items-center justify-between">
													<Label>Опция 2</Label>
													<Switch />
												</div>
												<div className="flex items-center justify-between">
													<Label>Опция 3</Label>
													<Switch />
												</div>
											</div>
										</div>
									</PopoverContent>
								</Popover>
							</div>

							<div className="space-y-2">
								<h3 className="text-sm font-medium">Select:</h3>
								<Select value={selectValue} onValueChange={setSelectValue}>
									<SelectTrigger>
										<SelectValue placeholder="Выберите фрукт" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="apple">🍎 Яблоко</SelectItem>
										<SelectItem value="banana">🍌 Банан</SelectItem>
										<SelectItem value="orange">🍊 Апельсин</SelectItem>
										<SelectItem value="grape">🍇 Виноград</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-2">
								<h3 className="text-sm font-medium">Drawer:</h3>
								<Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
									<DrawerTrigger asChild>
										<Button variant="outline">Открыть Drawer</Button>
									</DrawerTrigger>
									<DrawerContent>
										<DrawerHeaderTemplate
											title="Drawer внутри sheet"
											description="Это drawer открывается поверх sheet"
											showBackButton={false}
										/>
										<DrawerBody>
											<div className="space-y-4 px-4">
												<p>Это drawer, который открывается внутри sheet.</p>
												<p>Он демонстрирует, как компоненты могут быть вложены друг в друга.</p>
												<div className="flex items-center justify-center rounded bg-primary-bg p-6">
													<svg
														className="h-8 w-8 text-muted"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
														/>
													</svg>
												</div>
											</div>
										</DrawerBody>
										<DrawerFooterTemplate
											primaryButton="Сохранить"
											secondaryButton="Отмена"
											primaryButtonProps={{ onClick: () => setDrawerOpen(false) }}
											secondaryButtonProps={{ onClick: () => setDrawerOpen(false) }}
										/>
									</DrawerContent>
								</Drawer>
							</div>
						</div>
					</SheetContent>
				</Sheet>
			);
		};

		return <WithDropdownTooltipPopoverComponent />;
	}
};
