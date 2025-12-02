import { useState } from "react";

import { QueryClientProvider } from "@tanstack/react-query";

import { ConfigurationPage } from "../pages/configuration-page";
import { SchedulePage } from "../pages/schedule-page";
import { CurrentUser, type User, queryClient } from "../shared/api";
import { Header } from "../shared/ui/header";

const MAIN_NAV_ITEMS = [
	{ id: "schedule", label: "Расписание" },
	{ id: "configuration", label: "Конфигурация" }
] as const;

type MainPageId = (typeof MAIN_NAV_ITEMS)[number]["id"];

export function App() {
	const [activePageId, setActivePageId] = useState<MainPageId>("schedule");

	const currentUser: User = {
		id: "system",
		username: "System"
	};

	return (
		<QueryClientProvider client={queryClient}>
			<CurrentUser.Provider value={currentUser}>
				<div className="min-h-screen bg-background text-foreground">
					<Header
						navItems={MAIN_NAV_ITEMS}
						activeItemId={activePageId}
						onNavItemClick={(id) => setActivePageId(id as MainPageId)}
					/>

					<main className="px-8 py-6">
						{activePageId === "schedule" && <SchedulePage />}
						{activePageId === "configuration" && <ConfigurationPage />}
					</main>
				</div>
			</CurrentUser.Provider>
		</QueryClientProvider>
	);
}
