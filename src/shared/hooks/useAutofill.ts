import { useEffect, useRef, useState } from "react";

/**
 * Хук для определения состояния автозаполнения input'а
 */
export function useAutofill() {
	const [isAutofilled, setIsAutofilled] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const input = inputRef.current;
		if (!input) return;

		const checkAutofill = (element: Element): boolean => {
			try {
				return element.matches(":-webkit-autofill");
			} catch {
				return false;
			}
		};

		const updateAutofillState = () => {
			const autofilled = checkAutofill(input);
			setIsAutofilled(autofilled);
		};

		input.addEventListener("input", updateAutofillState);

		let intervalCounter = 0;
		const intervalTime = 25;
		// Максимальное время ожидания появления autofill, в ms
		const intervalTimeLimit = 1000;

		const interval = setInterval(() => {
			intervalCounter += intervalTime;
			if (intervalCounter > intervalTimeLimit) {
				clearInterval(interval);
				return;
			}

			if (checkAutofill(input)) {
				setIsAutofilled(true);
				clearInterval(interval);
			}
		}, intervalTime);

		updateAutofillState();

		return () => {
			clearInterval(interval);
			input.removeEventListener("input", updateAutofillState);
		};
	}, []);

	return {
		isAutofilled,
		inputRef
	};
}
