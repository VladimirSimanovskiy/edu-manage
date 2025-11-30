import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./Skeleton";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form as FormComponent } from "../form/Form";
import { FormHeader } from "../form/components/form-header/FormHeader";
import { FormBody } from "../form/components/form-body/FormBody";
import { FormStack } from "../form/components/form-stack/FormStack";
import { TextInput } from "../input/text-input/TextInput";
import { Icon } from "../icon/Icon";
import { User, Mail } from "lucide-react";
import { Button } from "../button/button/Button";
import { FormSectionTitle } from "../form/components/form-section-title/FormSectionTitle";
import { FormSectionHeaderButton } from "../form/components/form-section-header-button/FormSectionHeaderButton";
import { Description } from "../description";
import { FormFooter } from "../form/components/form-footer/FormFooter";
import { useState } from "react";
import { FormField } from "../form";

const meta: Meta<typeof Skeleton> = {
	component: Skeleton,
	tags: ["autodocs"],
	parameters: {
		layout: "centered"
	},
	argTypes: {
		variant: {
			control: { type: "select" },
			options: ["default", "light"]
		}
	}
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
	args: {
		className: "h-[40px] w-[400px] "
	}
};

export const Card: Story = {
	render: (args) => (
		<div className="flex flex-col items-center gap-4">
			<Skeleton className="h-32 w-64" {...args} />
			<div className="flex flex-col gap-2">
				<Skeleton className="h-4 w-64" {...args} />
				<Skeleton className="h-4 w-52" {...args} />
			</div>
		</div>
	)
};

export const Form: Story = {
	render: (args) => (
		<div className="flex items-center gap-4">
			<Skeleton className="h-10 w-10 rounded-full" {...args} />
			<div className="flex flex-col gap-2">
				<Skeleton className="h-4 w-44" {...args} />
				<Skeleton className="h-4 w-36" {...args} />
			</div>
		</div>
	)
};

export const FormLoading: Story = {
	render: function FormLoading() {
		const [isLoading, setIsLoading] = useState(true);
		// Определяем схему валидации
		const formSchema = z.object({
			username: z.string().min(2, {
				message: "Имя пользователя должно содержать минимум 2 символа"
			}),
			email: z.string().email({
				message: "Введите корректный email"
			})
		});

		const getDefaults = async () => {
			// Эмуляция задержки загрузки данных
			await new Promise((resolve) => setTimeout(resolve, 5000));
			return {
				username: "John Doe",
				email: "john.doe@example.com"
			};
		};

		// Создаем форму с использованием react-hook-form и zod
		const form = useForm<z.infer<typeof formSchema>>({
			resolver: zodResolver(formSchema),
			defaultValues: async () => {
				const defaults = await getDefaults();
				setIsLoading(false);
				return defaults;
			}
		});

		// Обработчик отправки формы
		const onSubmit = (values: z.infer<typeof formSchema>) => {
			// В реальном приложении здесь был бы код для отправки данных
			alert(JSON.stringify(values, null, 2));
		};

		if (isLoading) {
			return (
				<FormComponent {...form} className="w-[551px]">
					<FormHeader>
						<Skeleton className="h-6 w-full" />
					</FormHeader>
					<FormBody>
						<div className="flex min-w-96 flex-col gap-4">
							{Array.from({ length: 3 }).map((_, index) => (
								<div key={index} className="flex w-full flex-col gap-2 space-y-0 lg:flex-row lg:gap-4">
									<Skeleton className="h-8 w-44" />
									<div className="flex w-full min-w-0 flex-1 flex-col gap-y-2">
										<Skeleton className="h-9 w-full" />
										<Skeleton className="h-4 w-44" />
									</div>
								</div>
							))}
						</div>
					</FormBody>
					<FormFooter>
						<Skeleton className="h-9 w-full" />
					</FormFooter>
				</FormComponent>
			);
		}

		return (
			<FormComponent {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormHeader>
						<h3>Заголовок формы</h3>
					</FormHeader>

					<FormBody>
						<FormStack>
							<FormField
								name="username"
								title="Имя"
								description="Введите ваше имя"
								control={({ field }) => (
									<TextInput
										placeholder="Введите имя"
										type="text"
										startIcon={<Icon icon={User} />}
										{...field}
									/>
								)}
							/>
							<FormField
								name="email"
								title="Email"
								description="Мы никогда не передадим ваш email третьим лицам"
								control={({ field }) => (
									<TextInput
										placeholder="Введите email"
										type="email"
										startIcon={<Icon icon={Mail} />}
										{...field}
									/>
								)}
							/>

							<div className="flex flex-col gap-0.5">
								<div className="flex flex-row items-center justify-between gap-3 lg:gap-4">
									<FormSectionTitle>Дополнительные поля</FormSectionTitle>
									<FormSectionHeaderButton
										variant="text"
										type="button"
										onClick={() => alert("Добавлено новое поле")}
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
			</FormComponent>
		);
	}
};
