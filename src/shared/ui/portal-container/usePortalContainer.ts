import { useCallback, useEffect, useState } from "react";
import { isScopedStylesEnabled } from "@/lib/utils/styles";
import { portalContainerEvents } from "./portalContainerEvents";

/**
 * Хук для определения контейнера портала.
 *
 * Если передан customContainer, возвращает его.
 * Иначе проверяет наличие изолированных стилей и ищет элемент с атрибутом 'data-portal-container'.
 *
 * @param customContainer - Кастомный контейнер для портала
 * @returns HTMLElement для портала или undefined
 */
export const usePortalContainer = (customContainer?: HTMLElement | null) => {
	const [isMounted, setIsMounted] = useState(portalContainerEvents.isContainerMounted);

	useEffect(() => {
		// Подписываемся на события монтирования/размонтирования PortalContainer
		const unsubscribe = portalContainerEvents.subscribe((mount) => {
			setIsMounted(mount);
		});
		return unsubscribe;
	}, []);

	const findPortalContainer = useCallback((): HTMLElement | undefined => {
		if (customContainer !== undefined) {
			return customContainer || undefined;
		}
		if (!isScopedStylesEnabled()) return undefined;
		if (isMounted === false) return undefined;

		const portalContainer = document.querySelector("[data-portal-container]") as HTMLElement;
		return portalContainer || undefined;
	}, [customContainer, isMounted]);

	return findPortalContainer();
};
