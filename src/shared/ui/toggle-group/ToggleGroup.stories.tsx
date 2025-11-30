import type { Meta, StoryObj } from "@storybook/react";
import { ToggleGroup, ToggleGroupItem } from "./ToggleGroup";
import { Icon } from "../icon/Icon";
import { Star, Heart, ThumbsUp, Bold, Italic, Underline } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormStack } from "../form";
import { Button } from "../button";

const meta: Meta<typeof ToggleGroup> = {
	component: ToggleGroup,
	tags: ["autodocs"],
	parameters: {
		layout: "centered"
	},
	argTypes: {
		variant: {
			control: "select",
			options: ["default", "outline"]
		},
		size: {
			control: "select",
			options: ["xs", "sm", "md", "lg"]
		},
		type: {
			control: "select",
			options: ["single", "multiple"]
		}
	}
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

export const Default: Story = {
	args: {
		type: "single",
		defaultValue: "1",
		disabled: false,
		children: (
			<>
				<ToggleGroupItem value="1">Option 1</ToggleGroupItem>
				<ToggleGroupItem value="2">Option 2</ToggleGroupItem>
				<ToggleGroupItem value="3">Option 3</ToggleGroupItem>
			</>
		)
	}
};

export const WithIcons: Story = {
	args: {
		type: "single",
		defaultValue: "star",
		children: (
			<>
				<ToggleGroupItem value="star">
					<Icon icon={Star} />
				</ToggleGroupItem>
				<ToggleGroupItem value="heart">
					<Icon icon={Heart} />
				</ToggleGroupItem>
				<ToggleGroupItem value="thumbs">
					<Icon icon={ThumbsUp} />
				</ToggleGroupItem>
			</>
		)
	}
};

export const WithIconsAndText: Story = {
	args: {
		type: "single",
		defaultValue: "star",
		children: (
			<>
				<ToggleGroupItem value="star">
					<Icon icon={Star} />
					<span>Star</span>
				</ToggleGroupItem>
				<ToggleGroupItem value="heart">
					<Icon icon={Heart} />
					<span>Heart</span>
				</ToggleGroupItem>
				<ToggleGroupItem value="thumbs">
					<Icon icon={ThumbsUp} />
					<span>Like</span>
				</ToggleGroupItem>
			</>
		)
	}
};

export const Playground: StoryObj<typeof ToggleGroup> = {
	render: function PlaygroundOptionGroupExample(args) {
		return (
			<>
				<ToggleGroup {...args}>
					<ToggleGroupItem value="star">
						<Icon icon={Star} />
					</ToggleGroupItem>
					<ToggleGroupItem value="heart">
						<Icon icon={Heart} />
					</ToggleGroupItem>
					<ToggleGroupItem value="thumbs">
						<Icon icon={ThumbsUp} />
					</ToggleGroupItem>
				</ToggleGroup>
			</>
		);
	},
	args: {
		type: "single",
		rovingFocus: false,
		loop: true,
		size: "md",
		disabled: false,
		dir: "ltr"
	},
	argTypes: {
		type: {
			control: "select",
			options: ["multiple", "single"]
		},
		dir: {
			control: "select",
			options: ["ltr", "rtl"]
		}
	}
};

export const SingleControlled: Story = {
	render: function SingleControlledToggleGroupExample() {
		const [selectedValue, onChangeValue] = useState<string>("bold");

		return (
			<>
				<ToggleGroup type="single" value={selectedValue} onValueChange={onChangeValue}>
					<ToggleGroupItem value="bold">
						<Icon icon={Bold} />
					</ToggleGroupItem>
					<ToggleGroupItem value="italic">
						<Icon icon={Italic} />
					</ToggleGroupItem>
					<ToggleGroupItem value="underline">
						<Icon icon={Underline} />
					</ToggleGroupItem>
				</ToggleGroup>
				<div style={{ marginTop: "20px" }}>Выбрано: {selectedValue || "ничего"}</div>
			</>
		);
	}
};

export const Controlled: StoryObj = {
	render: function ControlledOptionGroupExample() {
		const [selectedValues, onChangeValues] = useState<string[]>(["bold", "italic"]);

		return (
			<>
				<ToggleGroup type="multiple" value={selectedValues} onValueChange={onChangeValues}>
					<ToggleGroupItem value="bold">
						<Icon icon={Bold} />
					</ToggleGroupItem>
					<ToggleGroupItem value="italic">
						<Icon icon={Italic} />
					</ToggleGroupItem>
					<ToggleGroupItem value="underline">
						<Icon icon={Underline} />
					</ToggleGroupItem>
				</ToggleGroup>
				<div style={{ marginTop: "20px" }}>Выбрано: {selectedValues.join(", ")}</div>
			</>
		);
	}
};

export const FormExample: StoryObj = {
	render: function FormExampleComponent() {
		// Определяем схему валидации
		const formSchema = z.object({
			eventConfirmed: z.enum(["true", "false", "indeterminate"])
		});

		// Создаем форму с использованием react-hook-form и zod
		const form = useForm<z.infer<typeof formSchema>>({
			resolver: zodResolver(formSchema),
			defaultValues: { eventConfirmed: "indeterminate" }
		});

		// Обработчик отправки формы
		function onSubmit(values: z.infer<typeof formSchema>) {
			// В реальном приложении здесь был бы код для отправки данных
			alert(JSON.stringify(values, null, 2));
		}

		return (
			<Form asChild {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormStack>
						<FormField
							name="eventConfirmed"
							title="Мероприятие подтверждено"
							required
							control={({ field }) => {
								return (
									<ToggleGroup type="single" value={field.value} onValueChange={field.onChange}>
										<ToggleGroupItem value="true">Да</ToggleGroupItem>
										<ToggleGroupItem value="false">Нет</ToggleGroupItem>
										<ToggleGroupItem value="indeterminate">Неизвестно</ToggleGroupItem>
									</ToggleGroup>
								);
							}}
						/>
						<Button type="submit">Отправить</Button>
					</FormStack>
				</form>
			</Form>
		);
	}
};
