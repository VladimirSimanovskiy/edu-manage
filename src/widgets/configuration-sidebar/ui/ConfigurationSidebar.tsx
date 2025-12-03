import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarSeparator,
	SidebarProvider,
	SidebarTrigger
} from "@/components/sidebar";
import { useLocation, useNavigate } from "react-router-dom";

export const DICTIONARY_NAV_ITEMS = [
	{ id: "rooms", label: "Кабинеты", href: "/configuration/rooms" },
	{ id: "teachers", label: "Учителя", href: "/configuration/teachers" },
	{ id: "subjects", label: "Предметы", href: "/configuration/subjects" }
] as const;

export type DictionaryId = (typeof DICTIONARY_NAV_ITEMS)[number]["id"];

export function useActiveDictionary(): DictionaryId | null {
	const location = useLocation();

	const active = DICTIONARY_NAV_ITEMS.find((item) => location.pathname.startsWith(item.href));
	return (active?.id as DictionaryId) ?? null;
}

export function ConfigurationSidebar() {
	const navigate = useNavigate();
	const activeId = useActiveDictionary();

	return (
		<>
			<SidebarProvider>
				<Sidebar className="pt-14">
					<SidebarContent>
						<SidebarHeader>Конфигурация</SidebarHeader>
						<SidebarSeparator />
						<SidebarGroup>
							<SidebarGroupLabel>Справочники</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu>
									{DICTIONARY_NAV_ITEMS.map((item) => (
										<SidebarMenuItem key={item.id}>
											<SidebarMenuButton
												isActive={activeId === item.id}
												onClick={() => {
													navigate(item.href);
												}}
											>
												<span>{item.label}</span>
											</SidebarMenuButton>
										</SidebarMenuItem>
									))}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					</SidebarContent>
				</Sidebar>
				<SidebarTrigger />
			</SidebarProvider>
		</>
	);
}
