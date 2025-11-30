import React, { useRef } from "react";
import { tv } from "tailwind-variants";
import { useMergeRefs } from "@/shared/hooks/useMergeRefs";
import { useCustomValidity } from "../../../hooks/useCustomValidity";
import { inputBaseControlStyles } from "../../input/styles/inputBaseStyles";
import { VariantsConfig } from "@/lib/utils/variants";

export interface TextareaVariants {
	resize?: "none" | "vertical" | "horizontal" | "both";
}

const textareaStyles = tv({
	extend: inputBaseControlStyles,
	base: "min-h-14",
	variants: {
		resize: {
			none: "resize-none",
			vertical: "resize-y",
			horizontal: "resize-x",
			both: "resize"
		}
	} satisfies VariantsConfig<TextareaVariants>,
	defaultVariants: {
		resize: "vertical"
	}
});

export type TextareaProps = React.ComponentProps<"textarea"> &
	TextareaVariants & {
		/** Текст сообщения об ошибке. При наличии делает поле невалидным */
		error?: string;
	};

/**
 * Стилизованный компонент textarea для многострочного ввода текста.
 * Поддерживает все стандартные свойства textarea элемента.
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, error, resize, ...other }, ref) => {
		const textareaRef = useRef<HTMLTextAreaElement>(null);
		const mergedRef = useMergeRefs(textareaRef, ref);

		useCustomValidity(textareaRef, error);

		return (
			<textarea
				className={textareaStyles({ resize, className })}
				ref={mergedRef}
				aria-invalid={!!error}
				{...other}
			/>
		);
	}
);

Textarea.displayName = "Textarea";

export default Textarea;
