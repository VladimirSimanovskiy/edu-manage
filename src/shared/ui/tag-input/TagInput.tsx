import { SearchSelectTag } from "@/components/search-select/components/SearchSelectTag";
import { useControllableState } from "@/hooks/useControllableState";
import { useItemsKeyboardNavigation } from "@/hooks/useItemsKeyboardNavigation";
import React, { KeyboardEvent, useCallback, useRef, useState } from "react";
import { tv } from "tailwind-variants";
import { InputGroup, InputGroupInput, InputGroupContentEditable } from "../input";
import { selectTriggerStyles } from "../select/Select";

const tagInputStyles = tv({
	extend: selectTriggerStyles,
	base: "group/search-select-trigger flex h-auto min-h-10 flex-wrap items-center gap-1 !py-[0.3125rem] px-1.5 lg:h-auto lg:min-h-9 lg:px-1.5"
});

const inputStyles = tv({
	base: "min-w-28 rounded-none p-0 px-1.5 leading-6 read-only:w-0 read-only:min-w-0 lg:p-0 lg:px-1.5"
});

const editingDivStyles = tv({
	base: "p-0 px-1.5 outline-none lg:p-0 lg:px-1.5"
});

/**
 * Функция валидации тега по умолчанию
 */
const defaultValidateTag = (tag: string, allTags: string[], editingIndex?: number): boolean | string => {
	if (!tag.trim()) return "Тег не может быть пустым";

	if (editingIndex === undefined) {
		// Добавление нового тега
		if (allTags.includes(tag)) return "Такой тег уже существует";
	} else {
		// Редактирование существующего
		const otherTags = allTags.filter((_, i) => i !== editingIndex);
		if (otherTags.includes(tag)) return "Такой тег уже существует";
	}

	return true;
};

export interface TagInputProps {
	/** Текущие выбранные опции (controlled режим) */
	value?: string[];
	/** Опции по умолчанию (uncontrolled режим) */
	defaultValue?: string[];
	/** Callback при изменении выбранных опций */
	onChange?: (options: string[]) => void;
	/** Placeholder для input */
	placeholder?: string;
	/** Отключить компонент */
	readonly?: boolean;
	/** CSS класс для контейнера */
	className?: string;
	/** Функция валидации тега. Если null - валидация отключена, если не передана - используется валидация по умолчанию */
	validateTag?: ((tag: string, allTags: string[], editingIndex?: number) => boolean | string) | null;
	/** Состояние ошибки */
	invalid?: boolean;
}

/**
 * Компонент для ввода и отображения тегов
 */
export const TagInput = React.forwardRef<HTMLDivElement, TagInputProps>(
	(
		{
			value,
			defaultValue = [],
			onChange,
			placeholder = "Добавить тег...",
			readonly = false,
			className,
			validateTag,
			invalid
		},
		ref
	) => {
		// Состояние для ввода нового тега
		const [inputValue, setInputValue] = useState("");
		const inputRef = useRef<HTMLInputElement>(null);

		// Управление тегами
		const [tags = [], setTags] = useControllableState<string[]>({ value, defaultValue, onChange });

		const styles = tagInputStyles({ className, invalid });
		const removeTag = useCallback(
			(index: number) => {
				if (readonly) return;
				setTags(tags.filter((_, i) => i !== index));
			},
			[tags, setTags, readonly]
		);

		// Состояние для режима редактирования существующих тегов
		const [editingIndex, setEditingIndex] = useState<number | null>(null);
		const editingRef = useRef<HTMLDivElement>(null);

		/**
		 * Функция валидации тега
		 */
		const validateTagValue = useCallback(
			(tag: string, editingIndex?: number): boolean => {
				if (validateTag === null) return true;

				const validator = validateTag || defaultValidateTag;
				const result = validator(tag, tags, editingIndex);

				return result === true;
			},
			[validateTag, tags]
		);

		/**
		 * Переключение в режим редактирования существующего тега
		 */
		const startEditing = useCallback(
			(index: number) => {
				if (readonly) return;
				setEditingIndex(index);
				// Фокусируем элемент после обновления состояния
				setTimeout(() => {
					if (editingRef.current) {
						// Устанавливаем содержимое напрямую, без использования React state
						editingRef.current.textContent = tags[index];
						editingRef.current.focus();
						// Выделяем весь текст
						const range = document.createRange();
						range.selectNodeContents(editingRef.current);
						const selection = window.getSelection();
						selection?.removeAllRanges();
						selection?.addRange(range);
					}
				}, 0);
			},
			[tags, setEditingIndex, readonly]
		);

		/**
		 * Отмена редактирования тега
		 */
		const cancelEditing = useCallback(() => {
			setEditingIndex(null);
			setTimeout(() => inputRef.current?.focus(), 0);
		}, [setEditingIndex]);

		/**
		 * Обработчик нажатия Enter на теге: переключает текущий тег в режим редактирования
		 */
		const onEnter = useCallback((_: string, index: number) => startEditing(index), [startEditing]);

		const handleDeleteTag = useCallback((_: string, index: number) => removeTag(index), [removeTag]);

		/**
		 * Хук для навигации по тегам с помощью клавиатуры (вперед/назад)
		 */
		const { handleKeyDown: handleTagsKeyDown, isFocused } = useItemsKeyboardNavigation({
			items: tags,
			onEnter,
			onDelete: handleDeleteTag,
			cycleNavigation: true
		});

		/**
		 * Сохранение изменений в текущем теге
		 */
		const saveEditing = useCallback(() => {
			if (editingIndex !== null && editingRef.current) {
				const newValue = editingRef.current.textContent?.trim() || "";

				if (newValue && validateTagValue(newValue, editingIndex)) {
					const newTags = [...tags];
					newTags[editingIndex] = newValue;
					setTags(newTags);
					setEditingIndex(null);
					// Возвращаем фокус в input и устанавливаем фокус на отредактированный элемент
					setTimeout(() => inputRef.current?.focus(), 0);
				}
			}
		}, [editingIndex, editingRef, tags, setEditingIndex, setTags, validateTagValue]);

		/**
		 * Добавление нового тега
		 */
		const addNewTag = useCallback(
			(tagValue: string) => {
				const trimmedTag = tagValue.trim();
				if (trimmedTag && validateTagValue(trimmedTag)) {
					setTags([...tags, trimmedTag]);
					setInputValue("");
				}
			},
			[tags, setTags, setInputValue, validateTagValue]
		);

		/**
		 * Обработчик нажатия клавиш на input:
		 * - Если нажат Enter и input не пустой, добавляет новый тег
		 * - Если input пустой, обрабатывает навигацию по тегам
		 */
		const handleInputKeyDown = useCallback(
			(e: KeyboardEvent<HTMLInputElement>) => {
				if (e.key === "Enter" && inputValue.trim()) {
					e.preventDefault();
					addNewTag(inputValue);
					return;
				}
				if (!inputValue.trim()) {
					handleTagsKeyDown(e);
				}
			},
			[inputValue, handleTagsKeyDown, addNewTag]
		);

		/**
		 * Обработчик потери фокуса input - добавляет тег если он не пустой
		 */
		const handleInputBlur = useCallback(() => {
			if (inputValue.trim()) {
				addNewTag(inputValue);
			}
		}, [inputValue, addNewTag]);

		const handleEditingKeyDown = useCallback(
			(e: KeyboardEvent<HTMLDivElement>) => {
				if (e.key === "Enter") {
					e.preventDefault();
					saveEditing();
				} else if (e.key === "Escape") {
					e.preventDefault();
					cancelEditing();
				}
			},
			[saveEditing, cancelEditing]
		);

		const renderTags = useCallback(() => {
			return tags.map((tag, index) => {
				if (editingIndex === index) {
					return (
						<InputGroupContentEditable
							key={`editing-${index}`}
							ref={editingRef}
							className={editingDivStyles()}
							onKeyDown={handleEditingKeyDown}
							onBlur={cancelEditing}
						/>
					);
				}
				return (
					<SearchSelectTag
						key={index}
						onLabelClick={() => startEditing(index)}
						onClose={() => removeTag(index)}
						readonly={readonly}
						isFocused={!readonly && isFocused(index)}
					>
						{tag}
					</SearchSelectTag>
				);
			});
		}, [
			editingIndex,
			editingRef,
			handleEditingKeyDown,
			cancelEditing,
			tags,
			readonly,
			isFocused,
			removeTag,
			startEditing
		]);

		return (
			<InputGroup ref={ref} className={styles.base()}>
				{renderTags()}
				<InputGroupInput
					ref={inputRef}
					type="text"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyDown={handleInputKeyDown}
					onBlur={handleInputBlur}
					placeholder={readonly ? "" : placeholder}
					className={inputStyles()}
					readOnly={readonly}
					aria-invalid={invalid}
				/>
			</InputGroup>
		);
	}
);

TagInput.displayName = "TagInput";
