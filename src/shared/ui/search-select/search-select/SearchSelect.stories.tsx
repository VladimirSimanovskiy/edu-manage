import { Badge } from "@/components/badge/Badge";
import { Form, FormBody, FormField, FormFooter, FormStack } from "@/components/form";
import { storyDecorator, withFixedWidth } from "@/lib/utils/storybook";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SearchSelectOption } from "@/shared/hooks/useSearchSelect";
import { Button } from "../../button";
import { RenderOptionProps, SearchSelect } from "./SearchSelect";
import { Icon } from "@/components/icon";
import { CheckIcon, Circle, LucideIcon, Search } from "lucide-react";

const meta: Meta<typeof SearchSelect> = {
	component: SearchSelect,
	tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof SearchSelect>;

interface CountryOption extends SearchSelectOption {
	badge?: string;
}
const countries: CountryOption[] = [
	{ value: "us", label: "🇺🇸 United States", badge: "" },
	{ value: "uk", label: "🇬🇧 United Kingdom", badge: "!" },
	{ value: "de", label: "🇩🇪 Germany" },
	{ value: "fr", label: "🇫🇷 France" }
];

export const Default: Story = {
	decorators: [withFixedWidth("360px", "m-auto")],
	args: {
		options: countries,
		placeholder: "Select a country"
	}
};

export const WithStartIcon: Story = {
	decorators: [withFixedWidth("360px", "m-auto")],
	args: {
		options: countries,
		placeholder: "Select a country",
		startIcon: <Icon icon={Search} />
	}
};

export const CustomOptionRender: Story = {
	decorators: [withFixedWidth("360px", "m-auto")],
	args: {
		options: countries,
		renderOption: (data: RenderOptionProps<CountryOption>) => {
			const { option, type } = data;
			return (
				<div className="flex items-center gap-2">
					{type === "list" && (
						<span className="ml-auto w-2 text-xs text-muted-foreground">{data.isSelected && "✓"}</span>
					)}
					{type === "list" && data.index !== undefined && (
						<span className="ml-auto text-xs text-muted-foreground">#{data.index}</span>
					)}
					{option.badge && <Badge>{option.badge}</Badge>}
					<span>{option.label}</span>
				</div>
			);
		}
	}
};

export const Controlled: Story = {
	decorators: [withFixedWidth("360px", "m-auto")],
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	render: function Controlled(_) {
		const [selectedValue, setSelectedValue] = useState<CountryOption["value"] | undefined>(undefined);

		return (
			<div>
				<SearchSelect<CountryOption>
					options={countries}
					value={selectedValue}
					onChange={(value) => setSelectedValue(value)}
				></SearchSelect>
				<div>Selected value: {selectedValue}</div>
				<div className="flex gap-2">
					<Button onClick={() => setSelectedValue("us")}>us</Button>
					<Button onClick={() => setSelectedValue("uk")}>uk</Button>
					<Button onClick={() => setSelectedValue("de")}>de</Button>
					<Button onClick={() => setSelectedValue("fr")}>fr</Button>
					<Button onClick={() => setSelectedValue(undefined)}>Reset</Button>
				</div>
			</div>
		);
	}
};

export const Invalid: Story = {
	decorators: [withFixedWidth("360px", "m-auto")],
	args: {
		options: countries,
		invalid: true
	}
};

export const Disabled: Story = {
	decorators: [withFixedWidth("360px", "m-auto")],
	args: {
		options: countries,
		disabled: true
	}
};

export const WithDefaultValue: Story = {
	decorators: [withFixedWidth("360px", "m-auto")],
	args: {
		options: countries,
		defaultValue: "fr"
	}
};

export const WithForm: Story = {
	decorators: [storyDecorator("mx-auto max-w-[1200px] w-full")],
	render: function DefaultForm() {
		// Определяем схему валидации
		const formSchema = z.object({
			product: z.string().regex(/^(?!INVALID$).+$/, { message: "Пожалуйста, выберите корректный продукт" })
		});

		// Создаем форму с использованием react-hook-form и zod
		const form = useForm<z.infer<typeof formSchema>>({
			resolver: zodResolver(formSchema),
			defaultValues: { product: "microsoft" }
		});

		// Обработчик отправки формы
		function onSubmit(values: z.infer<typeof formSchema>) {
			// В реальном приложении здесь был бы код для отправки данных
			alert(JSON.stringify(values, null, 2));
		}

		return (
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormBody>
						<FormStack>
							<FormField
								name="product"
								title="Выберите продукт"
								description="Выберите продукт из списка"
								required
								control={({ field, formState }) => {
									return (
										<SearchSelect
											options={[
												{ value: "apple", label: "Apple MacBook Pro" },
												{ value: "samsung", label: "Samsung Galaxy" },
												{ value: "microsoft", label: "Microsoft Surface" },
												{ value: "google", label: "Google Pixel" },
												{ value: "amazon", label: "Amazon Kindle" },
												{ value: "INVALID", label: "INVALID VALUE" }
											]}
											placeholder="Выберите продукт..."
											{...field}
											invalid={!!formState.errors?.product}
										/>
									);
								}}
							/>
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

export const WithDisabledOptions: Story = {
	decorators: [withFixedWidth("360px", "m-auto")],
	render: function WithDisabledOptions() {
		const options: SearchSelectOption[] = [
			{ value: "ivan", label: "Иван Иванов" },
			{ value: "petr", label: "Петр Петров" },
			{ value: "maria", label: "Мария Сидорова", disabled: true },
			{ value: "anna", label: "Анна Козлова" },
			{ value: "sergey", label: "Сергей Волков", disabled: true }
		];

		return (
			<div className="space-y-3">
				<div className="text-sm text-gray-600">Уже выбраны: Мария Сидорова, Сергей Волков</div>
				<SearchSelect options={options} placeholder="Выберите пользователя" searchPlaceholder="Поиск..." />
			</div>
		);
	}
};

export const WithClearButton: Story = {
	decorators: [withFixedWidth("360px", "m-auto")],
	render: function WithDisabledOptions() {
		interface CustomOption extends SearchSelectOption {
			icon?: LucideIcon;
		}

		const options: CustomOption[] = [
			{ value: "ivan", label: "Иван Иванов", icon: Circle },
			{ value: "petr", label: "Петр Петров", icon: Circle },
			{ value: "maria", label: "Мария Сидорова", icon: Circle },
			{ value: "anna", label: "Анна Козлова", icon: Circle },
			{ value: "sergey", label: "Сергей Волков", icon: Circle }
		];

		return (
			<div className="space-y-3">
				<SearchSelect
					options={options}
					placeholder="Выберите пользователя"
					searchPlaceholder="Поиск..."
					onClear={() => {
						alert("Clear button clicked");
					}}
					renderOption={(data: RenderOptionProps<CustomOption>) => {
						const { option, type } = data;
						return (
							<div className="flex w-full items-center gap-2">
								{option.icon && <Icon icon={option.icon} />}
								<span>{option.label}</span>
								{type === "list" && (
									<span className="ml-auto">{data.isSelected && <Icon icon={CheckIcon} />}</span>
								)}
							</div>
						);
					}}
				/>
			</div>
		);
	}
};
