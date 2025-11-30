import { useEffect, RefObject } from "react";

/**
 * Хук для установки кастомного сообщения об ошибке валидации на HTML элементе.
 * Автоматически управляет состоянием валидности элемента на основе переданной ошибки.
 *
 * @param elementRef - Ref к HTML элементу, поддерживающему валидацию (input, textarea, select)
 * @param error - Текст ошибки. При наличии делает элемент невалидным, при отсутствии - валидным
 */
export function useCustomValidity<T extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
	elementRef: RefObject<T>,
	error?: string
) {
	useEffect(() => {
		const element = elementRef.current;
		if (!element) return;

		if (error) {
			element.setCustomValidity(error);
		} else {
			element.setCustomValidity("");
		}
	}, [elementRef, error]);
}


