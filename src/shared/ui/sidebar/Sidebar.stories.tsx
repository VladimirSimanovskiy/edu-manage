import { Collapsible } from "@radix-ui/react-collapsible";
import type { Meta, StoryObj } from "@storybook/react";
import {
	Bell,
	Book,
	Calendar,
	Check,
	ChevronDown,
	ChevronRight,
	ChevronUp,
	Folder,
	Globe,
	Home,
	Inbox,
	Keyboard,
	LifeBuoy,
	Link,
	Lock,
	Menu,
	MessageCircle,
	MoreHorizontal,
	Paintbrush,
	Plus,
	Rocket,
	Search,
	Send,
	Settings,
	User2,
	Video
} from "lucide-react";
import { useState } from "react";
import { Button } from "../button/button/Button";
import { CollapsibleContent, CollapsibleTrigger } from "../collapsible";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../dropdown";
import { Modal, ModalContent, ModalHeaderTemplate } from "../modal";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupAction,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSkeleton,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarProvider,
	SidebarRail,
	SidebarSeparator,
	SidebarTrigger
} from "./Sidebar";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from "../breadcrumb";

const meta = {
	component: Sidebar,
	parameters: {
		layout: "fullscreen"
	},
	tags: ["autodocs"]
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
	args: {},
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	render: (_) => {
		return (
			<SidebarProvider>
				<Sidebar>
					<SidebarHeader>APP</SidebarHeader>
					<SidebarSeparator />
					<SidebarContent>
						<SidebarGroup>
							<SidebarGroupLabel>Application</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu>
									<SidebarMenuItem>
										<SidebarMenuButton asChild>
											<a href="#">
												<Home />
												<span>Home</span>
											</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
									<SidebarMenuItem>
										<SidebarMenuButton asChild>
											<a href="#">
												<Inbox />
												<span>Inbox</span>
											</a>
										</SidebarMenuButton>
										<SidebarMenuBadge>24</SidebarMenuBadge>
									</SidebarMenuItem>
									<SidebarMenuItem>
										<SidebarMenuButton asChild>
											<a href="#">
												<Calendar />
												<span>Calendar</span>
											</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
									<SidebarMenuItem>
										<SidebarMenuButton asChild>
											<a href="#">
												<Search />
												<span>Search</span>
											</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
									<SidebarMenuItem>
										<SidebarMenuButton asChild>
											<a href="#">
												<Settings />
												<span>Settings</span>
											</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>

						<SidebarGroup>
							<SidebarGroupLabel> Docs</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu>
									<Collapsible defaultOpen className="group/sidebar-menu">
										<SidebarMenuItem>
											<CollapsibleTrigger asChild>
												<SidebarMenuButton isActive>
													<Book />
													<span>Getting started</span>
													<ChevronRight className="ml-auto transition-transform group-data-[state=open]/sidebar-menu:rotate-90" />
												</SidebarMenuButton>
											</CollapsibleTrigger>
											<CollapsibleContent>
												<SidebarMenuSub>
													<SidebarMenuSubItem>
														<SidebarMenuSubButton>
															<span>Installation</span>
														</SidebarMenuSubButton>
													</SidebarMenuSubItem>
													<SidebarMenuSubItem>
														<SidebarMenuSubButton isActive>
															<span>Configuration</span>
														</SidebarMenuSubButton>
													</SidebarMenuSubItem>
												</SidebarMenuSub>
											</CollapsibleContent>
										</SidebarMenuItem>
									</Collapsible>
									<Collapsible className="group/sidebar-menu">
										<SidebarMenuItem>
											<CollapsibleTrigger asChild>
												<SidebarMenuButton>
													<Rocket />
													<span>Build your app</span>
													<ChevronRight className="ml-auto transition-transform group-data-[state=open]/sidebar-menu:rotate-90" />
												</SidebarMenuButton>
											</CollapsibleTrigger>
											<CollapsibleContent>
												<SidebarMenuSub>
													<SidebarMenuSubItem>
														<SidebarMenuSubButton>
															<span>Routing</span>
														</SidebarMenuSubButton>
													</SidebarMenuSubItem>
													<SidebarMenuSubItem>
														<SidebarMenuSubButton>
															<span>Data Fetching</span>
														</SidebarMenuSubButton>
													</SidebarMenuSubItem>
													<SidebarMenuSubItem>
														<SidebarMenuSubButton>
															<span>Rendering</span>
														</SidebarMenuSubButton>
													</SidebarMenuSubItem>
													<SidebarMenuSubItem>
														<SidebarMenuSubButton>
															<span>Caching</span>
														</SidebarMenuSubButton>
													</SidebarMenuSubItem>
													<SidebarMenuSubItem>
														<SidebarMenuSubButton>
															<span>Styling</span>
														</SidebarMenuSubButton>
													</SidebarMenuSubItem>
													<SidebarMenuSubItem>
														<SidebarMenuSubButton>
															<span>Optimizing</span>
														</SidebarMenuSubButton>
													</SidebarMenuSubItem>
													<SidebarMenuSubItem>
														<SidebarMenuSubButton>
															<span>Configuring</span>
														</SidebarMenuSubButton>
													</SidebarMenuSubItem>
													<SidebarMenuSubItem>
														<SidebarMenuSubButton>
															<span>Testing</span>
														</SidebarMenuSubButton>
													</SidebarMenuSubItem>
													<SidebarMenuSubItem>
														<SidebarMenuSubButton>
															<span>Authentication</span>
														</SidebarMenuSubButton>
													</SidebarMenuSubItem>
												</SidebarMenuSub>
											</CollapsibleContent>
										</SidebarMenuItem>
									</Collapsible>
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>

						<SidebarGroup>
							<SidebarGroupLabel>Projects</SidebarGroupLabel>
							<SidebarGroupAction>
								<Plus /> <span className="sr-only">Add Project</span>
							</SidebarGroupAction>
							<SidebarGroupContent>
								<SidebarMenu>
									<SidebarMenuItem>
										<SidebarMenuButton>
											<Folder />
											<span>MDT</span>
										</SidebarMenuButton>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<SidebarMenuAction>
													<MoreHorizontal />
												</SidebarMenuAction>
											</DropdownMenuTrigger>
											<DropdownMenuContent side="right" align="start">
												<DropdownMenuItem>
													<span>Edit Project</span>
												</DropdownMenuItem>
												<DropdownMenuItem>
													<span>Delete Project</span>
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</SidebarMenuItem>
									<SidebarMenuItem>
										<SidebarMenuButton>
											<Folder />
											<span>Gramax</span>
										</SidebarMenuButton>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<SidebarMenuAction>
													<MoreHorizontal />
												</SidebarMenuAction>
											</DropdownMenuTrigger>
											<DropdownMenuContent side="right" align="start">
												<DropdownMenuItem>
													<span>Edit Project</span>
												</DropdownMenuItem>
												<DropdownMenuItem>
													<span>Delete Project</span>
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</SidebarMenuItem>
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>

						<SidebarGroup>
							<SidebarGroupLabel>Loading cloud projects...</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu>
									{Array.from({ length: 5 }).map((_, index) => (
										<SidebarMenuItem key={index}>
											<SidebarMenuSkeleton />
										</SidebarMenuItem>
									))}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
						<SidebarSeparator />
						<Collapsible defaultOpen className="group/collapsible">
							<SidebarGroup>
								<SidebarGroupLabel asChild>
									<CollapsibleTrigger>
										Help
										<ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
									</CollapsibleTrigger>
								</SidebarGroupLabel>
								<CollapsibleContent>
									<SidebarGroupContent>
										<SidebarMenu>
											<SidebarMenuItem>
												<SidebarMenuButton>
													<LifeBuoy />
													<span>Support</span>
												</SidebarMenuButton>
											</SidebarMenuItem>
											<SidebarMenuItem>
												<SidebarMenuButton>
													<Send />
													<span>Feedback</span>
												</SidebarMenuButton>
											</SidebarMenuItem>
										</SidebarMenu>
									</SidebarGroupContent>
								</CollapsibleContent>
							</SidebarGroup>
						</Collapsible>
					</SidebarContent>
					<SidebarSeparator />
					<SidebarFooter>
						<SidebarMenu>
							<SidebarMenuItem>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<SidebarMenuButton>
											<User2 /> Username
											<ChevronUp className="ml-auto" />
										</SidebarMenuButton>
									</DropdownMenuTrigger>
									<DropdownMenuContent side="top">
										<DropdownMenuItem>
											<span>Account</span>
										</DropdownMenuItem>
										<DropdownMenuItem>
											<span>Billing</span>
										</DropdownMenuItem>
										<DropdownMenuItem>
											<span>Sign out</span>
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarFooter>
					<SidebarRail />
				</Sidebar>
				<main>
					<SidebarTrigger />
				</main>
			</SidebarProvider>
		);
	}
};

const data = {
	nav: [
		{ name: "Notifications", icon: Bell },
		{ name: "Navigation", icon: Menu },
		{ name: "Home", icon: Home },
		{ name: "Appearance", icon: Paintbrush },
		{ name: "Messages & media", icon: MessageCircle },
		{ name: "Language & region", icon: Globe },
		{ name: "Accessibility", icon: Keyboard },
		{ name: "Mark as read", icon: Check },
		{ name: "Audio & video", icon: Video },
		{ name: "Connected accounts", icon: Link },
		{ name: "Privacy & visibility", icon: Lock },
		{ name: "Advanced", icon: Settings },
		{ name: "Security", icon: Lock },
		{ name: "Backup & restore", icon: Settings },
		{ name: "Import & export", icon: Link },
		{ name: "Developer tools", icon: Settings },
		{ name: "Extensions", icon: Paintbrush },
		{ name: "Keyboard shortcuts", icon: Keyboard },
		{ name: "Search settings", icon: Menu },
		{ name: "User management", icon: Home },
		{ name: "Team settings", icon: MessageCircle },
		{ name: "Billing", icon: Bell },
		{ name: "Support", icon: Check },
		{ name: "About", icon: Globe },
		{ name: "Updates", icon: Video },
		{ name: "Feedback", icon: MessageCircle },
		{ name: "Log out", icon: Lock }
	]
};

export const InModal: Story = {
	args: {},
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	render: (_) => {
		const SidebarInModalComponent = () => {
			const [open, setOpen] = useState(false);

			return (
				<>
					<Button onClick={() => setOpen(true)} variant="primary" className="mb-4">
						Открыть Sidebar в модальном окне
					</Button>
					<Modal open={open} onOpenChange={setOpen}>
						<ModalContent className="h-[500px] overflow-hidden p-0 md:max-w-[700px] lg:max-w-[800px]">
							<ModalHeaderTemplate
								title="Настройки пространства"
								description="Задайте параметры пространства и его отображение"
								icon={Settings}
							/>

							<SidebarProvider>
								<Sidebar collapsible="none">
									<SidebarContent>
										<SidebarGroup>
											<SidebarGroupContent>
												<SidebarMenu>
													{data.nav.map((item) => (
														<SidebarMenuItem key={item.name}>
															<SidebarMenuButton
																isActive={item.name === "Messages & media"}
															>
																<item.icon />
																<span>{item.name}</span>
															</SidebarMenuButton>
														</SidebarMenuItem>
													))}
												</SidebarMenu>
											</SidebarGroupContent>
										</SidebarGroup>
									</SidebarContent>
								</Sidebar>

								<main className="flex flex-1 flex-col overflow-hidden p-4 pr-0">
									<Breadcrumb>
										<BreadcrumbList>
											<BreadcrumbItem>
												<BreadcrumbLink href="/">Messages & media</BreadcrumbLink>
											</BreadcrumbItem>
											<BreadcrumbSeparator>
												<span className="text-muted">/</span>
											</BreadcrumbSeparator>
											<BreadcrumbItem>
												<BreadcrumbPage>Images</BreadcrumbPage>
											</BreadcrumbItem>
										</BreadcrumbList>
									</Breadcrumb>

									<div className="mt-2 flex max-h-[400px] flex-1 flex-col gap-4 overflow-y-auto pr-4">
										<div className="space-y-4">
											{Array.from({ length: 5 }).map((_, i) => (
												<div
													key={i}
													className="aspect-video max-w-3xl rounded-xl bg-muted/50"
												/>
											))}
										</div>
									</div>
								</main>
							</SidebarProvider>
						</ModalContent>
					</Modal>
				</>
			);
		};

		return <SidebarInModalComponent />;
	}
};
