import { Button, IconButton } from "@/components/button";
import type { Meta, StoryObj } from "@storybook/react";
import { useMemo, useState } from "react";
import { DrawerBody } from "./components/drawer-body/DrawerBody";
import { DrawerContent } from "./components/drawer-content/DrawerContent";
import { Drawer, DrawerTrigger } from "./Drawer";
import { DrawerFooterTemplate } from "./templates/drawer-footer-template/DrawerFooterTemplate";
import { DrawerHeaderTemplate } from "./templates/drawer-header-template/DrawerHeaderTemplate";
import { selectTriggerStyles } from "../select/Select";
import { Check, ChevronDown, CircleX, GitBranch, Github, Gitlab, LucideIcon, Plus, Trash } from "lucide-react";
import { Icon } from "../icon";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "../command";
import { Checkbox } from "../checkbox";
import { MenuItemInfoTemplate, MenuItemInteractiveTemplate } from "../menu-item";
import { DrawerFooter } from "./components/drawer-footer/DrawerFooter";
import { withFixedWidth } from "../../lib/utils/storybook";

const meta: Meta<typeof Drawer> = {
	component: Drawer,
	parameters: {
		layout: "centered",
		viewport: {
			defaultViewport: "mobile"
		}
	},
	tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof Drawer>;

const BasicDrawerExample = () => {
	const [open, setOpen] = useState(false);

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button>Open Basic Drawer</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerBody>
					<div className="flex flex-col gap-2 p-4 text-sm text-primary">
						<p>
							Этот компонент может использоваться как замена диалогового окна на мобильных устройствах и
							планшетах.
						</p>
						<p>
							Этот пример демонстрирует самую простую настройку, которую можно сделать - просто выдвижную
							панель с триггером.
						</p>
					</div>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
};

export const Basic: Story = {
	render: () => <BasicDrawerExample />
};

interface TemplateDrawerExampleProps {
	title: string;
	description: string;
	primaryButton: string;
	secondaryButton: string;
	showHeader?: boolean;
	showBackButton?: boolean;
	showCloseButton?: boolean;
	showFooter?: boolean;
	position?: "vertical" | "horizontal";
	overlayBlur?: boolean;
	overlayType?: "default" | "gradient" | "transparent";
}

const TemplateDrawerExample = ({
	title,
	description,
	primaryButton,
	secondaryButton,
	position,
	showHeader = true,
	showBackButton,
	showCloseButton,
	showFooter = true,
	overlayBlur = false,
	overlayType = "default"
}: TemplateDrawerExampleProps) => {
	const [open, setOpen] = useState(false);
	const buttonProps = useMemo(() => ({ onClick: () => setOpen(false) }), [setOpen]);

	const header = showHeader ? (
		<DrawerHeaderTemplate
			title={title}
			description={description}
			showBackButton={showBackButton}
			showCloseButton={showCloseButton}
		/>
	) : undefined;

	const footer = showFooter ? (
		<DrawerFooterTemplate
			position={position}
			checkboxLabel="I agree to the terms and conditions"
			primaryButton={primaryButton}
			primaryButtonProps={buttonProps}
			secondaryButton={secondaryButton}
			secondaryButtonProps={buttonProps}
		/>
	) : undefined;

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button>Открыть Drawer</Button>
			</DrawerTrigger>
			<DrawerContent overlayBlur={overlayBlur} overlayType={overlayType}>
				{header}
				<DrawerBody>
					<div className="flex items-center justify-center rounded bg-primary-bg p-6">
						<svg className="h-8 w-8 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
					</div>
				</DrawerBody>
				{footer}
			</DrawerContent>
		</Drawer>
	);
};

export const TemplateDrawerPlayground: StoryObj<typeof TemplateDrawerExample> = {
	argTypes: {
		showBackButton: {
			control: "boolean"
		},
		overlayType: {
			control: "select",
			options: ["default", "gradient", "transparent"]
		},
		position: {
			control: "select",
			options: ["horizontal", "vertical"]
		},
		overlayBlur: {
			control: "boolean"
		}
	},
	parameters: {
		controls: {
			include: [
				"title",
				"description",
				"primaryButton",
				"secondaryButton",
				"showHeader",
				"showFooter",
				"showBackButton",
				"showCloseButton",
				"overlayBlur",
				"overlayType",
				"position"
			]
		}
	},
	args: {
		title: "Заголовок Drawer",
		description: "Описание для Drawer компонента",
		primaryButton: "Сохранить",
		secondaryButton: "Отмена",
		showHeader: true,
		showBackButton: true,
		showCloseButton: true,
		showFooter: true,
		overlayBlur: false,
		overlayType: "default",
		position: "horizontal"
	},
	render: (args) => <TemplateDrawerExample {...args} />
};

export const GramaxSimple: StoryObj = {
	decorators: [withFixedWidth("300px")],
	render: () => {
		type RepositoryItem = {
			id: string;
			name: string;
			icon: LucideIcon;
		};

		function GramaxSimple() {
			const [open, setOpen] = useState(false);
			const [selectedItem, setSelectedItem] = useState<RepositoryItem | null>(null);

			const repositoryItems: RepositoryItem[] = [
				{ id: "gitlab", name: "gitlab company", icon: Gitlab },
				{ id: "github", name: "github account", icon: Github },
				{ id: "git-self", name: "git-self hosted", icon: GitBranch }
			];

			const handleItemSelect = (item: RepositoryItem) => {
				setSelectedItem(item);
				setOpen(false);
			};

			const handleClear = (e: React.MouseEvent) => {
				e.stopPropagation();
				setSelectedItem(null);
			};

			return (
				<Drawer open={open} onOpenChange={setOpen}>
					<DrawerTrigger className={selectTriggerStyles().base()}>
						{selectedItem ? (
							<div className="flex w-full items-center gap-2">
								<Icon icon={selectedItem.icon} />
								<span>{selectedItem.name}</span>
								<IconButton icon={CircleX} onClick={handleClear} variant="text" className="ml-auto" />
							</div>
						) : (
							<span className="text-muted">Выберите хранилище</span>
						)}
						<Icon icon={ChevronDown} className={selectTriggerStyles().iconWrapper()} />
					</DrawerTrigger>
					<DrawerContent>
						<DrawerHeaderTemplate title="Хранилище" showBackButton={false} />
						<DrawerBody>
							<Command>
								<CommandInput wrapperClassName="sr-only" autoFocus />
								<CommandList>
									{repositoryItems.map((item) => (
										<CommandItem key={item.id} onSelect={() => handleItemSelect(item)}>
											<MenuItemInteractiveTemplate
												text={item.name}
												icon={item.icon}
												isSelected={selectedItem?.id === item.id}
												buttonIcon={Trash}
												buttonOnClick={(e) => {
													e.stopPropagation();
													alert(item.name);
												}}
											/>
										</CommandItem>
									))}
								</CommandList>
							</Command>
						</DrawerBody>
						<DrawerFooter className="py-3">
							<Button
								size="xl"
								startIcon={Plus}
								variant="outline"
								onClick={() => alert("Добавить хранилище")}
							>
								Добавить новое хранилище
							</Button>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			);
		}

		return <GramaxSimple />;
	}
};

export const GramaxSimpleSearch: StoryObj = {
	decorators: [withFixedWidth("300px")],
	render: () => {
		type RepositoryItem = {
			id: string;
			name: string;
		};

		function GramaxSimpleSearch() {
			const [open, setOpen] = useState(false);
			const [selectedItem, setSelectedItem] = useState<RepositoryItem | null>(null);

			const repositoryItems: RepositoryItem[] = Array.from({ length: 50 }, (_, index) => ({
				id: `item-${index + 1}`,
				name: `company-product/${index + 1}`
			}));

			const handleItemSelect = (item: RepositoryItem) => {
				setSelectedItem(item);
				setOpen(false);
			};

			const handleClear = (e: React.MouseEvent) => {
				e.stopPropagation();
				setSelectedItem(null);
			};

			return (
				<Drawer open={open} onOpenChange={setOpen}>
					<DrawerTrigger className={selectTriggerStyles().base()}>
						{selectedItem ? (
							<div className="flex w-full items-center gap-2">
								<span>{selectedItem.name}</span>
								<IconButton icon={CircleX} onClick={handleClear} variant="text" className="ml-auto" />
							</div>
						) : (
							<span className="text-muted">Выберите репозиторий</span>
						)}
						<Icon icon={ChevronDown} className={selectTriggerStyles().iconWrapper()} />
					</DrawerTrigger>
					<DrawerContent>
						<DrawerHeaderTemplate title="Репозиторий" showBackButton={false} />
						<DrawerBody>
							<Command>
								<CommandInput placeholder="Поиск..." autoFocus />
								<CommandList>
									{repositoryItems.map((item) => (
										<CommandItem key={item.id} onSelect={() => handleItemSelect(item)}>
											<MenuItemInfoTemplate
												text={item.name}
												description="1 час назад"
												isSelected={selectedItem?.id === item.id}
											/>
										</CommandItem>
									))}
									<CommandEmpty>Нет найденных значений</CommandEmpty>
								</CommandList>
							</Command>
						</DrawerBody>
					</DrawerContent>
				</Drawer>
			);
		}

		return <GramaxSimpleSearch />;
	}
};

export const QuizSimple: StoryObj = {
	decorators: [withFixedWidth("300px")],
	render: () => {
		type RepositoryItem = {
			id: string;
			name: string;
		};

		const repositoryItems: RepositoryItem[] = [
			{ id: "0", name: "Высшая" },
			{ id: "1", name: "Первая" },
			{ id: "2", name: "Вторая" }
		];

		function QuizSimple() {
			const [open, setOpen] = useState(false);
			const [selectedItem, setSelectedItem] = useState<RepositoryItem | null>(null);

			const handleItemSelect = (item: RepositoryItem) => {
				setSelectedItem(item);
				setOpen(false);
			};

			const handleClear = (e: React.MouseEvent) => {
				e.stopPropagation();
				setSelectedItem(null);
			};

			return (
				<Drawer open={open} onOpenChange={setOpen}>
					<DrawerTrigger className={selectTriggerStyles().base()}>
						{selectedItem ? (
							<div className="flex w-full items-center gap-2">
								<span>{selectedItem.name}</span>
								<IconButton icon={CircleX} onClick={handleClear} variant="text" className="ml-auto" />
							</div>
						) : (
							<span className="text-muted">Выберите категорию</span>
						)}
						<Icon icon={ChevronDown} className={selectTriggerStyles().iconWrapper()} />
					</DrawerTrigger>
					<DrawerContent>
						<DrawerHeaderTemplate title="Категория" showBackButton={false} />
						<DrawerBody>
							<Command>
								<CommandInput autoFocus wrapperClassName="sr-only" />
								<CommandList>
									{repositoryItems.map((item) => (
										<CommandItem key={item.id} onSelect={() => handleItemSelect(item)}>
											{item.name}
											{selectedItem?.id === item.id && <Icon icon={Check} className="ml-auto" />}
										</CommandItem>
									))}
									<CommandEmpty>Нет найденных значений</CommandEmpty>
								</CommandList>
							</Command>
						</DrawerBody>
					</DrawerContent>
				</Drawer>
			);
		}

		return <QuizSimple />;
	}
};

export const QuizCheckboxes: StoryObj = {
	decorators: [withFixedWidth("300px")],
	render: () => {
		type RepositoryItem = {
			id: string;
			name: string;
		};

		const repositoryItems: RepositoryItem[] = [
			{ id: "1", name: "Терапевт" },
			{ id: "2", name: "Педиатр" },
			{ id: "3", name: "Лор" }
		];

		function QuizCheckboxes() {
			const [open, setOpen] = useState(false);
			const [selectedItems, setSelectedItems] = useState<RepositoryItem[]>([]);

			const handleItemSelect = (item: RepositoryItem) => {
				setSelectedItems((prev) => {
					const isSelected = prev.some((selected) => selected.id === item.id);
					if (isSelected) {
						return prev.filter((selected) => selected.id !== item.id);
					} else {
						return [...prev, item];
					}
				});
			};

			const handleClear = (e: React.MouseEvent) => {
				e.stopPropagation();
				setSelectedItems([]);
			};

			const handleApply = () => {
				setOpen(false);
			};

			const selectedItemsText =
				selectedItems.length > 0 ? selectedItems.map((item) => item.name).join(", ") : "Выберите";

			return (
				<Drawer open={open} onOpenChange={setOpen}>
					<DrawerTrigger className={selectTriggerStyles().base()}>
						{selectedItems.length > 0 ? (
							<div className="flex w-full items-center gap-2">
								<span>{selectedItemsText}</span>
								<IconButton icon={CircleX} onClick={handleClear} variant="text" className="ml-auto" />
							</div>
						) : (
							<span className="text-muted">Выберите</span>
						)}
						<Icon icon={ChevronDown} className={selectTriggerStyles().iconWrapper()} />
					</DrawerTrigger>
					<DrawerContent>
						<DrawerHeaderTemplate title="Специальность по образованию" showBackButton={false} />
						<DrawerBody>
							<Command>
								<CommandInput autoFocus wrapperClassName="sr-only" />
								<CommandList>
									{repositoryItems.map((item) => (
										<CommandItem key={item.id} onSelect={() => handleItemSelect(item)}>
											<>
												<Checkbox
													checked={selectedItems.some((selected) => selected.id === item.id)}
												/>
												{item.name}
											</>
										</CommandItem>
									))}
									<CommandEmpty>Нет найденных значений</CommandEmpty>
								</CommandList>
							</Command>
						</DrawerBody>
						<DrawerFooterTemplate
							primaryButton="Применить"
							secondaryButton="Очистить"
							primaryButtonProps={{
								onClick: handleApply
							}}
							secondaryButtonProps={{
								onClick: handleClear,
								disabled: selectedItems.length === 0
							}}
						/>
					</DrawerContent>
				</Drawer>
			);
		}

		return <QuizCheckboxes />;
	}
};
