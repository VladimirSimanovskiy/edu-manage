import { zodResolver } from "@hookform/resolvers/zod";
import { Meta, StoryObj } from "@storybook/react";
import { AlertTriangle, CircleAlert, CircleX, Flower, Gitlab, LogOut, Settings, User } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogIcon,
	AlertDialogTitle
} from "../alert-dialog";
import { Badge } from "../badge";
import { Button } from "../button/button/Button";
import { Divider } from "../divider/Divider";
import { Drawer, DrawerTrigger } from "../drawer";
import { DrawerBody } from "../drawer/components/drawer-body/DrawerBody";
import { DrawerContent } from "../drawer/components/drawer-content/DrawerContent";
import { DrawerFooterTemplate } from "../drawer/templates/drawer-footer-template/DrawerFooterTemplate";
import { DrawerHeaderTemplate } from "../drawer/templates/drawer-header-template/DrawerHeaderTemplate";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTriggerButton
} from "../dropdown";
import { Field } from "../field/Field";
import { FormStack } from "../form";
import { FormField } from "../form/components/form-field/FormField";
import { FormSectionTitle } from "../form/components/form-section-title/FormSectionTitle";
import { Form } from "../form/Form";
import { Icon } from "../icon";
import { SecretInput } from "../input";
import Input from "../input/input/Input";
import TextInput from "../input/text-input/TextInput";
import { Label } from "../label";
import { OverlayProps } from "../overlay/Overlay";
import { Popover, PopoverContent, PopoverTriggerButton } from "../popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select";
import { Switch } from "../switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../tooltip";
import {
	Modal,
	ModalBody,
	ModalClose,
	ModalContent,
	ModalDescription,
	ModalFooter,
	ModalHeader,
	ModalTitle,
	ModalTrigger
} from "./Modal";
import { ModalFooterTemplate, ModalHeaderTemplate } from "./ModalTemplates";

const meta: Meta<typeof Modal> = {
	component: Modal,
	tags: ["autodocs"],
	parameters: {
		layout: "centered"
	}
};

export default meta;
type Story = StoryObj<typeof Modal>;

const DefaultForm = () => {
	return (
		<Modal>
			<ModalTrigger asChild>
				<Button variant="primary">Открыть модальное окно</Button>
			</ModalTrigger>
			<ModalContent overlayBlur={true} overlayType="gradient">
				<ModalHeader>
					<ModalTitle>Заголовок модального окна</ModalTitle>
					<ModalDescription>Это базовое модальное окно с содержимым</ModalDescription>
				</ModalHeader>
				<ModalBody>Этот пример демонстрирует базовую настройку модального окна.</ModalBody>
				<ModalFooter>
					<ModalClose asChild>
						<Button type="submit">OK</Button>
					</ModalClose>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export const Default: Story = {
	render: () => <DefaultForm />
};

export const LargeContentModal: Story = {
	render: () => {
		const LargeContentModalComponent = () => {
			const [open, setOpen] = useState(false);
			const buttonProps = useMemo(() => ({ onClick: () => setOpen(false) }), [setOpen]);

			return (
				<Modal open={open} onOpenChange={setOpen}>
					<ModalTrigger asChild>
						<Button variant="primary">Open Large Modal</Button>
					</ModalTrigger>
					<ModalContent>
						<ModalHeaderTemplate
							title="Large Content Example"
							description="This modal contains a lot of content to demonstrate scrolling."
							icon={Flower}
						/>
						<ModalBody>
							<FormStack>
								{Array.from({ length: 100 }).map((_, index) => (
									<Field
										key={index}
										title="Email"
										layout="vertical"
										required
										control={() => (
											<TextInput id={`email-${index}`} placeholder="your.email@example.com" />
										)}
									/>
								))}
							</FormStack>
						</ModalBody>
						<ModalFooterTemplate
							checkboxLabel="I agree to the terms and conditions"
							primaryButton="Submit"
							primaryButtonProps={buttonProps}
							secondaryButton="Cancel"
							secondaryButtonProps={buttonProps}
						/>
					</ModalContent>
				</Modal>
			);
		};

		return <LargeContentModalComponent />;
	}
};

interface TemplateModalExampleProps {
	showHeader?: boolean;
	showFooter?: boolean;

	overlayBlur?: OverlayProps["blur"];
	overlayType?: OverlayProps["type"];
}

const TemplateModalExample = ({
	showHeader = true,
	showFooter = true,
	overlayBlur,
	overlayType
}: TemplateModalExampleProps) => {
	const [open, setOpen] = useState(true);

	return (
		<Modal open={open} onOpenChange={setOpen}>
			<ModalTrigger asChild>
				<div className="mb-4 space-y-4 p-6">
					<div>
						By clicking "Sign In", you agree to our terms of use and privacy policy. We care about the
						security of your data. Your information is protected with industry-standard encryption and we
						never share it with third parties.
					</div>
					<div className="flex w-full justify-center">
						<Button variant="primary">Sign In</Button>
					</div>
				</div>
			</ModalTrigger>
			<ModalContent overlayBlur={overlayBlur} overlayType={overlayType}>
				{showHeader && (
					<ModalHeaderTemplate
						title="Sign In"
						description="Enter your credentials to access your account"
						icon={Flower}
						alignment="compact"
					/>
				)}
				<ModalBody>
					<FormStack>
						<Field
							title="Email"
							required
							layout="vertical"
							control={() => <TextInput id="email" placeholder="your.email@example.com" />}
						/>
						<Field
							layout="vertical"
							title="Password"
							required
							control={() => <SecretInput placeholder="your password" />}
						/>
					</FormStack>
				</ModalBody>
				{showFooter && (
					<ModalFooterTemplate checkboxLabel="Remember me" primaryButton="Save" secondaryButton="Cancel" />
				)}
			</ModalContent>
		</Modal>
	);
};

export const TemplateModalPlayground: StoryObj<typeof TemplateModalExample> = {
	argTypes: {
		overlayType: {
			control: "select",
			options: ["default", "gradient", "transparent"]
		}
	},
	args: {
		showHeader: true,
		showFooter: true,
		overlayBlur: true,
		overlayType: "gradient"
	},
	render: (args) => <TemplateModalExample {...args} />,
	parameters: {
		layout: "fullscreen"
	}
};

export const GramaxModal: Story = {
	render: () => {
		const CatalogSettingsModalComponent = () => {
			const [open, setOpen] = useState(false);

			const formSchema = z.object({
				catalogName: z.string().min(2, {
					message: "Название каталога должно содержать минимум 2 символа"
				}),
				repositoryName: z.string().min(2, {
					message: "Название репозитория должно содержать минимум 2 символа"
				}),
				directory: z.string().min(1, {
					message: "Укажите директорию"
				}),
				language: z.string({
					required_error: "Выберите язык"
				}),
				versions: z.string().min(1, {
					message: "Укажите версии"
				}),
				description: z.string().optional(),
				style: z.string({
					required_error: "Выберите стиль"
				}),
				shortName: z.string().min(1, {
					message: "Укажите краткое название"
				})
			});

			const form = useForm<z.infer<typeof formSchema>>({
				resolver: zodResolver(formSchema),
				defaultValues: {
					catalogName: "Новый каталог",
					repositoryName: "new-catalog",
					directory: "/",
					language: "Русский",
					versions: "releases/**/*",
					description: "Для личных заметок",
					style: "Синий",
					shortName: "notes"
				}
			});

			function onSubmit(values: z.infer<typeof formSchema>) {
				alert(JSON.stringify(values, null, 2));
			}

			const openGitlabButton = useMemo(
				() => ({
					onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
						e.preventDefault();
						setOpen(false);
					},
					startIcon: Gitlab
				}),
				[setOpen]
			);

			return (
				<Modal open={open} onOpenChange={setOpen}>
					<ModalTrigger asChild>
						<Button variant="primary">Open Catalog Settings</Button>
					</ModalTrigger>
					<ModalContent>
						<Form asChild {...form}>
							<form className="contents" onSubmit={form.handleSubmit(onSubmit)}>
								<ModalHeaderTemplate
									title="Настройки каталога"
									description="Настройте параметры вашего каталога документации"
									icon={Flower}
								/>

								<ModalBody>
									<FormStack>
										<FormField
											name="catalogName"
											title="Название каталога"
											description="Отображается на главной и в самом каталоге"
											required
											control={({ field }) => (
												<Input placeholder="Введите название каталога" {...field} />
											)}
										/>
										<FormField
											name="repositoryName"
											title="Название репозитория"
											description="Системное название, задается при создании репозитория. Отображается в URL"
											required
											control={({ field }) => (
												<Input placeholder="Введите название репозитория" {...field} />
											)}
										/>
										<FormField
											name="directory"
											title="Директория"
											description="Путь до директории, где будет храниться вся документация в репозитории"
											control={({ field }) => (
												<Input placeholder="Укажите директорию" {...field} />
											)}
										/>
										<FormField
											name="language"
											title="Основной язык"
											description="Основной язык каталога. Нельзя изменить после выбора"
											required
											control={({ field }) => (
												<Select onValueChange={field.onChange} defaultValue={field.value}>
													<SelectTrigger>
														<SelectValue placeholder="Выберите язык" />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="Русский">Русский</SelectItem>
														<SelectItem value="English">English</SelectItem>
													</SelectContent>
												</Select>
											)}
										/>
										<FormField
											name="versions"
											title="Версии"
											description="Список версий (веток или тегов), отображаемых в дропдауне. Задается в виде glob-паттернов, например v1.* или release-*"
											required
											control={({ field }) => <Input placeholder="Укажите версии" {...field} />}
										/>
										<Divider />
										<FormSectionTitle>Отображение на главной</FormSectionTitle>
										<FormField
											name="description"
											title="Описание"
											control={({ field }) => <Input placeholder="Введите описание" {...field} />}
										/>
										<FormField
											name="style"
											title="Стиль"
											control={({ field }) => (
												<Select onValueChange={field.onChange} defaultValue={field.value}>
													<SelectTrigger>
														<SelectValue placeholder="Выберите стиль" />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="Синий">Синий</SelectItem>
														<SelectItem value="Зеленый">Зеленый</SelectItem>
														<SelectItem value="Красный">Красный</SelectItem>
														<SelectItem value="Фиолетовый">Фиолетовый</SelectItem>
													</SelectContent>
												</Select>
											)}
										/>
										<FormField
											name="shortName"
											title="Краткое название"
											control={({ field }) => (
												<Input placeholder="Введите краткое название" {...field} />
											)}
										/>
									</FormStack>
								</ModalBody>

								<ModalFooterTemplate
									primaryButton="Сохранить"
									secondaryButton="Открыть в GitLab"
									secondaryButtonProps={openGitlabButton}
								/>
							</form>
						</Form>
					</ModalContent>
				</Modal>
			);
		};

		return <CatalogSettingsModalComponent />;
	}
};

export const CascadingModals: Story = {
	render: () => {
		const CascadingModalComponent = ({ level = 1 }: { level?: number }) => {
			const [isOpen, setIsOpen] = useState(false);

			return (
				<Modal open={isOpen} onOpenChange={setIsOpen}>
					<ModalTrigger asChild>
						<Button variant="primary">
							{level === 1 ? "Открыть модальное окно" : `Открыть модальное окно ${level}`}
						</Button>
					</ModalTrigger>
					<ModalContent>
						<ModalHeaderTemplate
							title={`Модальное окно ${level}`}
							description={`Это модальное окно уровня ${level}. Нажмите кнопку ниже, чтобы открыть следующее модальное окно.`}
							icon={level % 2 === 0 ? Gitlab : Flower}
						/>
						<ModalBody>
							<div className="space-y-4">
								<div className="text-center">
									<p className="mb-4 text-sm text-muted-foreground">Уровень: {level}</p>
									{level < 5 && <CascadingModalComponent level={level + 1} />}
									{level >= 5 && (
										<p className="text-sm text-muted-foreground">
											Достигнут максимальный уровень вложенности
										</p>
									)}
								</div>
							</div>
						</ModalBody>
						<ModalFooterTemplate
							primaryButton="Закрыть"
							primaryButtonProps={{ onClick: () => setIsOpen(false) }}
						/>
					</ModalContent>
				</Modal>
			);
		};

		return <CascadingModalComponent />;
	}
};

export const WithDropdownTooltipPopover: Story = {
	render: () => {
		const WithDropdownTooltipPopoverComponent = () => {
			const [open, setOpen] = useState(false);
			const [popoverOpen, setPopoverOpen] = useState(false);
			const [drawerOpen, setDrawerOpen] = useState(false);
			const [selectValue, setSelectValue] = useState("");

			return (
				<Modal open={open} onOpenChange={setOpen}>
					<ModalTrigger asChild>
						<Button variant="primary">Открыть модальное окно с компонентами</Button>
					</ModalTrigger>
					<ModalContent>
						<ModalHeaderTemplate
							title="Демонстрация компонентов"
							description="Внутри модального окна используются Dropdown, Tooltip, Popover, Select и Drawer"
							icon={Flower}
						/>
						<ModalBody>
							<div className="space-y-6">
								<div className="space-y-2">
									<h3 className="text-sm font-medium">Dropdown в модальном окне:</h3>
									<DropdownMenu>
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
									<h3 className="text-sm font-medium">Tooltip в модальном окне:</h3>
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger asChild>
												<Button variant="outline">Наведите для подсказки</Button>
											</TooltipTrigger>
											<TooltipContent>
												<p>Это подсказка внутри модального окна</p>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</div>

								<div className="space-y-2">
									<h3 className="text-sm font-medium">Popover в модальном окне:</h3>
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
									<h3 className="text-sm font-medium">Select в модальном окне:</h3>
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
									<h3 className="text-sm font-medium">Drawer в модальном окне:</h3>
									<Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
										<DrawerTrigger asChild>
											<Button variant="outline">Открыть Drawer</Button>
										</DrawerTrigger>
										<DrawerContent>
											<DrawerHeaderTemplate
												title="Drawer внутри модального окна"
												description="Это drawer открывается поверх модального окна"
												showBackButton={false}
											/>
											<DrawerBody>
												<div className="space-y-4">
													<p>Это drawer, который открывается внутри модального окна.</p>
													<p>
														Он демонстрирует, как компоненты могут быть вложены друг в
														друга.
													</p>
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
						</ModalBody>
						<ModalFooterTemplate
							primaryButton="Сохранить"
							secondaryButton="Отмена"
							primaryButtonProps={{ onClick: () => setOpen(false) }}
							secondaryButtonProps={{ onClick: () => setOpen(false) }}
						/>
					</ModalContent>
				</Modal>
			);
		};

		return <WithDropdownTooltipPopoverComponent />;
	}
};

export const CustomModals: Story = {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	render: function CustomModal(_) {
		const [firstModalOpen, setFirstModalOpen] = useState(false);
		const [secondModalOpen, setSecondModalOpen] = useState(false);

		return (
			<div className="flex gap-4">
				<Modal open={firstModalOpen} onOpenChange={setFirstModalOpen}>
					<ModalTrigger asChild>
						<Button variant="primary" status="warning">
							Открыть warning
						</Button>
					</ModalTrigger>
					<ModalContent>
						<ModalBody className="flex flex-row items-start gap-4 lg:py-6">
							<Icon size="lg" icon={CircleAlert} className="h-6 w-6 text-status-warning" />

							<div className="space-y-2">
								<ModalTitle className="text-lg text-status-warning">
									Неподдерживаемые элементы
								</ModalTitle>
								<p>DOCX не поддерживает некоторые элементы Gramax</p>
								<ul className="list-disc pl-4">
									<li>Комментарий</li>
									<li>Изображения</li>
								</ul>
							</div>
						</ModalBody>

						<div className="flex gap-2 px-4 pb-4 lg:px-6 lg:pb-6">
							<Button className="ml-auto" variant="outline">
								Отменить
							</Button>
							<Button status="warning">Продолжить</Button>
						</div>
					</ModalContent>
				</Modal>

				<Modal open={secondModalOpen} onOpenChange={setSecondModalOpen}>
					<ModalTrigger asChild>
						<Button variant="primary" status="error">
							Открыть error
						</Button>
					</ModalTrigger>
					<ModalContent>
						<ModalBody className="flex flex-row items-start gap-4 lg:py-6">
							<Icon size="lg" icon={CircleAlert} className="h-6 w-6 text-status-error" />

							<div className="space-y-2">
								<ModalTitle className="text-lg text-status-error">Неподдерживаемые элементы</ModalTitle>
								<p>DOCX не поддерживает некоторые элементы Gramax</p>
								<ul className="list-disc pl-4">
									<li>Комментарий</li>
									<li>Изображения</li>
								</ul>
							</div>
						</ModalBody>

						<div className="flex gap-2 px-4 pb-4 lg:px-6 lg:pb-6">
							<Button className="ml-auto" variant="outline">
								Отменить
							</Button>
							<Button status="error">Продолжить</Button>
						</div>
					</ModalContent>
				</Modal>
			</div>
		);
	}
};

export const WithoutCloseButton: Story = {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	render: function WithoutCloseButton(_) {
		const [open, setOpen] = useState(false);

		return (
			<Modal open={open} onOpenChange={setOpen}>
				<ModalTrigger asChild>
					<Button variant="primary">Модальное окно без кнопки закрытия</Button>
				</ModalTrigger>
				<ModalContent showCloseButton={false}>
					<ModalHeader>
						<ModalTitle>Модальное окно без кнопки закрытия</ModalTitle>
						<ModalDescription>
							Это модальное окно не имеет стандартной кнопки закрытия в углу
						</ModalDescription>
					</ModalHeader>
					<ModalBody>
						<p>Для закрытия этого окна можно использовать кнопку ниже или щелкнуть вне окна.</p>
					</ModalBody>
					<ModalFooter>
						<ModalClose asChild>
							<Button type="button" variant="primary">
								Закрыть
							</Button>
						</ModalClose>
					</ModalFooter>
				</ModalContent>
			</Modal>
		);
	}
};

export const WithCustomCloseButton: Story = {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	render: function WithCustomCloseButton(_) {
		const [open, setOpen] = useState(false);

		return (
			<Modal open={open} onOpenChange={setOpen}>
				<ModalTrigger asChild>
					<Button variant="primary">Модальное окно с кастомной кнопкой закрытия</Button>
				</ModalTrigger>
				<ModalContent showCloseButton={false}>
					<ModalHeader>
						<ModalTitle>Кастомная кнопка закрытия</ModalTitle>
						<ModalDescription>Это модальное окно использует кастомную кнопку закрытия</ModalDescription>
						<ModalClose className="absolute right-0 top-0 h-12 w-12 p-3.5">
							<Icon icon={CircleX} className="h-4 w-4 lg:h-5 lg:w-5" />
						</ModalClose>
					</ModalHeader>
					<ModalBody>
						<p>
							Обратите внимание на иконку в правом верхнем углу, которая используется вместо стандартного
							крестика.
						</p>
					</ModalBody>
					<ModalFooter>
						<Button type="button" variant="primary" onClick={() => setOpen(false)}>
							OK
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		);
	}
};

export const WithoutBackdropClose: Story = {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	render: function WithoutBackdropClose(_) {
		const [open, setOpen] = useState(false);

		return (
			<Modal open={open} onOpenChange={setOpen}>
				<ModalTrigger asChild>
					<Button variant="primary">Модальное окно без закрытия по бэкдропу</Button>
				</ModalTrigger>
				<ModalContent
					onInteractOutside={(event) => {
						event.preventDefault(); // ⛔ предотвращает закрытие по клику на бэкдроп
					}}
				>
					<ModalHeader>
						<ModalTitle>Модальное окно без закрытия по бэкдропу</ModalTitle>
						<ModalDescription>
							Это модальное окно не закрывается при клике на затемненную область вокруг него
						</ModalDescription>
					</ModalHeader>
					<ModalBody>
						<p>
							Для закрытия этого окна можно использовать кнопку ниже или крестик в правом верхнем углу.
							Клик по затемненной области (бэкдропу) не приведет к закрытию окна.
						</p>
					</ModalBody>
					<ModalFooter>
						<ModalClose asChild>
							<Button type="button" variant="primary">
								Закрыть
							</Button>
						</ModalClose>
					</ModalFooter>
				</ModalContent>
			</Modal>
		);
	}
};

export const PreventClose: Story = {
	render: () => {
		function PreventCloseOnDirtyForm() {
			const [open, setOpen] = useState(false);
			const [alertOpen, setAlertOpen] = useState(false);

			const formSchema = z.object({
				name: z.string().min(2, {
					message: "Имя должно содержать минимум 2 символа"
				})
			});

			const form = useForm<z.infer<typeof formSchema>>({
				resolver: zodResolver(formSchema),
				defaultValues: {
					name: ""
				}
			});

			const { isDirty } = form.formState;

			function onSubmit(values: z.infer<typeof formSchema>) {
				form.reset(values);
				setOpen(false);
			}

			const handleOpenChange = (newOpen: boolean) => {
				if (!newOpen && isDirty) {
					setAlertOpen(true);
					return;
				}
				setOpen(newOpen);
			};

			const handleConfirmClose = () => {
				form.reset();
				setAlertOpen(false);
				setOpen(false);
			};

			const handleStay = () => {
				setAlertOpen(false);
			};

			return (
				<>
					<Modal open={open} onOpenChange={handleOpenChange}>
						<ModalTrigger asChild>
							<Button status="warning" variant="primary">
								Модальное окно с предупреждением о потере данных
							</Button>
						</ModalTrigger>
						<ModalContent
							onInteractOutside={(event) => {
								if (isDirty) {
									event.preventDefault();
									setAlertOpen(true);
								}
							}}
							onEscapeKeyDown={(event) => {
								if (isDirty) {
									event.preventDefault();
									setAlertOpen(true);
								}
							}}
							showCloseButton={false}
						>
							<Form {...form}>
								<form className="contents" onSubmit={form.handleSubmit(onSubmit)}>
									<ModalHeaderTemplate
										title="Редактирование профиля"
										description="Форма блокирует закрытие модального окна при наличии несохраненных изменений"
									/>

									<ModalBody>
										<FormStack>
											<FormField
												name="name"
												title="Имя"
												required
												control={({ field }) => (
													<Input placeholder="Введите ваше имя" {...field} />
												)}
											/>
										</FormStack>
									</ModalBody>

									<ModalFooterTemplate
										primaryButton="Сохранить"
										secondaryButton="Закрыть"
										primaryButtonProps={{ type: "submit" }}
										secondaryButtonProps={{
											onClick: (e) => {
												if (isDirty) {
													e.preventDefault();
													setAlertOpen(true);
												} else {
													setOpen(false);
												}
											}
										}}
									/>
								</form>
							</Form>
						</ModalContent>
					</Modal>

					<AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
						<AlertDialogContent status="warning">
							<AlertDialogHeader>
								<AlertDialogIcon icon={AlertTriangle} />
								<AlertDialogTitle>Несохраненные изменения</AlertDialogTitle>
								<AlertDialogDescription>При выходе данные будут потеряны</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel variant="outline" onClick={handleConfirmClose}>
									Выйти
								</AlertDialogCancel>
								<AlertDialogAction variant="primary" onClick={handleStay}>
									Остаться
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</>
			);
		}

		return <PreventCloseOnDirtyForm />;
	}
};

export const PreventCloseWithSave: Story = {
	render: () => {
		function PreventCloseWithSaveOptionDemo() {
			const [open, setOpen] = useState(false);
			const [alertOpen, setAlertOpen] = useState(false);

			const formSchema = z.object({
				name: z.string().min(2, {
					message: "Имя должно содержать минимум 2 символа"
				})
			});

			const form = useForm<z.infer<typeof formSchema>>({
				resolver: zodResolver(formSchema),
				defaultValues: {
					name: ""
				}
			});

			const { isDirty } = form.formState;

			function onSubmit(values: z.infer<typeof formSchema>) {
				form.reset(values);
				setOpen(false);
			}

			const handleOpenChange = (newOpen: boolean) => {
				if (!newOpen && isDirty) {
					setAlertOpen(true);
					return;
				}
				setOpen(newOpen);
			};

			const handleConfirmClose = () => {
				form.reset();
				setAlertOpen(false);
				setOpen(false);
			};

			const handleSave = () => {
				setAlertOpen(false);
				setOpen(false);
				console.log(form.getValues());
			};

			return (
				<>
					<Modal open={open} onOpenChange={handleOpenChange}>
						<ModalTrigger asChild>
							<Button status="success" variant="primary">
								Модальное окно с предложением сохранения изменений
							</Button>
						</ModalTrigger>
						<ModalContent
							onInteractOutside={(event) => {
								if (isDirty) {
									event.preventDefault();
									setAlertOpen(true);
								}
							}}
							onEscapeKeyDown={(event) => {
								if (isDirty) {
									event.preventDefault();
									setAlertOpen(true);
								}
							}}
							showCloseButton={false}
						>
							<Form {...form}>
								<form className="contents" onSubmit={form.handleSubmit(onSubmit)}>
									<ModalHeaderTemplate
										title="Редактирование профиля"
										description="Форма блокирует закрытие модального окна при наличии несохраненных изменений"
									/>

									<ModalBody>
										<FormStack>
											<FormField
												name="name"
												title="Имя"
												required
												control={({ field }) => (
													<Input placeholder="Введите ваше имя" {...field} />
												)}
											/>
										</FormStack>
									</ModalBody>

									<ModalFooterTemplate
										primaryButton="Сохранить"
										secondaryButton="Закрыть"
										primaryButtonProps={{ type: "submit" }}
										secondaryButtonProps={{
											onClick: (e) => {
												if (isDirty) {
													e.preventDefault();
													setAlertOpen(true);
												} else {
													setOpen(false);
												}
											}
										}}
									/>
								</form>
							</Form>
						</ModalContent>
					</Modal>

					<AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
						<AlertDialogContent status="warning">
							<AlertDialogHeader>
								<AlertDialogIcon icon={AlertTriangle} />
								<AlertDialogTitle>Сохранить изменения?</AlertDialogTitle>
								<AlertDialogDescription>
									Вы хотите сохранить или отклонить изменения?
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel variant="outline" onClick={handleConfirmClose}>
									Не сохранить
								</AlertDialogCancel>
								<AlertDialogAction variant="primary" onClick={handleSave}>
									Сохранить
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</>
			);
		}

		return <PreventCloseWithSaveOptionDemo />;
	}
};
