import { useCallback, useEffect, useRef, useState } from "react";

export type LoadingState = "idle" | "loading" | "success" | "error";

export interface LoadOptionsParams {
	searchQuery: string;
	signal?: AbortSignal;
}

export interface LoadOptionsResult<T> {
	options: T[];
}

interface UseAsyncDataLoaderOptions<T> {
	/** Функция загрузки данных */
	loadOptions: (params: LoadOptionsParams) => Promise<LoadOptionsResult<T>>;
}

interface UseAsyncDataLoaderReturn<T> {
	/** Текущие загруженные элементы */
	options: T[];
	/** Состояние загрузки */
	loadingState: LoadingState;
	/** Текст ошибки, если загрузка не удалась */
	error: string | null;
	/** Функция загрузки данных */
	loadData: (query: string) => Promise<void>;
	/** Функция отмены текущих запросов */
	cancelRequests: () => void;
}

/**
 * Хук для асинхронной загрузки данных с защитой от race conditions
 *
 * Решает следующие проблемы:
 * - Race conditions при быстром вводе пользователя
 * - Мерцание интерфейса из-за множественных запросов
 * - Неправильный порядок получения ответов от сервера
 * - Обработка отмены запросов при размонтировании компонента
 *
 * @example
 * ```tsx
 * const { options, loadingState, loadData } = useAsyncDataLoader({
 *   loadOptions: async ({ searchQuery }) => {
 *     const response = await fetch(`/api/search?q=${searchQuery}`);
 *     return response.json();
 *   }
 * });
 *
 * // Загрузить данные
 * loadData("search query");
 * ```
 */
export const useAsyncDataLoader = <T>({ loadOptions }: UseAsyncDataLoaderOptions<T>): UseAsyncDataLoaderReturn<T> => {
	const [options, setItems] = useState<T[]>([]);
	const [loadingState, setLoadingState] = useState<LoadingState>("idle");
	const [error, setError] = useState<string | null>(null);

	// Refs для управления race conditions
	const abortControllerRef = useRef<AbortController | null>(null);
	const requestSequenceRef = useRef(0);

	// Функция для отмены предыдущих запросов
	const cancelRequests = useCallback(() => {
		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
		}
	}, []);

	// Основная функция загрузки данных
	const loadData = useCallback(
		async (query: string) => {
			// Отменяем предыдущие запросы
			cancelRequests();

			// Увеличиваем sequence для отслеживания порядка
			const currentSequence = ++requestSequenceRef.current;

			// Создаем новый AbortController
			const abortController = new AbortController();
			abortControllerRef.current = abortController;

			setLoadingState("loading");
			setError(null);

			try {
				const result = await loadOptions({
					searchQuery: query,
					signal: abortController.signal
				});

				// Проверяем, что запрос еще актуален
				if (currentSequence !== requestSequenceRef.current) return;

				setItems(result.options);
				setLoadingState("success");
			} catch (err) {
				// Игнорируем AbortError - это нормальная отмена
				if (err instanceof Error && err.name === "AbortError") return;
				if (currentSequence !== requestSequenceRef.current) return;

				setError(err instanceof Error ? err.message : "Неизвестная ошибка");
				setLoadingState("error");
			}
		},
		[loadOptions, cancelRequests]
	);

	// Cleanup при размонтировании компонента
	useEffect(() => {
		return () => cancelRequests();
	}, [cancelRequests]);

	return {
		options,
		loadingState,
		error,
		loadData,
		cancelRequests
	};
};
