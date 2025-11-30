import React, { useEffect, useRef, useCallback } from "react";
import { tv } from "tailwind-variants";
import { useMergeRefs } from "@/shared/hooks/useMergeRefs";
import { useCustomValidity } from "../../../hooks/useCustomValidity";
import { inputBaseControlStyles } from "../../input/styles/inputBaseStyles";

const autogrowTextareaStyles = tv({
	extend: inputBaseControlStyles,
	base: "min-h-14 resize-none overflow-hidden"
});

export type AutogrowTextareaProps = React.ComponentProps<"textarea"> & {
	/** Текст сообщения об ошибке. При наличии делает поле невалидным */
	error?: string;
};

/**
 * Стилизованный компонент textarea с автоматическим увеличением высоты.
 */
export const AutogrowTextarea = React.forwardRef<HTMLTextAreaElement, AutogrowTextareaProps>(
	({ className, error, onChange, ...other }, ref) => {
		const textareaRef = useRef<HTMLTextAreaElement>(null);
		const mergedRef = useMergeRefs(textareaRef, ref);

		const adjustHeight = useCallback(() => {
			const textarea = textareaRef.current;
			if (!textarea) return;

			textarea.style.height = "auto";

			let newHeight = Math.max(textarea.scrollHeight, 56);
			let computedMaxHeight: number | undefined;

			// Пытаемся получить max-height из CSS
			const computedStyle = window.getComputedStyle(textarea);
			const cssMaxHeight = computedStyle.maxHeight;

			if (cssMaxHeight && cssMaxHeight !== "none") {
				// Парсим значение max-height из CSS (поддерживаем px, em, rem, vh и т.д.)
				const maxHeightValue = parseFloat(cssMaxHeight);
				if (!isNaN(maxHeightValue)) {
					computedMaxHeight = maxHeightValue;
				}
			}

			if (computedMaxHeight) {
				newHeight = Math.min(newHeight, computedMaxHeight);
				textarea.style.overflowY = newHeight === computedMaxHeight ? "auto" : "hidden";
			} else {
				textarea.style.overflowY = "hidden";
			}

			textarea.style.height = `${newHeight}px`;
		}, []);

		useCustomValidity(textareaRef, error);

		// Подстраиваем высоту при изменении содержимого
		useEffect(() => {
			adjustHeight();
		}, [adjustHeight, other.value, other.defaultValue]);

		const handleChange = useCallback(
			(e: React.ChangeEvent<HTMLTextAreaElement>) => {
				adjustHeight();
				onChange?.(e);
			},
			[adjustHeight, onChange]
		);

		// Подстраиваем высоту при первом рендере
		useEffect(() => {
			const timer = setTimeout(adjustHeight, 0);
			return () => clearTimeout(timer);
		}, [adjustHeight]);

		return (
			<textarea
				className={autogrowTextareaStyles({ className })}
				ref={mergedRef}
				aria-invalid={!!error}
				onChange={handleChange}
				{...other}
			/>
		);
	}
);

AutogrowTextarea.displayName = "AutogrowTextarea";

export default AutogrowTextarea;
