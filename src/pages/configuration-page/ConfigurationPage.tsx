import { ConfigurationSidebar, DICTIONARY_NAV_ITEMS, useActiveDictionary } from "@/widgets/configuration-sidebar";
import { Route, Routes } from "react-router-dom";

function DictionariesPlaceholder() {
	const activeId = useActiveDictionary();

	if (!activeId) {
		return (
			<section className="flex h-full flex-col items-center justify-center gap-2 text-center text-secondary-fg">
				<p className="text-sm">Выберите справочник слева, чтобы начать работу с конфигурацией.</p>
			</section>
		);
	}

	return (
		<section className="space-y-2 p-4">
			<h2 className="text-xl font-semibold tracking-tight">
				{DICTIONARY_NAV_ITEMS.find((item) => item.id === activeId)?.label}
			</h2>
			<p className="text-sm text-secondary-fg">Здесь будет таблица и CRUD для выбранного справочника.</p>
		</section>
	);
}

export function ConfigurationPage() {
	return (
		<>
			<ConfigurationSidebar />
			<Routes>
				<Route path="/" element={<DictionariesPlaceholder />} />
				<Route path="rooms" element={<DictionariesPlaceholder />} />
				<Route path="teachers" element={<DictionariesPlaceholder />} />
				<Route path="subjects" element={<DictionariesPlaceholder />} />
			</Routes>
		</>
	);
}
