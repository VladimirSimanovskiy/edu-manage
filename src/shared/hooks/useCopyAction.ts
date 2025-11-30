import { useCallback, useEffect, useState } from "react";

/**
 * Хук для копирования содержимого в буфер обмена
 */
export function useCopyAction() {
	const [hasCopied, setHasCopied] = useState(false);

	// Эффект для сброса статуса копирования
	useEffect(() => {
		if (!hasCopied) return;
		const timeout = setTimeout(() => {
			setHasCopied(false);
		}, 2000);
		return () => clearTimeout(timeout);
	}, [hasCopied]);

	const handleCopy = useCallback((value: string) => {
		if (value) {
			navigator.clipboard.writeText(value);
			setHasCopied(true);
		}
	}, []);

	return {
		hasCopied,
		handleCopy
	};
}


