import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "./Input";
import { withFixedWidth } from "../../../lib/utils/storybook";
import { Button } from "../../button/button/Button";
import { Form, FormBody, FormField, FormStack } from "@/components/form";

const meta: Meta<typeof Input> = {
	component: Input,
	tags: ["autodocs"],
	parameters: {
		layout: "centered"
	}
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
	args: {
		placeholder: "Placeholder"
	},
	decorators: [withFixedWidth("360px")]
};

export const ReadOnly: Story = {
	args: {
		defaultValue: "Some text",
		readOnly: true
	},
	decorators: [withFixedWidth("360px")]
};

export const Disabled: Story = {
	args: {
		defaultValue: "Some text",
		disabled: true
	},
	decorators: [withFixedWidth("360px")]
};

export const Invalid: Story = {
	args: {
		placeholder: "Placeholder",
		error: "Error message"
	},
	decorators: [withFixedWidth("360px")]
};

export const NativeValidation: Story = {
	args: {
		placeholder: "Placeholder",
		minLength: 3
	},
	decorators: [withFixedWidth("360px")]
};

export const CustomStyle: Story = {
	args: {
		placeholder: "Поиск...",
		className:
			"w-full max-w-md rounded-full border-2 border-primary px-6 focus:border-primary-dark focus:ring-primary-dark/20"
	},
	decorators: [withFixedWidth("360px")]
};

export const WithForm: Story = {
	decorators: [(Story) => <div className="mx-auto w-full max-w-[600px]">{Story()}</div>],
	render: function DefaultForm() {
		const formSchema = z.object({
			username: z.string().min(3, { message: "Имя пользователя должно содержать минимум 3 символа" })
		});

		const form = useForm<z.infer<typeof formSchema>>({
			resolver: zodResolver(formSchema),
			defaultValues: { username: "" }
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
								name="username"
								title="Имя пользователя"
								description="Введите имя пользователя для входа в систему"
								required
								control={({ field, fieldState }) => (
									<Input
										placeholder="Введите имя пользователя"
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
