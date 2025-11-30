import { CustomStory, withFixedWidth } from "@/lib/utils/storybook";
import type { Meta, StoryObj } from "@storybook/react";
import { MultiSelect } from "./MultiSelect";
import { SearchSelectOption } from "@/shared/hooks/useSearchSelect";
import { useState, useMemo } from "react";
import { Button } from "@/components/button";
import { LoadOptionsParams, LoadOptionsResult } from "../async-search-select/types";
import { RenderOptionProps } from "./MultiSelect";
import { useDataCache } from "@/hooks/useDataCache";
import {
	Modal,
	ModalTrigger,
	ModalContent,
	ModalHeader,
	ModalTitle,
	ModalDescription,
	ModalBody,
	ModalFooter,
	ModalClose
} from "@/components/modal";
import { Icon } from "@/components/icon";
import { Search } from "lucide-react";

const meta: Meta<typeof MultiSelect> = {
	component: MultiSelect,
	decorators: [withFixedWidth("360px", "m-auto")],
	tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockLoadOptions = async (params: LoadOptionsParams) => {
	const options = Array.from({ length: 100 }, (_, index) => ({
		value: `id-${index}`,
		label: `Option ${index}`
	}));
	return {
		options: options.filter((option) => option.label.includes(params.searchQuery))
	};
};

export const Default: Story = {
	args: {
		loadOptions: mockLoadOptions,
		onLabelClick: (option: SearchSelectOption) => {
			console.log("onLabelClick", option);
		},
		onChange: (options: SearchSelectOption[]) => {
			console.log("onChange", options);
		}
	}
};

export const WithStartIcon: Story = {
	args: {
		loadOptions: mockLoadOptions,
		onLabelClick: (option: SearchSelectOption) => {
			console.log("onLabelClick", option);
		},
		onChange: (options: SearchSelectOption[]) => {
			console.log("onChange", options);
		},
		startIcon: <Icon icon={Search} />
	}
};

export const Disabled: Story = {
	args: {
		disabled: true
	}
};

export const Invalid: Story = {
	args: {
		invalid: true,
		loadOptions: mockLoadOptions
	}
};

export const Controlled: CustomStory = {
	render: function Controlled() {
		const [value, setValue] = useState<SearchSelectOption[]>([
			{ value: "id-1", label: "Option 1" },
			{ value: "id-2", label: "Option 2" },
			{ value: "id-3", label: "Option 3" },
			{ value: "id-4", label: "Option 4" },
			{ value: "id-5", label: "Option 5" },
			{ value: "id-6", label: "Option 6" },
			{ value: "id-7", label: "Option 7" },
			{ value: "id-8", label: "Option 8" },
			{ value: "id-9", label: "Option 9" },
			{ value: "id-10", label: "Option 10" }
		]);
		return (
			<div>
				<div className="mb-2 flex gap-2">
					<Button onClick={() => setValue([{ value: "id-1", label: "Option 1" }])}>Set value 1</Button>
					<Button onClick={() => setValue([{ value: "id-2", label: "Option 2" }])}>Set value 2</Button>
					<Button onClick={() => setValue([])}>Clear value</Button>
				</div>
				<MultiSelect value={value} onChange={setValue} loadOptions={mockLoadOptions} />
			</div>
		);
	}
};

export const WithDefaultValue: Story = {
	args: {
		defaultValue: [
			{ value: "id-1", label: "Option 1" },
			{ value: "id-2", label: "Option 2" }
		],
		loadOptions: mockLoadOptions
	}
};

export const WithRenderOption: Story = {
	args: {
		renderOption: (props: RenderOptionProps<SearchSelectOption>) => {
			if (props.type === "trigger") {
				return <div>{props.option.label}</div>;
			}
			return (
				<div>
					{props.isSelected ? "+" : ""} {props.option.label}
				</div>
			);
		},
		loadOptions: mockLoadOptions
	}
};

export const WithCache: CustomStory = {
	render: function WithCache() {
		// Кеш для MultiSelect
		const cache = useDataCache<LoadOptionsResult<SearchSelectOption>, string>({
			enabled: true,
			ttl: 10 * 60 * 1000, // 10 минут
			keyFn: (query: string) => `multiselect-${query}`
		});

		// Расширенный мок с большим количеством данных для демонстрации
		const mockLoadManyOptions = useMemo(() => {
			return async (params: LoadOptionsParams): Promise<LoadOptionsResult<SearchSelectOption>> => {
				// Имитируем задержку
				await new Promise((resolve) => setTimeout(resolve, 1000));

				const options = Array.from({ length: 1000 }, (_, index) => ({
					value: `id-${index}`,
					label: `Пользователь ${index + 1}`
				}));

				const filtered = options.filter((option) =>
					option.label.toLowerCase().includes(params.searchQuery.toLowerCase())
				);

				return {
					options: filtered.slice(0, 50)
				};
			};
		}, []);

		// Обертка с кешированием
		const loadOptionsWithCache = useMemo(() => {
			return async (params: LoadOptionsParams): Promise<LoadOptionsResult<SearchSelectOption>> => {
				const { searchQuery } = params;

				// Проверяем кеш
				const cachedResult = cache.get(searchQuery);
				if (cachedResult) {
					console.log(`🎯 MultiSelect cache hit for "${searchQuery}"`);
					return cachedResult;
				}

				console.log(`🔄 MultiSelect loading data for "${searchQuery}"`);
				// Загружаем данные
				const result = await mockLoadManyOptions(params);

				// Сохраняем в кеш
				cache.set(searchQuery, result);

				return result;
			};
		}, [cache, mockLoadManyOptions]);

		const [selectedOptions, setSelectedOptions] = useState<SearchSelectOption[]>([]);

		return (
			<div className="space-y-4">
				<MultiSelect
					loadOptions={loadOptionsWithCache}
					loadMode="input"
					minInputLength={1}
					placeholder="Выберите пользователей (с кэшем)"
					searchPlaceholder="Найти пользователя"
					inputHintText="Введите минимум 1 символ для поиска"
					loadingText="Загружаем пользователей..."
					emptyText="Пользователи не найдены"
					errorText="Ошибка загрузки"
					value={selectedOptions}
					onChange={setSelectedOptions}
				/>
				<div className="space-y-2">
					<div className="text-sm">Выбрано: {selectedOptions.length} пользователей</div>
					<button
						className="rounded bg-gray-100 px-2 py-1 text-xs hover:bg-gray-200"
						onClick={() => cache.clear()}
					>
						Очистить кеш
					</button>
					<div className="text-xs text-muted-foreground">💡 Откройте DevTools Console для логов кеша</div>
				</div>
			</div>
		);
	},
	parameters: {
		docs: {
			description: {
				story: `
Пример кеширования в \`MultiSelect\` компоненте.

**Особенности:**
- Кеш сохраняет результаты поиска для каждого запроса
- TTL: 10 минут
- 1000 мок-пользователей для демонстрации
- Ручная очистка кеша

**Преимущества:**
- Мгновенная загрузка ранее запрошенных данных
- Сокращение нагрузки на сервер
- Лучший UX при повторных поисках
				`
			}
		}
	}
};

export function InModal() {
	const [open, setOpen] = useState(false);
	const [selectedOptions, setSelectedOptions] = useState<SearchSelectOption[]>([]);

	return (
		<Modal open={open} onOpenChange={setOpen} modal={false}>
			<ModalTrigger asChild>
				<Button variant="primary">Открыть модальное окно с MultiSelect</Button>
			</ModalTrigger>
			<ModalContent overlayBlur={true} overlayType="gradient">
				<ModalHeader>
					<ModalTitle>Выбор пользователей</ModalTitle>
					<ModalDescription>Выберите пользователей из списка</ModalDescription>
				</ModalHeader>
				<ModalBody>
					<MultiSelect
						loadOptions={mockLoadOptions}
						value={selectedOptions}
						onChange={setSelectedOptions}
						placeholder="Выберите пользователей"
						searchPlaceholder="Найти пользователя"
					/>
				</ModalBody>
				<ModalFooter>
					<ModalClose asChild>
						<Button variant="secondary">Отмена</Button>
					</ModalClose>
					<Button
						variant="primary"
						onClick={() => {
							console.log("Выбранные пользователи:", selectedOptions);
							setOpen(false);
						}}
					>
						Сохранить ({selectedOptions.length})
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}

export const WithDisabledOptions: CustomStory = {
	render: function WithDisabledOptions() {
		const [selectedOptions, setSelectedOptions] = useState<SearchSelectOption[]>([]);

		const mockLoadOptions = async (params: LoadOptionsParams) => {
			await new Promise((resolve) => setTimeout(resolve, 300));

			const users = [
				{ name: "Иван Иванов", email: "ivan@example.com" },
				{ name: "Петр Петров", email: "petr@example.com" },
				{ name: "Мария Сидорова", email: "maria@example.com" },
				{ name: "Анна Козлова", email: "anna@example.com" }
			];

			const filtered = users.filter((user) => user.name.toLowerCase().includes(params.searchQuery.toLowerCase()));

			const existing = ["ivan@example.com", "maria@example.com"];

			return {
				options: filtered.map((user) => ({
					value: user.email,
					label: user.name,
					disabled: existing.includes(user.email)
				}))
			};
		};

		return (
			<div className="space-y-3">
				<div className="text-sm text-gray-600">Уже выбраны: Иван Иванов, Мария Сидорова</div>
				<MultiSelect
					loadOptions={mockLoadOptions}
					value={selectedOptions}
					onChange={setSelectedOptions}
					placeholder="Выберите пользователей"
					searchPlaceholder="Поиск..."
				/>
			</div>
		);
	}
};

export const WithClearButton: CustomStory = {
	render: function WithDisabledOptions() {
		const [selectedOptions, setSelectedOptions] = useState<SearchSelectOption[]>([]);

		const mockLoadOptions = async (params: LoadOptionsParams) => {
			await new Promise((resolve) => setTimeout(resolve, 300));

			const users = [
				{ name: "Иван Иванов", email: "ivan@example.com" },
				{ name: "Петр Петров", email: "petr@example.com" },
				{ name: "Мария Сидорова", email: "maria@example.com" },
				{ name: "Анна Козлова", email: "anna@example.com" }
			];

			const filtered = users.filter((user) => user.name.toLowerCase().includes(params.searchQuery.toLowerCase()));

			return {
				options: filtered.map((user) => ({
					value: user.email,
					label: user.name
				}))
			};
		};

		return (
			<div className="space-y-3">
				<MultiSelect
					loadOptions={mockLoadOptions}
					value={selectedOptions}
					onChange={setSelectedOptions}
					placeholder="Выберите пользователей"
					searchPlaceholder="Поиск..."
					onClear={() => {
						alert("Clear button clicked");
					}}
				/>
			</div>
		);
	}
};
