import type { Meta, StoryObj } from "@storybook/react";
import { ArrowBigRight, Check, Mail, Search } from "lucide-react";
import { Icon } from "@/components/icon/Icon";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ButtonBase } from "@/components/button/button-base/ButtonBase";
import { Button } from "@/components/button/button/Button";
import { Form, FormBody, FormField, FormStack } from "@/components/form";
import TextInput from "./TextInput";

const meta: Meta<typeof TextInput> = {
	component: TextInput,
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<div style={{ width: "360px" }}>
				<Story />
			</div>
		)
	],
	parameters: {
		layout: "centered"
	}
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
	args: {
		placeholder: "Enter your text here"
	}
};

export const WithIcons: Story = {
	args: {
		placeholder: "Search",
		startIcon: <Icon icon={Search} />,
		endIcon: <Icon icon={Check} />,
		showClearIcon: false,
		showCopyIcon: false
	}
};

export const WithCustomLucideIcon: Story = {
	args: {
		placeholder: "Введите email",
		startIcon: <Mail className="h-4 w-4" />,
		type: "email",
		showClearIcon: false,
		showCopyIcon: false
	}
};

export const WithClearButton: Story = {
	args: {
		placeholder: "Очищаемое поле",
		showClearIcon: true,
		defaultValue: "Текст для очистки"
	}
};

export const WithCopyButton: Story = {
	args: {
		placeholder: "Поле с копированием",
		showCopyIcon: true,
		defaultValue: "Текст для копирования"
	}
};

export const WithAllFeatures: Story = {
	args: {
		placeholder: "Все функции",
		startIcon: <Icon icon={Search} />,
		endIcon: <Icon icon={ArrowBigRight} />,
		defaultValue: "Текст с полным функционалом",
		readOnly: false
	}
};

export const ReadOnly: Story = {
	args: {
		defaultValue: "Текст только для чтения",
		readOnly: true
	}
};

export const Error: Story = {
	args: {
		defaultValue: "Ошибка",
		error: "Error message",
		startIcon: <Icon icon={Mail} />,
		showCopyIcon: false
	}
};

export const Controlled: Story = {
	render: function ControlledInput() {
		const [value, setValue] = React.useState<string | null>("Контролируемое значение");

		return (
			<div className="flex flex-col gap-4">
				<TextInput
					placeholder="Контролируемое поле"
					value={value ?? ""}
					onChange={setValue}
					showClearIcon
					showCopyIcon
					startIcon={<Mail className="h-4 w-4" />}
				/>
				<div className="text-sm text-muted">Текущее значение: {value}</div>
				<ButtonBase onClick={() => setValue("Новое значение")}>Установить новое значение</ButtonBase>
			</div>
		);
	}
};

export const WithForm: Story = {
	decorators: [(Story) => <div className="mx-auto w-full max-w-[600px]">{Story()}</div>],
	render: function EmailForm() {
		const formSchema = z.object({
			email: z
				.string()
				.email({ message: "Пожалуйста, введите корректный email" })
				.min(5, { message: "Email должен содержать минимум 5 символов" })
		});

		const form = useForm<z.infer<typeof formSchema>>({
			resolver: zodResolver(formSchema),
			defaultValues: { email: "" }
		});

		function onSubmit(values: z.infer<typeof formSchema>) {
			alert(JSON.stringify(values, null, 2));
		}

		return (
			<Form {...form} className="p-4">
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormBody>
						<FormStack>
							<FormField
								layout="vertical"
								name="email"
								title="Email адрес"
								description="Введите ваш рабочий email для связи"
								required
								control={({ field, fieldState }) => (
									<TextInput
										placeholder="example@company.com"
										error={fieldState.error?.message}
										startIcon={<Mail className="size-4" />}
										showClearIcon
										{...field}
									/>
								)}
							/>
							<Button type="submit">Подписаться</Button>
						</FormStack>
					</FormBody>
				</form>
			</Form>
		);
	}
};
