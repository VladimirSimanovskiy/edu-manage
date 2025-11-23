import { Icon } from "@/components/icon/Icon";
import { TextInput } from "@/components/input/text-input/TextInput";
import { withMaxWidth } from "@/lib/utils/storybook";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta, StoryFn } from "@storybook/react";
import { Search, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../../Form";
import { FormField, FormFieldProps } from "./FormField";
import { IconButton } from "@/components/button/icon-button/IconButton";
import { useIsMobile } from "@/hooks/useBreakpoints";

const formSchema = z.object({
	username: z.string().min(2, "Имя должно содержать не менее 2 символов")
});

type FormValues = z.infer<typeof formSchema>;

interface FormFieldTemplateProps extends Omit<FormFieldProps<FormValues, "username">, "name" | "control"> {
	defaultValue?: string;
}

const FormFieldTemplate: React.FC<FormFieldTemplateProps> = ({ defaultValue = "", ...props }) => {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: { username: defaultValue }
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		alert(JSON.stringify(values, null, 2));
	}

	const isMobile = useIsMobile();

	return (
		<Form className="border-0 p-4" {...form}>
			<FormField
				name="username"
				control={({ field, readonly }) => (
					<div className="flex gap-2">
						<TextInput
							placeholder="Введите имя пользователя"
							startIcon={<Icon icon={User} />}
							readOnly={readonly}
							{...field}
						/>
						{!readonly && (
							<IconButton
								variant="outline"
								size={isMobile ? "lg" : "md"}
								icon={Search}
								onClick={form.handleSubmit(onSubmit)}
							/>
						)}
					</div>
				)}
				{...props}
			/>
		</Form>
	);
};

const meta = {
	component: FormFieldTemplate,
	parameters: {
		layout: "centered"
	},
	tags: ["autodocs"],
	decorators: [withMaxWidth("600px")],
	args: {
		title: "Имя пользователя",
		description: "Ваше публичное имя пользователя",
		required: true,
		readonly: false,
		layout: "responsive"
	},
	argTypes: {
		layout: {
			control: { type: "select" },
			options: ["responsive", "horizontal", "vertical"],
			description: "Вариант раскладки поля"
		}
	}
} satisfies Meta<typeof FormFieldTemplate>;

export default meta;

export const Default: StoryFn<typeof FormFieldTemplate> = (args) => <FormFieldTemplate {...args} />;
