import type { Meta, StoryObj } from "@storybook/react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuCheckboxItem,
	DropdownMenuRadioItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuGroup,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuRadioGroup,
	DropdownMenuTriggerButton,
	DropdownMenuTrigger
} from "./Dropdown";
import { Button } from "@/components/button/button/Button";
import {
	User,
	Settings,
	LogOut,
	Plus,
	Github,
	LifeBuoy,
	Cloud,
	CreditCard,
	Keyboard,
	Users,
	UserPlus,
	Mail,
	MessageSquare,
	PlusCircle,
	Circle,
	ChevronDown,
	AlarmClock
} from "lucide-react";
import { useState } from "react";
import { Icon } from "../icon";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "../modal/Modal";
import { MenuItemRichTemplate } from "../menu-item";
import { ComponentVariantProvider } from "@/shared/providers/component-variant-context";

const meta: Meta<typeof DropdownMenu> = {
	title: "Components/Dropdown",
	component: DropdownMenu,
	parameters: {
		layout: "centered"
	},
	tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">Open</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem onSelect={() => alert("Profile")}>
					<Icon icon={User} />
					Profile
					<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuItem onSelect={() => alert("Billing")}>
					<Icon icon={CreditCard} />
					Billing
					<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuItem onSelect={() => alert("Settings")}>
					<Icon icon={Settings} />
					Settings
					<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuItem onSelect={() => alert("Keyboard shortcuts")}>
					<Icon icon={Keyboard} />
					Keyboard shortcuts
					<DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onSelect={() => alert("Team")}>
					<Icon icon={Users} />
					Team
				</DropdownMenuItem>
				<DropdownMenuItem onSelect={() => alert("Invite users")}>
					<Icon icon={UserPlus} />
					Invite users
					<DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onSelect={() => alert("GitHub")}>
					<Icon icon={Github} />
					GitHub
				</DropdownMenuItem>
				<DropdownMenuItem onSelect={() => alert("Support")}>
					<Icon icon={LifeBuoy} />
					Support
				</DropdownMenuItem>
				<DropdownMenuItem disabled>
					<Icon icon={Cloud} />
					API
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onSelect={() => alert("Log out")}>
					<Icon icon={LogOut} />
					Log out
					<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
};

export const FromFigma: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTriggerButton>
				Открыть меню
				<Icon icon={ChevronDown} />
			</DropdownMenuTriggerButton>
			<DropdownMenuContent>
				<DropdownMenuGroup>
					<DropdownMenuLabel>Heading title</DropdownMenuLabel>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<Icon icon={Circle} />
						Item 1<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Icon icon={Circle} />
						Item 2<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Icon icon={Circle} />
						Item 3<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<Icon icon={Circle} />
						Item 4
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Icon icon={Circle} />
						Item 5
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Icon icon={Circle} />
						Item 6
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
};

export const WithCheckboxItems: Story = {
	render: function WithCheckbox() {
		const [showStatusBar, setShowStatusBar] = useState(true);
		const [showPanel, setShowPanel] = useState(false);
		const [activityBarState, setActivityBarState] = useState(false);

		const handleActivityBar = () => {
			setActivityBarState((current) => !current);
		};

		return (
			<div>
				<DropdownMenu>
					<DropdownMenuTriggerButton>View Options</DropdownMenuTriggerButton>
					<DropdownMenuContent className="w-56">
						<DropdownMenuLabel>Appearance</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuCheckboxItem
							checked={showStatusBar}
							onCheckedChange={setShowStatusBar}
							onSelect={(e) => e.preventDefault()}
						>
							Status Bar
						</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem
							checked={activityBarState}
							onCheckedChange={handleActivityBar}
							onSelect={(e) => e.preventDefault()}
						>
							Activity Bar
						</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem
							checked={showPanel}
							onCheckedChange={setShowPanel}
							onSelect={(e) => e.preventDefault()}
						>
							Panel
						</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem checked={true} disabled>
							Toolbar
						</DropdownMenuCheckboxItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		);
	}
};

export const WithRadioGroup: Story = {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	render: function WithRadioGroup(_) {
		const [position, setPosition] = useState("bottom");
		return (
			<DropdownMenu>
				<DropdownMenuTriggerButton>Panel Position</DropdownMenuTriggerButton>
				<DropdownMenuContent className="w-56">
					<DropdownMenuLabel>Panel Position</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
						<DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		);
	}
};

export const WithRadioGroupCustomIndicator: Story = {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	render: function WithRadioGroupCustomIndicator(_) {
		const [position, setPosition] = useState("bottom");
		return (
			<DropdownMenu>
				<DropdownMenuTriggerButton>Panel Position</DropdownMenuTriggerButton>
				<DropdownMenuContent className="w-56">
					<DropdownMenuLabel>Panel Position</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuRadioGroup
						value={position}
						onValueChange={setPosition}
						indicatorIcon={Circle}
						indicatorIconClassName="text-primary-accent size-2 fill-current"
						indicatorIconPosition="end"
					>
						<DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		);
	}
};

export const WithSubmenus: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTriggerButton>More Options</DropdownMenuTriggerButton>
			<DropdownMenuContent className="w-56">
				<DropdownMenuItem>
					<Icon icon={Plus} />
					New
				</DropdownMenuItem>
				<DropdownMenuSub>
					<DropdownMenuSubTrigger>
						<Icon icon={UserPlus} />
						Invite users
					</DropdownMenuSubTrigger>
					<DropdownMenuSubContent>
						<DropdownMenuItem>
							<Icon icon={Mail} />
							Email
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Icon icon={MessageSquare} />
							Message
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<Icon icon={PlusCircle} />
							More...
						</DropdownMenuItem>
					</DropdownMenuSubContent>
				</DropdownMenuSub>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Icon icon={Settings} />
					Settings
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
};

export const WithGroups: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTriggerButton>Actions</DropdownMenuTriggerButton>
			<DropdownMenuContent className="w-56">
				<DropdownMenuGroup>
					<DropdownMenuLabel>Personal</DropdownMenuLabel>
					<DropdownMenuItem>
						<Icon icon={User} />
						Profile
						<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Icon icon={Settings} />
						Settings
						<DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuLabel>Team</DropdownMenuLabel>
					<DropdownMenuItem>
						<Icon icon={Users} />
						Team
					</DropdownMenuItem>
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>
							<Icon icon={UserPlus} />
							Invite users
						</DropdownMenuSubTrigger>
						<DropdownMenuSubContent>
							<DropdownMenuItem>
								<Icon icon={Mail} />
								Email
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Icon icon={MessageSquare} />
								Message
							</DropdownMenuItem>
						</DropdownMenuSubContent>
					</DropdownMenuSub>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Icon icon={LogOut} />
					Log out
					<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
};

export const FullExample: Story = {
	args: {},
	render: function FullExample(args) {
		const [option, setOption] = useState("1");
		const [showStatusBar, setShowStatusBar] = useState(true);
		const [showActivityBar, setShowActivityBar] = useState(false);
		const [showPanel, setShowPanel] = useState(false);

		return (
			<DropdownMenu {...args}>
				<DropdownMenuTriggerButton>Open Menu</DropdownMenuTriggerButton>
				<DropdownMenuContent className="w-56">
					<DropdownMenuLabel>Actions</DropdownMenuLabel>

					<DropdownMenuSeparator />

					<DropdownMenuItem onSelect={() => alert("Profile")}>
						<Icon icon={User} /> Profile
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Icon icon={Settings} />
						Settings
						<DropdownMenuShortcut>Ctrl+S</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem disabled>
						<Icon icon={AlarmClock} /> Notifications
					</DropdownMenuItem>
					<DropdownMenuItem inset>More...</DropdownMenuItem>

					<DropdownMenuSeparator />

					<DropdownMenuSub>
						<DropdownMenuSubTrigger inset>Radio</DropdownMenuSubTrigger>
						<DropdownMenuSubContent>
							<DropdownMenuRadioGroup
								value={option}
								onValueChange={setOption}
								onClick={(e) => e.stopPropagation()}
							>
								<DropdownMenuRadioItem value="1" onSelect={(e) => e.preventDefault()}>
									Item 1
								</DropdownMenuRadioItem>
								<DropdownMenuRadioItem value="2" onSelect={(e) => e.preventDefault()}>
									Item 2
								</DropdownMenuRadioItem>
								<DropdownMenuRadioItem value="3" disabled onSelect={(e) => e.preventDefault()}>
									Item 3
								</DropdownMenuRadioItem>
							</DropdownMenuRadioGroup>
						</DropdownMenuSubContent>
					</DropdownMenuSub>

					<DropdownMenuSub>
						<DropdownMenuSubTrigger inset>Select</DropdownMenuSubTrigger>
						<DropdownMenuSubContent>
							<DropdownMenuCheckboxItem
								checked={showStatusBar}
								onCheckedChange={setShowStatusBar}
								onSelect={(e) => e.preventDefault()}
							>
								Status Bar
							</DropdownMenuCheckboxItem>
							<DropdownMenuCheckboxItem
								checked={showActivityBar}
								onCheckedChange={setShowActivityBar}
								disabled
								onSelect={(e) => e.preventDefault()}
							>
								Activity Bar
							</DropdownMenuCheckboxItem>
							<DropdownMenuCheckboxItem
								checked={showPanel}
								onCheckedChange={setShowPanel}
								onSelect={(e) => e.preventDefault()}
							>
								Panel
							</DropdownMenuCheckboxItem>
						</DropdownMenuSubContent>
					</DropdownMenuSub>

					<DropdownMenuSeparator />

					<DropdownMenuItem>
						<Icon icon={LogOut} />
						Log out
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		);
	}
};

export const FullExampleInverse: Story = {
	args: {},
	render: function FullExample(args) {
		const [option, setOption] = useState("1");
		const [showStatusBar, setShowStatusBar] = useState(true);
		const [showPanel, setShowPanel] = useState(false);

		const [activityBarState, setActivityBarState] = useState<boolean | "indeterminate">("indeterminate");
		const handleActivityBarClick = () => {
			setActivityBarState((current) => {
				if (current === "indeterminate") return true;
				if (current === true) return false;
				return "indeterminate";
			});
		};

		return (
			<ComponentVariantProvider variant="inverse">
				<DropdownMenu {...args}>
					<DropdownMenuTriggerButton>Open Menu</DropdownMenuTriggerButton>
					<DropdownMenuContent className="w-56">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>

						<DropdownMenuSeparator />

						<DropdownMenuItem onSelect={() => alert("Profile")}>
							<Icon icon={User} /> Profile
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Icon icon={Settings} />
							Settings
							<DropdownMenuShortcut>Ctrl+S</DropdownMenuShortcut>
						</DropdownMenuItem>
						<DropdownMenuItem disabled>
							<Icon icon={AlarmClock} /> Notifications
						</DropdownMenuItem>
						<DropdownMenuItem inset>More...</DropdownMenuItem>

						<DropdownMenuSeparator />

						<DropdownMenuSub>
							<DropdownMenuSubTrigger inset>Radio</DropdownMenuSubTrigger>
							<DropdownMenuSubContent>
								<DropdownMenuRadioGroup
									value={option}
									onValueChange={setOption}
									onClick={(e) => e.stopPropagation()}
								>
									<DropdownMenuRadioItem value="1" onSelect={(e) => e.preventDefault()}>
										Item 1
									</DropdownMenuRadioItem>
									<DropdownMenuRadioItem value="2" onSelect={(e) => e.preventDefault()}>
										Item 2
									</DropdownMenuRadioItem>
									<DropdownMenuRadioItem value="3" disabled onSelect={(e) => e.preventDefault()}>
										Item 3
									</DropdownMenuRadioItem>
								</DropdownMenuRadioGroup>
							</DropdownMenuSubContent>
						</DropdownMenuSub>

						<DropdownMenuSub>
							<DropdownMenuSubTrigger inset>Select</DropdownMenuSubTrigger>
							<DropdownMenuSubContent>
								<DropdownMenuCheckboxItem
									checked={showStatusBar}
									onCheckedChange={setShowStatusBar}
									onSelect={(e) => e.preventDefault()}
								>
									Status Bar
								</DropdownMenuCheckboxItem>
								<DropdownMenuCheckboxItem
									checked={activityBarState}
									onCheckedChange={handleActivityBarClick}
									onSelect={(e) => e.preventDefault()}
								>
									Activity Bar
								</DropdownMenuCheckboxItem>
								<DropdownMenuCheckboxItem
									checked={showPanel}
									onCheckedChange={setShowPanel}
									onSelect={(e) => e.preventDefault()}
								>
									Panel
								</DropdownMenuCheckboxItem>
								<DropdownMenuCheckboxItem checked={true} disabled>
									Toolbar
								</DropdownMenuCheckboxItem>
							</DropdownMenuSubContent>
						</DropdownMenuSub>

						<DropdownMenuSeparator />

						<DropdownMenuItem>
							<Icon icon={LogOut} />
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</ComponentVariantProvider>
		);
	}
};

export const WithModal: Story = {
	render: () => {
		const WithModal = () => {
			const [isModalOpen, setIsModalOpen] = useState(false);

			return (
				<>
					<DropdownMenu>
						<DropdownMenuTriggerButton>Открыть меню</DropdownMenuTriggerButton>
						<DropdownMenuContent className="w-56">
							<DropdownMenuLabel>Действия</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem onSelect={() => setIsModalOpen(true)}>
								<Icon icon={Plus} />
								Открыть модалку сразу
							</DropdownMenuItem>
							<DropdownMenuItem onSelect={() => alert("Обычное действие")}>
								<Icon icon={Settings} />
								Обычное действие
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					<Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
						<ModalContent>
							<ModalHeader>
								<h2>Модальное окно</h2>
							</ModalHeader>
							<ModalBody>
								<p>Это модальное окно открылось сразу после клика на элемент dropdown.</p>
							</ModalBody>
							<ModalFooter>
								<Button variant="outline" onClick={() => setIsModalOpen(false)}>
									Закрыть
								</Button>
							</ModalFooter>
						</ModalContent>
					</Modal>
				</>
			);
		};
		return <WithModal />;
	}
};

export const WithCustomSubmenus: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTriggerButton>More Options</DropdownMenuTriggerButton>
			<DropdownMenuContent className="w-56">
				<DropdownMenuItem>
					<Icon icon={Plus} />
					New
				</DropdownMenuItem>
				<DropdownMenuSub>
					<DropdownMenuSubTrigger>
						<MenuItemRichTemplate icon={User} title="Invite users" description="Choose a method" />
					</DropdownMenuSubTrigger>
					<DropdownMenuSubContent>
						<DropdownMenuItem>
							<Icon icon={Mail} />
							Email
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Icon icon={MessageSquare} />
							Message
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<Icon icon={PlusCircle} />
							More...
						</DropdownMenuItem>
					</DropdownMenuSubContent>
				</DropdownMenuSub>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Icon icon={Settings} />
					Settings
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
};

export const WithCustomTrigger: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTriggerButton>Открыть</DropdownMenuTriggerButton>
			<DropdownMenuContent className="w-56">
				<DropdownMenuItem>
					<Icon icon={Plus} />
					New
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
};
