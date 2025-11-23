/**
 * Простой fuzzy filter для поиска
 * Возвращает число от 0 до 3, где большее число означает лучшее совпадение
 */
export const defaultFuzzyFilter = (value: string, search: string): number => {
	if (!search.trim()) return 1; // Пустой поиск - показываем все

	const valueLower = value.toLowerCase().trim();
	const searchLower = search.toLowerCase().trim();

	// Точное совпадение с началом - наивысший приоритет
	if (valueLower.startsWith(searchLower)) return 3;

	// Содержит подстроку - высокий приоритет
	if (valueLower.includes(searchLower)) return 2;

	// Fuzzy match - проверяем, что все символы поиска есть в правильном порядке
	let searchIndex = 0;
	for (let i = 0; i < valueLower.length && searchIndex < searchLower.length; i++) {
		if (valueLower[i] === searchLower[searchIndex]) {
			searchIndex++;
		}
	}

	// Если нашли все символы поиска в правильном порядке - низкий приоритет
	return searchIndex === searchLower.length ? 1 : 0;
};

/**
 * Тип функции фильтрации
 */
export type FilterFunction = (value: string, search: string) => number;
