import { FormBody, FormField, FormStack } from "@/components/form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../button/button/Button";
import { Form } from "../../form/Form";
import { SecretInput } from "./SecretInput";

const meta: Meta<typeof SecretInput> = {
	component: SecretInput,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
		controls: {
			exclude: ["startIcon", "onChange"]
		}
	},
	decorators: [
		(Story) => (
			<div style={{ width: "360px" }}>
				<Story />
			</div>
		)
	]
};

export default meta;
type Story = StoryObj<typeof SecretInput>;

export const Default: Story = {
	args: {
		placeholder: "Enter your password",
		showClearIcon: true,
		readOnly: false
	}
};

export const FullExample: Story = {
	args: {
		placeholder: "Enter your password",
		showClearIcon: true,
		showCopyIcon: true
	}
};

export const InForm = {
	render: function FormWithSecretInput() {
		const formSchema = z.object({
			password: z.string().min(6, { message: "Пароль должен содержать минимум 6 символов" })
		});

		const form = useForm<z.infer<typeof formSchema>>({
			resolver: zodResolver(formSchema),
			defaultValues: {
				password: ""
			}
		});

		function onSubmit(values: z.infer<typeof formSchema>) {
			alert(JSON.stringify(values, null, 2));
		}

		return (
			<Form {...form} className="p-4">
				<form onSubmit={form.handleSubmit(onSubmit)} noValidate>
					<FormBody>
						<FormStack>
							<FormField
								name="password"
								title="Пароль"
								description="Введите пароль для входа в систему"
								required
								layout="vertical"
								control={({ field, fieldState }) => (
									<SecretInput
										placeholder="Введите пароль"
										error={fieldState.error?.message}
										{...field}
									/>
								)}
							/>
							<Button type="submit">Войти</Button>
						</FormStack>
					</FormBody>
				</form>
			</Form>
		);
	}
};
