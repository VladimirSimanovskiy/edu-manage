import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormStack } from "../form";
import { InputOTP } from "./InputOTP";
import { InputOTPGroup } from "./components/input-otp-group/InputOTPGroup";
import { InputOTPSeparator } from "./components/input-otp-separator/InputOTPSeparator";
import { InputOTPSlot } from "./components/input-otp-slot/InputOTPSlot";

const meta: Meta<typeof InputOTP> = {
	component: InputOTP,
	parameters: {
		layout: "centered"
	},
	tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof InputOTP>;

export const Default: Story = {
	render: () => (
		<InputOTP maxLength={6}>
			<InputOTPGroup>
				<InputOTPSlot index={0} />
				<InputOTPSlot index={1} />
				<InputOTPSlot index={2} />
			</InputOTPGroup>
			<InputOTPSeparator />
			<InputOTPGroup>
				<InputOTPSlot index={3} />
				<InputOTPSlot index={4} />
				<InputOTPSlot index={5} />
			</InputOTPGroup>
		</InputOTP>
	)
};

export const SupportSpecialCharacters: Story = {
	render: () => (
		<InputOTP maxLength={6} pasteTransformer={(pasted) => pasted.replace(/[.-]/g, "")}>
			<InputOTPGroup>
				<InputOTPSlot index={0} />
				<InputOTPSlot index={1} />
				<InputOTPSlot index={2} />
			</InputOTPGroup>
			<InputOTPSeparator />
			<InputOTPGroup>
				<InputOTPSlot index={3} />
				<InputOTPSlot index={4} />
				<InputOTPSlot index={5} />
			</InputOTPGroup>
		</InputOTP>
	)
};

export const Disabled: Story = {
	render: () => (
		<InputOTP maxLength={6} disabled value={"777777"}>
			<InputOTPGroup>
				<InputOTPSlot index={0} />
				<InputOTPSlot index={1} />
				<InputOTPSlot index={2} />
			</InputOTPGroup>
			<InputOTPSeparator />
			<InputOTPGroup>
				<InputOTPSlot index={3} />
				<InputOTPSlot index={4} />
				<InputOTPSlot index={5} />
			</InputOTPGroup>
		</InputOTP>
	)
};

export const FormExample: Story = {
	render: function FormExample() {
		// Определяем схему валидации
		const formSchema = z.object({
			otp: z.string().length(4)
		});

		// Создаем форму с использованием react-hook-form и zod
		const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema) });

		// Обработчик отправки формы
		function onSubmit(values: z.infer<typeof formSchema>) {
			alert(JSON.stringify(values, null, 2));
		}

		// Обработчик изменения значения OTP
		const handleOTPChange = (value: string) => {
			form.setValue("otp", value);
			// Если введены все 4 символа, отправляем форму с небольшой задержкой
			if (value.length === 4) {
				setTimeout(() => {
					form.handleSubmit(onSubmit)();
				}, 100);
			}
		};

		return (
			<Form asChild {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormStack>
						<FormField
							name="otp"
							title="Код подтверждения"
							labelClassName="lg:h-10"
							control={({ field }) => {
								return (
									<InputOTP maxLength={4} {...field} onChange={handleOTPChange}>
										<InputOTPGroup>
											<InputOTPSlot index={0} />
											<InputOTPSlot index={1} />
											<InputOTPSlot index={2} />
											<InputOTPSlot index={3} />
										</InputOTPGroup>
									</InputOTP>
								);
							}}
						/>
					</FormStack>
				</form>
			</Form>
		);
	}
};
