import type { Meta, StoryObj } from "@storybook/react";
import { useState, useMemo } from "react";
import { AsyncSearchSelect } from "./AsyncSearchSelect";
import type { SearchSelectOption, LoadOptionsParams, LoadOptionsResult } from "./types";
import { useDataCache } from "@/hooks/useDataCache";
import { withFixedWidth } from "@/lib/utils/storybook";
import { TextOverflowTooltip } from "@/components/overflow-tooltip";
import { Icon } from "@/components/icon";
import { Check, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const meta: Meta<typeof AsyncSearchSelect> = {
	component: AsyncSearchSelect,
	decorators: [withFixedWidth("360px", "m-auto")],
	tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof AsyncSearchSelect>;

// Генерация большого количества пользователей для тестирования пагинации
const generateUsers = (count: number): SearchSelectOption[] => {
	const firstNames = [
		"John",
		"Jane",
		"Bob",
		"Alice",
		"Charlie",
		"Diana",
		"Edward",
		"Fiona",
		"George",
		"Helen",
		"Ivan",
		"Julia",
		"Kevin",
		"Laura",
		"Michael",
		"Nancy",
		"Oliver",
		"Patricia",
		"Quentin",
		"Rachel",
		"Sarah",
		"Thomas",
		"Uma",
		"Victor",
		"Wendy",
		"Xavier",
		"Yvonne",
		"Zachary",
		"Amelia",
		"Benjamin",
		"Charlotte",
		"David",
		"Emma",
		"Frank",
		"Grace",
		"Henry",
		"Isabella",
		"Jack",
		"Kate",
		"Liam",
		"Mia",
		"Noah",
		"Olivia",
		"Paul",
		"Quinn",
		"Ruby",
		"Samuel",
		"Tara",
		"Ulysses",
		"Violet"
	];

	const lastNames = [
		"Smith",
		"Johnson",
		"Williams",
		"Brown",
		"Jones",
		"Garcia",
		"Miller",
		"Davis",
		"Rodriguez",
		"Martinez",
		"Hernandez",
		"Lopez",
		"Gonzalez",
		"Wilson",
		"Anderson",
		"Thomas",
		"Taylor",
		"Moore",
		"Jackson",
		"Martin",
		"Lee",
		"Perez",
		"Thompson",
		"White",
		"Harris",
		"Sanchez",
		"Clark",
		"Ramirez",
		"Lewis",
		"Robinson",
		"Walker",
		"Young",
		"Allen",
		"King",
		"Wright",
		"Scott",
		"Torres",
		"Nguyen",
		"Hill",
		"Flores",
		"Green",
		"Adams",
		"Nelson",
		"Baker",
		"Hall",
		"Rivera",
		"Campbell",
		"Mitchell",
		"Carter",
		"Roberts"
	];

	return Array.from({ length: count }, (_, index) => ({
		value: (index + 1).toString(),
		label: `${firstNames[index % firstNames.length]} ${lastNames[index % lastNames.length]} #${index + 1}`
	}));
};

// Генерируем 200 пользователей для тестирования
const mockUsers = generateUsers(2000);

// Моковая функция загрузки
const mockLoadOptions = async ({ searchQuery }: LoadOptionsParams): Promise<LoadOptionsResult<SearchSelectOption>> => {
	// Имитируем задержку сети
	await new Promise((resolve) => setTimeout(resolve, 1000));

	// Фильтруем по запросу и ограничиваем результат для демонстрации
	const filteredUsers = mockUsers
		.filter((user) => user.label.toLowerCase().includes(searchQuery.toLowerCase()))
		.slice(0, 50); // Ограничиваем до 50 результатов

	return { options: filteredUsers };
};

// Моковая функция с ошибкой
const mockLoadOptionsWithError = async (): Promise<LoadOptionsResult<SearchSelectOption>> => {
	await new Promise((resolve) => setTimeout(resolve, 1000));
	throw new Error("Network error");
};

export const AutoMode: Story = {
	args: {
		loadOptions: mockLoadOptions,
		loadMode: "auto",
		placeholder: "Выберите пользователя",
		searchPlaceholder: "Найти пользователя",
		loadingText: "Загружаем пользователей...",
		emptyText: "Пользователи не найдены",
		errorText: "Ошибка загрузки пользователей"
	}
};

export const WithStartIcon: Story = {
	args: {
		loadOptions: mockLoadOptions,
		loadMode: "auto",
		placeholder: "Выберите пользователя",
		searchPlaceholder: "Найти пользователя",
		loadingText: "Загружаем пользователей...",
		emptyText: "Пользователи не найдены",
		errorText: "Ошибка загрузки пользователей",
		startIcon: <Icon icon={Search} />
	}
};

export const InputMode: Story = {
	args: {
		loadOptions: mockLoadOptions,
		loadMode: "input",
		minInputLength: 2,
		placeholder: "Найдите пользователя",
		searchPlaceholder: "Введите имя",
		inputHintText: "Введите минимум 2 символа для поиска",
		loadingText: "Ищем пользователей...",
		emptyText: "Пользователи не найдены",
		errorText: "Ошибка поиска"
	}
};

export const WithError: Story = {
	args: {
		loadOptions: mockLoadOptionsWithError,
		loadMode: "auto",
		placeholder: "Выберите пользователя",
		loadingText: "Загружаем...",
		errorText: "Произошла ошибка при загрузке"
	}
};

export const Controlled: Story = {
	render: function Controlled() {
		const [value, setValue] = useState<SearchSelectOption | undefined>();

		return (
			<div className="space-y-4">
				<AsyncSearchSelect
					loadOptions={mockLoadOptions}
					loadMode="auto"
					placeholder="Выберите пользователя"
					value={value}
					onChange={(newValue) => setValue(newValue || undefined)}
				/>
				<div className="text-sm text-muted">Выбранное значение: {value?.label || "не выбрано"}</div>
			</div>
		);
	}
};

export const CustomRenderOption: Story = {
	args: {
		loadOptions: mockLoadOptions,
		loadMode: "input",
		minInputLength: 1,
		placeholder: "Выберите пользователя",
		renderOption: (data) => {
			const { option, type } = data;
			if (type === "trigger") {
				return (
					<div className="flex items-center gap-2">
						<div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-white">
							{option.label.charAt(0)}
						</div>
						{option.label}
					</div>
				);
			}

			return (
				<div className="flex w-full items-center gap-2">
					<div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-white">
						{option.label.charAt(0)}
					</div>
					<span className="flex-1">{option.label}</span>
					{data.isSelected && (
						<div className="flex h-4 w-4 items-center justify-center rounded-full bg-primary">
							<svg className="h-2 w-2 text-white" fill="currentColor" viewBox="0 0 20 20">
								<path
									fillRule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
					)}
				</div>
			);
		}
	}
};

export const WithDefaultValue: Story = {
	args: {
		defaultValue: { value: "1", label: "User 1" },
		loadOptions: mockLoadOptions
	}
};

export const WithCache: Story = {
	render: function WithCache() {
		// Создаем кеш для результатов поиска
		const cache = useDataCache<LoadOptionsResult<SearchSelectOption>, string>({
			enabled: true,
			ttl: 10 * 60 * 1000, // 10 минут
			keyFn: (query: string) => `users-${query}`
		});

		// Обертка над loadOptions с кешированием
		const loadOptionsWithCache = useMemo(() => {
			return async (params: LoadOptionsParams): Promise<LoadOptionsResult<SearchSelectOption>> => {
				const { searchQuery } = params;

				// Проверяем кеш
				const cachedResult = cache.get(searchQuery);
				if (cachedResult) {
					console.log(`🎯 Cache hit for "${searchQuery}"`);
					return cachedResult;
				}

				console.log(`🔄 Loading data for "${searchQuery}"`);
				// Загружаем данные
				const result = await mockLoadOptions(params);

				// Сохраняем в кеш
				cache.set(searchQuery, result);

				return result;
			};
		}, [cache]);

		return (
			<div className="space-y-4">
				<AsyncSearchSelect
					loadOptions={loadOptionsWithCache}
					loadMode="auto"
					placeholder="Выберите пользователя (с кэшем)"
					searchPlaceholder="Найти пользователя"
					loadingText="Загружаем пользователей..."
					emptyText="Пользователи не найдены"
					errorText="Ошибка загрузки пользователей"
				/>
				<div className="text-xs text-muted-foreground">
					💡 Откройте DevTools Console чтобы увидеть работу кеша
				</div>
			</div>
		);
	},
	parameters: {
		docs: {
			description: {
				story: `
Пример кеширования результатов поиска внутри \`loadOptions\`.

**Особенности:**
- Кеш создается с помощью хука \`useDataCache\`
- TTL кеша: 10 минут
- Кеширование по поисковому запросу
- Логи кеша выводятся в DevTools Console

**Преимущества:**
- Полный контроль над стратегией кеширования
- Можно легко добавить дополнительные параметры в ключ (фильтры, пользователь и т.д.)
- Переиспользование логики кеширования в других компонентах
				`
			}
		}
	}
};

export const WithAdvancedCache: Story = {
	render: function WithAdvancedCache() {
		// Более сложный пример с дополнительными параметрами кеширования
		const cache = useDataCache<LoadOptionsResult<SearchSelectOption>, { query: string; userId?: string }>({
			enabled: true,
			ttl: 5 * 60 * 1000, // 5 минут
			keyFn: (params) => `advanced-${params.query}-${params.userId || "guest"}`
		});

		const [currentUserId] = useState("user123"); // Имитация текущего пользователя

		// Продвинутая логика кеширования
		const loadOptionsWithAdvancedCache = useMemo(() => {
			return async (params: LoadOptionsParams): Promise<LoadOptionsResult<SearchSelectOption>> => {
				const { searchQuery } = params;

				// Ключ кеша включает пользователя (для персонализации)
				const cacheParams = {
					query: searchQuery,
					userId: currentUserId
				};

				// Проверяем кеш
				const cachedResult = cache.get(cacheParams);
				if (cachedResult) {
					console.log(`🎯 Advanced cache hit for user ${currentUserId}, query "${searchQuery}"`);
					return cachedResult;
				}

				console.log(`🔄 Loading data for user ${currentUserId}, query "${searchQuery}"`);

				// Имитируем персонализированные результаты
				const result = await mockLoadOptions(params);

				// Можно модифицировать результаты для разных пользователей
				const personalizedResult = {
					...result,
					options: result.options.map((option) => ({
						...option,
						label: `${option.label} (for ${currentUserId})`
					}))
				};

				// Сохраняем в кеш
				cache.set(cacheParams, personalizedResult);

				return personalizedResult;
			};
		}, [cache, currentUserId]);

		return (
			<div className="space-y-4">
				<AsyncSearchSelect
					loadOptions={loadOptionsWithAdvancedCache}
					loadMode="input"
					minInputLength={1}
					placeholder="Выберите пользователя (продвинутый кэш)"
					searchPlaceholder="Введите имя"
					inputHintText="Введите минимум 1 символ для поиска"
					loadingText="Ищем пользователей..."
					emptyText="Пользователи не найдены"
					errorText="Ошибка поиска"
				/>
				<div className="text-xs text-muted-foreground">
					💡 Кеш учитывает текущего пользователя: <code>{currentUserId}</code>
				</div>
			</div>
		);
	},
	parameters: {
		docs: {
			description: {
				story: `
Продвинутый пример кеширования с дополнительными параметрами.

**Особенности:**
- Кеш включает ID пользователя для персонализации
- TTL кеша: 5 минут
- Ключ кеша: \`{query, userId}\`
- Результаты модифицируются для разных пользователей

**Возможности:**
- Легко добавить фильтры, настройки, регион и другие параметры
- Разные стратегии кеширования для разных типов данных
- Инвалидация кеша при изменении контекста
				`
			}
		}
	}
};

export const WithSimpleCache: Story = {
	render: function WithSimpleCache() {
		// Простой Map для кеширования (без TTL)
		const cache = useMemo(() => new Map<string, LoadOptionsResult<SearchSelectOption>>(), []);

		// Простая логика кеширования с Map
		const loadOptionsWithSimpleCache = useMemo(() => {
			return async (params: LoadOptionsParams): Promise<LoadOptionsResult<SearchSelectOption>> => {
				const { searchQuery } = params;

				// Проверяем кеш
				if (cache.has(searchQuery)) {
					console.log(`📦 Simple cache hit for "${searchQuery}"`);
					return cache.get(searchQuery)!;
				}

				console.log(`⏳ Simple loading data for "${searchQuery}"`);
				// Загружаем данные
				const result = await mockLoadOptions(params);

				// Сохраняем в кеш
				cache.set(searchQuery, result);

				return result;
			};
		}, [cache]);

		const clearCache = () => {
			cache.clear();
			console.log("🗑️ Cache cleared");
		};

		return (
			<div className="space-y-4">
				<AsyncSearchSelect
					loadOptions={loadOptionsWithSimpleCache}
					loadMode="input"
					minInputLength={1}
					placeholder="Выберите пользователя (простой кэш)"
					searchPlaceholder="Введите имя"
					inputHintText="Введите минимум 1 символ для поиска"
					loadingText="Ищем пользователей..."
					emptyText="Пользователи не найдены"
					errorText="Ошибка поиска"
				/>
				<div className="space-y-2">
					<button className="rounded bg-gray-100 px-2 py-1 text-xs hover:bg-gray-200" onClick={clearCache}>
						Очистить кеш
					</button>
					<div className="text-xs text-muted-foreground">💡 Простое кеширование с помощью Map (без TTL)</div>
				</div>
			</div>
		);
	},
	parameters: {
		docs: {
			description: {
				story: `
Простейший пример кеширования с помощью \`Map\`.

**Особенности:**
- Использует обычный \`Map\` для кеширования
- Нет TTL - данные кешируются до очистки
- Ручная очистка кеша
- Минимальный код

**Когда использовать:**
- Простые случаи без сложной логики инвалидации
- Кратковременное кеширование в рамках сессии
- Быстрое прототипирование
				`
			}
		}
	}
};

// Функция для генерации элементов
const generateElements = (count: number): SearchSelectOption[] => {
	return Array.from({ length: count }, (_, index) => ({
		value: (index + 1).toString(),
		label: `Элемент ${index + 1}`
	}));
};

const allElements = generateElements(10000);

// Моковая функция загрузки для элементов
const mockLoadElements = async ({ searchQuery }: LoadOptionsParams): Promise<LoadOptionsResult<SearchSelectOption>> => {
	console.log("Mock load start", searchQuery);

	// Имитируем задержку сети
	// Уменьшаем задержку при увеличении длины запроса для тестирования
	const timeout = Math.max(0, (4 - searchQuery.length) * 500);
	await new Promise((resolve) => setTimeout(resolve, timeout));

	// Фильтруем по запросу и ограничиваем результат
	const filteredElements = allElements
		.filter((element) => element.label.toLowerCase().includes(searchQuery.toLowerCase()))
		.slice(0, 100); // Ограничиваем до 100 результатов

	console.log("Mock load end", searchQuery);
	return { options: filteredElements };
};

export const TestRaceCondition: Story = {
	args: {
		loadOptions: mockLoadElements,
		loadMode: "input",
		minInputLength: 1,
		debounceMs: 0,
		placeholder: "Выберите элемент",
		searchPlaceholder: "Найти элемент",
		inputHintText: "Введите минимум 1 символ для поиска",
		loadingText: "Загружаем элементы...",
		emptyText: "Элементы не найдены",
		errorText: "Ошибка загрузки элементов"
	},
	parameters: {
		docs: {
			description: {
				story: `
Демонстрация защиты от race conditions. 

**Особенности:**
- \`debounceMs: 0\` - отключен debounce для демонстрации проблемы
- Чем длиннее поисковый запрос, тем быстрее ответ от сервера
- При быстром вводе "abc" короткие запросы могут прийти позже длинных

**Как тестировать:**
1. Быстро введите "1234" 
2. Без защиты от race conditions результат может быть от запроса "1" или "12"
3. С защитой всегда показывается результат от последнего запроса "1234"

**Логика задержек:**
- "1" → 1500ms
- "12" → 1000ms  
- "123" → 500ms
- "1234" → 0ms
				`
			}
		}
	}
};

export const WithDisabledOptions: Story = {
	render: function WithDisabledOptions() {
		const mockLoadOptions = async ({ searchQuery }: LoadOptionsParams) => {
			await new Promise((resolve) => setTimeout(resolve, 300));

			const users = [
				{ name: "Иван Иванов", email: "ivan@example.com" },
				{ name: "Петр Петров", email: "petr@example.com" },
				{ name: "Мария Сидорова", email: "maria@example.com" },
				{ name: "Анна Козлова", email: "anna@example.com" }
			];

			const filtered = users.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()));

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
				<AsyncSearchSelect
					loadOptions={mockLoadOptions}
					placeholder="Выберите пользователя"
					searchPlaceholder="Поиск..."
				/>
			</div>
		);
	}
};

const mockLoadOptionsWithLongNames = async ({
	searchQuery
}: LoadOptionsParams): Promise<LoadOptionsResult<SearchSelectOption>> => {
	await new Promise((resolve) => setTimeout(resolve, 500));

	const longNameOptions = [
		{
			value: "1",
			label: "Очень длинное название пользователя которое точно не поместится в ограниченное пространство"
		},
		{ value: "2", label: "Еще одно невероятно длинное имя пользователя с множеством слов и символов" },
		{ value: "3", label: "Супер-длинное название которое демонстрирует работу TextOverflowTooltip компонента" },
		{ value: "4", label: "Максимально длинное имя пользователя для тестирования обрезки текста в селекте" },
		{ value: "5", label: "Исключительно длинное название которое показывает как работает тултип при переполнении" }
	];

	const filtered = longNameOptions.filter((option) => option.label.toLowerCase().includes(searchQuery.toLowerCase()));

	return { options: filtered };
};

export const WithTextOverflowTooltip: Story = {
	args: {
		loadOptions: mockLoadOptionsWithLongNames,
		loadMode: "auto",
		placeholder: "Выберите пользователя",
		searchPlaceholder: "Найти пользователя",
		loadingText: "Загружаем пользователей...",
		emptyText: "Пользователи не найдены",
		errorText: "Ошибка загрузки пользователей",
		renderOption: (data) => {
			const { option, type } = data;

			if (type === "trigger")
				return <TextOverflowTooltip className="flex-1 self-center pl-1.5">{option.label}</TextOverflowTooltip>;

			return (
				<div className={cn("flex w-[334px] items-center gap-2", !data.isSelected && "pl-6")}>
					{data.isSelected && <Icon icon={Check} />}
					<TextOverflowTooltip className="flex-1">{option.label}</TextOverflowTooltip>
				</div>
			);
		}
	}
};

export const WithClearButton: Story = {
	render: function WithClearButton() {
		const mockLoadOptions = async ({ searchQuery }: LoadOptionsParams) => {
			await new Promise((resolve) => setTimeout(resolve, 300));

			const users = [
				{ name: "Иван Иванов", email: "ivan@example.com" },
				{ name: "Петр Петров", email: "petr@example.com" },
				{ name: "Мария Сидорова", email: "maria@example.com" },
				{ name: "Анна Козлова", email: "anna@example.com" }
			];

			const filtered = users.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()));

			return {
				options: filtered.map((user) => ({
					value: user.email,
					label: user.name
				}))
			};
		};

		return (
			<div className="space-y-3">
				<AsyncSearchSelect
					loadOptions={mockLoadOptions}
					placeholder="Выберите пользователя"
					searchPlaceholder="Поиск..."
					onClear={() => {
						alert("Clear button clicked");
					}}
				/>
			</div>
		);
	}
};
