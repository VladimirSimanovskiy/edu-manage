import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta, StoryObj } from "@storybook/react";
import { Circle, Flower, LucideIcon, Mail, Settings, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/button/button/Button";
import { Icon } from "@/components/icon/Icon";
import { Input } from "@/components/input/input/Input";
import { TextInput } from "@/components/input/text-input/TextInput";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/select/Select";
import { CustomStory, withMaxWidth } from "@/lib/utils/storybook";
import { Badge } from "@/components/badge/Badge";
import { FormSectionTitle } from "./components/form-section-title/FormSectionTitle";
import { Form, FormControl, FormFieldControl, FormItem, FormLabel, FormMessage } from "./Form";
import { CheckboxField } from "../checkbox/checkbox-field/CheckboxField";
import { SwitchField } from "../switch/switch-field/SwitchField";
import { FormField } from "./components/form-field/FormField";
import { FormHeaderTemplate } from "./templates/header-template/FormHeaderTemplate";
import { FormBody } from "./components/form-body/FormBody";
import { FormFooterTemplate } from "./templates/footer-template/FormFooterTemplate";
import { FormDescription, FormHeader } from "./components/form-header/FormHeader";
import { FormFooter } from "./components/form-footer/FormFooter";
import { FormStack } from "./components/form-stack/FormStack";
import { Field } from "../field";
import { Description } from "../description";
import { FormSectionHeaderButton } from "./components/form-section-header-button/FormSectionHeaderButton";
import { FormDivider } from "./components/form-divider/FormDivider";
import { FormFieldSet } from "./components/form-field-set/FormFieldSet";

const meta = {
	component: Form,
	parameters: {
		layout: "centered"
	},
	tags: ["autodocs"],
	decorators: [withMaxWidth("600px")]
} satisfies Meta<typeof Form>;

export default meta;

/**
 * Базовый пример формы с валидацией
 */
export const Default: CustomStory = {
	render: function DefaultForm() {
		// Определяем схему валидации
		const formSchema = z.object({
			username: z.string().min(2, {
				message: "Имя пользователя должно содержать минимум 2 символа"
			}),
			email: z.string().email({
				message: "Введите корректный email"
			})
		});

		// Создаем форму с использованием react-hook-form и zod
		const form = useForm<z.infer<typeof formSchema>>({
			resolver: zodResolver(formSchema),
			defaultValues: {
				username: "John Doe",
				email: "john.doe@example.com"
			}
		});

		// Обработчик отправки формы
		function onSubmit(values: z.infer<typeof formSchema>) {
			// В реальном приложении здесь был бы код для отправки данных
			alert(JSON.stringify(values, null, 2));
		}

		return (
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormHeader>
						<h3>Заголовок формы</h3>
					</FormHeader>

					<FormBody>
						<FormStack>
							<FormFieldControl
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Имя пользователя</FormLabel>
										<FormControl>
											<TextInput
												placeholder="Введите имя пользователя"
												startIcon={<Icon icon={User} />}
												{...field}
											/>
										</FormControl>
										<FormDescription>Ваше публичное имя пользователя</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormFieldControl
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<TextInput
												placeholder="Введите email"
												type="email"
												startIcon={<Icon icon={Mail} />}
												{...field}
											/>
										</FormControl>
										<FormDescription>
											Мы никогда не передадим ваш email третьим лицам
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="flex flex-col gap-0.5">
								<div className="flex flex-row items-center justify-between gap-3 lg:gap-4">
									<FormSectionTitle>Дополнительные поля</FormSectionTitle>
									<FormSectionHeaderButton
										variant="text"
										type="button"
										onClick={() => console.log("Добавлено новое поле")}
									>
										Добавить новое поле
									</FormSectionHeaderButton>
								</div>
								<Description>Это описание дополнительного поля</Description>
							</div>
						</FormStack>
					</FormBody>

					<FormFooter>
						<Button type="submit">Отправить</Button>
					</FormFooter>
				</form>
			</Form>
		);
	}
};

export const WithoutBorders: CustomStory = {
	render: function DefaultForm() {
		// Определяем схему валидации
		const formSchema = z.object({
			username: z.string().min(2, {
				message: "Имя пользователя должно содержать минимум 2 символа"
			}),
			email: z.string().email({
				message: "Введите корректный email"
			})
		});

		// Создаем форму с использованием react-hook-form и zod
		const form = useForm<z.infer<typeof formSchema>>({
			resolver: zodResolver(formSchema),
			defaultValues: {
				username: "John Doe",
				email: "john.doe@example.com"
			}
		});

		// Обработчик отправки формы
		function onSubmit(values: z.infer<typeof formSchema>) {
			// В реальном приложении здесь был бы код для отправки данных
			alert(JSON.stringify(values, null, 2));
		}

		return (
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormHeader className="border-0 pb-0 lg:pb-0">
						<h3>Заголовок формы</h3>
					</FormHeader>

					<FormBody>
						<FormStack>
							<Field
								title="Поле"
								layout="horizontal"
								control={() => <Input placeholder="Описание поля" />}
							/>
						</FormStack>
					</FormBody>

					<FormFooter className="border-0 pt-0 lg:pt-0">
						<Button type="submit">Отправить</Button>
					</FormFooter>
				</form>
			</Form>
		);
	}
};

export const WithFieldSet: CustomStory = {
	render: function DefaultForm() {
		// Определяем схему валидации
		const formSchema = z.object({
			username: z.string().min(2, {
				message: "Имя пользователя должно содержать минимум 2 символа"
			}),
			email: z.string().email({
				message: "Введите корректный email"
			})
		});

		// Создаем форму с использованием react-hook-form и zod
		const form = useForm<z.infer<typeof formSchema>>({
			resolver: zodResolver(formSchema),
			defaultValues: {
				username: "John Doe",
				email: "john.doe@example.com"
			}
		});

		// Обработчик отправки формы
		function onSubmit(values: z.infer<typeof formSchema>) {
			// В реальном приложении здесь был бы код для отправки данных
			alert(JSON.stringify(values, null, 2));
		}

		return (
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormHeaderTemplate title="Создание хранилища" />

					<FormBody>
						<FormStack>
							<FormFieldSet>
								<Field
									title="Токен"
									layout="vertical"
									description="Токен для чтения и изменения репозиториев"
									control={() => <TextInput placeholder="glpat-*********************" />}
								/>

								<Field
									title="Имя пользователя"
									layout="vertical"
									description="Используется для авторизации на git-сервере"
									control={() => <TextInput />}
								/>
							</FormFieldSet>

							<FormFieldSet>
								<Field
									title="GitLab-токен"
									layout="vertical"
									description="Токен для чтения и изменения репозиториев в хранилище. Укажите для токена права: `api`, `read_repository`, `write_repository`"
									control={() => <TextInput placeholder="glpat-*********************" />}
								/>

								<Field
									title="Имя автора"
									layout="vertical"
									description="Будет отображаться в истории изменений"
									control={() => <TextInput />}
								/>
							</FormFieldSet>
						</FormStack>
					</FormBody>

					<FormFooterTemplate primaryButton="Отправить" primaryButtonProps={{ type: "submit" }} />
				</form>
			</Form>
		);
	}
};

interface TemplateFormExampleProps {
	title: string;
	description: string;
	icon: LucideIcon;
	headerAlignment?: "compact" | "left" | "center";
	checkboxLabel: string;
	primaryButton: string;
	secondaryButton: string;
	showHeader?: boolean;
	showFooter?: boolean;
}

export const TemplateFormPlayground: StoryObj<TemplateFormExampleProps> = {
	argTypes: {
		headerAlignment: {
			control: "select",
			options: ["compact", "left", "center"]
		},
		icon: {
			control: "select",
			options: ["Flower", "User", "Settings", "Circle"],
			mapping: {
				Flower: Flower,
				User: User,
				Settings: Settings,
				Circle: Circle
			}
		}
	},
	args: {
		title: "Sign In",
		description: "Enter your credentials to access your account",
		icon: Flower,
		checkboxLabel: "Remember me",
		primaryButton: "Save",
		secondaryButton: "Cancel",
		showHeader: true,
		showFooter: true
	},
	render: function TemplateFormExample({
		title,
		description,
		icon,
		headerAlignment,
		checkboxLabel,
		primaryButton,
		secondaryButton,
		showHeader = true,
		showFooter = true
	}) {
		// Определяем схему валидации
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

		// Создаем форму с использованием react-hook-form и zod
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

		// Обработчик отправки формы
		function onSubmit(values: z.infer<typeof formSchema>) {
			alert(JSON.stringify(values, null, 2));
		}

		return (
			<div>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						{showHeader && (
							<FormHeaderTemplate
								title={title}
								description={description}
								icon={icon}
								alignment={headerAlignment}
							/>
						)}

						<FormBody>
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
									control={({ field }) => <Input placeholder="Укажите директорию" {...field} />}
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

								<FormDivider />

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
									control={({ field }) => <Input placeholder="Введите краткое название" {...field} />}
								/>
							</FormStack>
						</FormBody>

						{showFooter && (
							<FormFooterTemplate
								checkboxLabel={checkboxLabel}
								primaryButton={primaryButton}
								secondaryButton={secondaryButton}
							/>
						)}
					</form>
				</Form>
			</div>
		);
	},
	parameters: {
		layout: "centered"
	}
};

export const FormWithSwitchesAndCheckboxes: CustomStory = {
	render: function SwitchesAndCheckboxesForm() {
		const formSchema = z.object({
			notifications: z.boolean().default(true),
			marketing: z.boolean().default(false),
			darkMode: z.boolean().default(false),
			acceptTerms: z.boolean().refine((val) => val === true, {
				message: "Вы должны принять условия использования"
			}),
			dataCollection: z.boolean().default(true)
		});

		const form = useForm<z.infer<typeof formSchema>>({
			resolver: zodResolver(formSchema),
			defaultValues: {
				notifications: true,
				marketing: false,
				darkMode: false,
				acceptTerms: false,
				dataCollection: true
			}
		});

		function onSubmit(values: z.infer<typeof formSchema>) {
			alert(JSON.stringify(values, null, 2));
		}

		return (
			<div>
				<Form className="border-0 p-4" {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormStack>
							<div className="flex items-center gap-2">
								<FormSectionTitle>Настройки</FormSectionTitle>
								<Badge size="sm">3</Badge>
							</div>

							<FormFieldControl
								control={form.control}
								name="notifications"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<SwitchField
												label="Уведомления"
												description="Получать уведомления о новых сообщениях и обновлениях"
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormFieldControl
								control={form.control}
								name="marketing"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<SwitchField
												label="Маркетинговые рассылки"
												description="Получать информацию о новых продуктах, специальных предложениях, акциях и других маркетинговых материалах"
												checked={field.value}
												onCheckedChange={field.onChange}
												alignment="right"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormFieldControl
								control={form.control}
								name="darkMode"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<SwitchField
												label="Темная тема"
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormDivider />

							<div className="flex items-center gap-2">
								<FormSectionTitle>Политика конфиденциальности</FormSectionTitle>
								<Badge size="sm">2</Badge>
							</div>

							<FormFieldControl
								control={form.control}
								name="acceptTerms"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<CheckboxField
												label="Я принимаю условия сервиса"
												checked={field.value}
												onCheckedChange={field.onChange}
												error={!!form.formState.errors.acceptTerms}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormFieldControl
								control={form.control}
								name="dataCollection"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<CheckboxField
												label="Разрешить сбор аналитических данных"
												description="Мы используем эти данные для улучшения нашего сервиса, анализа пользовательского опыта и выявления проблем в работе приложения"
												checked={field.value}
												onCheckedChange={field.onChange}
												alignment="right"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button type="submit">Сохранить настройки</Button>
						</FormStack>
					</form>
				</Form>
			</div>
		);
	}
};
