/**
 * Проверяет, подключены ли изолированные стили UI Kit.
 *
 * Проверяет наличие CSS-переменной --ui-kit-scoped-styles,
 * которая устанавливается в styles-scoped.css
 *
 * @returns true если изолированные стили подключены, иначе false
 */
export const isScopedStylesEnabled = (): boolean => {
	try {
		const scopedStylesValue = getComputedStyle(document.documentElement)
			.getPropertyValue("--ui-kit-scoped-styles")
			.trim();

		return scopedStylesValue === '"enabled"';
	} catch {
		// Если getComputedStyle недоступен (например, в SSR)
		return false;
	}
};


