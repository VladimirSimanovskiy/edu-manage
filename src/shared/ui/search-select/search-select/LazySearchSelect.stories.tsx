import { Button } from "@/components/button";
import { Form, FormBody, FormField, FormFooter, FormStack } from "@/components/form";
import { Modal, ModalBody, ModalContent, ModalHeader, ModalTitle, ModalTrigger } from "@/components/modal";
import { storyDecorator, withFixedWidth } from "@/lib/utils/storybook";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SearchSelectOption } from "@/shared/hooks/useSearchSelect";
import { Badge } from "../../badge/Badge";
import { LazySearchSelect } from "./LazySearchSelect";
import { Icon } from "@/components/icon";
import { Search } from "lucide-react";

// Генерируем большой список данных для тестирования
const generateLargeDataset = (count: number): SearchSelectOption[] => {
	const categories = ["Фрукты", "Овощи", "Ягоды", "Орехи", "Специи"];
	const items = [
		"Яблоко",
		"Банан",
		"Апельсин",
		"Груша",
		"Виноград",
		"Киви",
		"Манго",
		"Ананас",
		"Морковь",
		"Картофель",
		"Лук",
		"Чеснок",
		"Помидор",
		"Огурец",
		"Перец",
		"Капуста",
		"Клубника",
		"Малина",
		"Черника",
		"Ежевика",
		"Смородина",
		"Крыжовник",
		"Вишня",
		"Черешня",
		"Грецкий орех",
		"Миндаль",
		"Фундук",
		"Кешью",
		"Фисташки",
		"Арахис",
		"Бразильский орех",
		"Базилик",
		"Орегано",
		"Тимьян",
		"Розмарин",
		"Петрушка",
		"Укроп",
		"Кориандр",
		"Мята"
	];

	return Array.from({ length: count }, (_, index) => {
		const category = categories[index % categories.length];
		const item = items[index % items.length];
		const id = `item-${index}`;

		return {
			value: id,
			label: `${item} ${category} #${index + 1}`
		};
	});
};
const options = generateLargeDataset(10000);

const meta: Meta<typeof LazySearchSelect> = {
	component: LazySearchSelect,
	parameters: {
		docs: {
			description: {
				component:
					"LazySearchSelect с fuzzy поиском для больших наборов данных. Поддерживает пагинацию и умный поиск."
			},
			canvas: {
				sourceState: "none"
			},
			source: {
				code: ""
			},
			codePanel: false
		}
	},
	argTypes: {
		pageSize: {
			control: { type: "number", min: 10, max: 100, step: 10 },
			description: "Количество элементов на странице"
		},
		filter: {
			control: false,
			description: "Кастомная функция фильтрации"
		},
		options: {
			control: false,
			description: "Массив опций"
		}
	}
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	decorators: [withFixedWidth("360px", "m-auto")],
	args: {
		options,
		placeholder: `Поиск среди ${options.length} элементов...`,
		pageSize: 50
	},
	parameters: {
		docs: {
			description: {
				story: "Базовый пример с 10000 элементов. Попробуйте поискать 'яблоко', 'морк' или 'орех'."
			}
		}
	}
};

export const WithStartIcon: Story = {
	decorators: [withFixedWidth("360px", "m-auto")],
	args: {
		options,
		placeholder: `Поиск среди ${options.length} элементов...`,
		pageSize: 50,
		startIcon: <Icon icon={Search} />
	},
	parameters: {
		docs: {
			description: {
				story: "Базовый пример с 10000 элементов. Попробуйте поискать 'яблоко', 'морк' или 'орех'."
			}
		}
	}
};

// Пример с кастомным размером страницы
export const CustomPageSize: Story = {
	decorators: [withFixedWidth("360px", "m-auto")],
	args: {
		options,
		placeholder: "Маленькие страницы (25 элементов)...",
		pageSize: 25
	},
	parameters: {
		docs: {
			description: {
				story: "Пример с уменьшенным размером страницы для демонстрации частой пагинации."
			}
		}
	}
};

// Пример с кастомным рендерингом
export const WithCustomRenderer: Story = {
	decorators: [withFixedWidth("360px", "m-auto")],
	args: {
		options,
		placeholder: "Поиск с бейджами...",
		pageSize: 40,
		renderOption: ({ option, isSelected }: { option: SearchSelectOption; isSelected: boolean }) => (
			<div className="flex items-center gap-2">
				<span>{option.label.split(" ")[0]}</span>
				<Badge status={isSelected ? "default" : "info"} size="sm">
					{option.label.split(" ")[1]}
				</Badge>
			</div>
		)
	},
	parameters: {
		docs: {
			description: {
				story: "Пример с кастомным рендерингом опций с использованием бейджей."
			}
		}
	}
};

// Пример с управляемым состоянием
export const Controlled: Story = {
	decorators: [withFixedWidth("360px", "m-auto")],
	render: function Controlled() {
		const [value, setValue] = useState<string | number | undefined>(undefined);

		return (
			<div className="space-y-4">
				<LazySearchSelect
					options={options}
					placeholder="Управляемый компонент..."
					pageSize={50}
					value={value}
					onChange={setValue}
				/>
				<div className="text-sm text-muted-foreground">Выбранное значение: {value || "Ничего не выбрано"}</div>
				<div>
					<Button onClick={() => setValue("item-0")}>Установить значение "item-0"</Button>
				</div>
			</div>
		);
	},
	parameters: {
		docs: {
			description: {
				story: "Пример управляемого компонента с отображением выбранного значения."
			}
		}
	}
};

export const Invalid: Story = {
	decorators: [withFixedWidth("360px", "m-auto")],
	args: {
		options,
		defaultValue: "item-0",
		pageSize: 50,
		invalid: true
	}
};

export const Disabled: Story = {
	decorators: [withFixedWidth("360px", "m-auto")],
	args: {
		options,
		defaultValue: "item-0",
		pageSize: 50,
		disabled: true
	}
};

export const WithDefaultValue: Story = {
	decorators: [withFixedWidth("360px", "m-auto")],
	args: {
		options,
		defaultValue: "item-1000"
	}
};

export const WithValue: Story = {
	decorators: [withFixedWidth("360px", "m-auto")],
	args: {
		options,
		value: "item-1000"
	}
};

// Демонстрация fuzzy search
export const FuzzySearchDemo: Story = {
	decorators: [withFixedWidth("360px", "m-auto")],
	args: {
		options: [
			{ value: "apple", label: "Apple MacBook Pro" },
			{ value: "samsung", label: "Samsung Galaxy" },
			{ value: "microsoft", label: "Microsoft Surface" },
			{ value: "google", label: "Google Pixel" },
			{ value: "amazon", label: "Amazon Kindle" },
			{ value: "tesla", label: "Tesla Model S" },
			{ value: "nintendo", label: "Nintendo Switch" },
			{ value: "playstation", label: "PlayStation 5" },
			{ value: "xbox", label: "Xbox Series X" },
			{ value: "iphone", label: "iPhone 15 Pro" },
			{ value: "macbook", label: "MacBook Air M2" },
			{ value: "ipad", label: "iPad Pro" },
			{ value: "airpods", label: "AirPods Pro" },
			{ value: "watch", label: "Apple Watch" }
		],
		placeholder: "Попробуйте поиск: 'mbp', 'ps5', 'iph'...",
		pageSize: 20
	},
	parameters: {
		docs: {
			description: {
				story: "Демонстрация fuzzy search. Попробуйте ввести:\n- 'mbp' найдет 'MacBook Pro'\n- 'ps5' найдет 'PlayStation 5'\n- 'iph' найдет 'iPhone 15 Pro'\n- 'appl' найдет все Apple продукты"
			}
		}
	}
};

// Пример с кастомной функцией фильтрации
export const CustomFilter: Story = {
	decorators: [withFixedWidth("360px", "m-auto")],
	args: {
		options,
		placeholder: "Только точные совпадения...",
		pageSize: 50,
		filter: (value: string, search: string) => {
			// Кастомный фильтр - только точные совпадения
			const valueLower = value.toLowerCase();
			const searchLower = search.toLowerCase();

			if (valueLower.includes(searchLower)) {
				return valueLower.startsWith(searchLower) ? 2 : 1;
			}
			return 0;
		}
	},
	parameters: {
		docs: {
			description: {
				story: "Пример с кастомной функцией фильтрации, которая ищет только точные совпадения подстрок."
			}
		}
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
										<LazySearchSelect
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

export const InModal: Story = {
	decorators: [storyDecorator("mx-auto max-w-[1200px] w-full")],
	render: function InModal() {
		const [open, setOpen] = useState(false);
		const [selectedValue, setSelectedValue] = useState<string | number | undefined>();

		return (
			<Modal open={open} onOpenChange={setOpen}>
				<ModalTrigger asChild>
					<Button variant="primary">Открыть LazySearchSelect в модальном окне</Button>
				</ModalTrigger>
				<ModalContent>
					<ModalHeader>
						<ModalTitle>Выбор продукта</ModalTitle>
					</ModalHeader>
					<ModalBody>
						<div className="space-y-4">
							<LazySearchSelect
								placeholder="Начните вводить название продукта..."
								options={options}
								value={selectedValue}
								onChange={setSelectedValue}
							/>
							{selectedValue && <p className="text-sm text-muted-foreground">Выбрано: {selectedValue}</p>}
						</div>
					</ModalBody>
				</ModalContent>
			</Modal>
		);
	}
};

export const WithDisabledOptions: Story = {
	decorators: [withFixedWidth("360px", "m-auto")],
	render: function WithDisabledOptions() {
		const options: SearchSelectOption[] = [
			{ value: "apple", label: "Яблоко" },
			{ value: "banana", label: "Банан" },
			{ value: "orange", label: "Апельсин", disabled: true },
			{ value: "grape", label: "Виноград" },
			{ value: "kiwi", label: "Киви", disabled: true },
			{ value: "mango", label: "Манго" },
			{ value: "pineapple", label: "Ананас" },
			{ value: "strawberry", label: "Клубника", disabled: true }
		];

		return (
			<div className="space-y-3">
				<div className="text-sm text-gray-600">Уже выбраны: Апельсин, Киви, Клубника</div>
				<LazySearchSelect options={options} placeholder="Выберите фрукт" searchPlaceholder="Поиск..." />
			</div>
		);
	}
};

export const WithClearButton: Story = {
	decorators: [withFixedWidth("360px", "m-auto")],
	render: function WithDisabledOptions() {
		const options: SearchSelectOption[] = [
			{ value: "apple", label: "Яблоко" },
			{ value: "banana", label: "Банан" },
			{ value: "orange", label: "Апельсин" },
			{ value: "grape", label: "Виноград" },
			{ value: "kiwi", label: "Киви" },
			{ value: "mango", label: "Манго" },
			{ value: "pineapple", label: "Ананас" },
			{ value: "strawberry", label: "Клубника" }
		];

		return (
			<div className="space-y-3">
				<LazySearchSelect
					options={options}
					placeholder="Выберите фрукт"
					searchPlaceholder="Поиск..."
					onClear={() => {
						alert("Clear button clicked");
					}}
				/>
			</div>
		);
	}
};
