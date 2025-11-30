import * as React from "react";
import {
	useFormContext,
	type FieldPath,
	type FieldValues,
	type ControllerRenderProps,
	type UseFormStateReturn,
	type ControllerFieldState,
	Path
} from "react-hook-form";
import { FormFieldControl, FormItem, FormControl } from "../../Form";
import { Field, FieldLayout } from "@/components/field/Field";
import { tv } from "tailwind-variants";

const formFieldStyles = tv({
	slots: {
		label: "w-44"
	}
});

export type FormFieldControlRenderer<TFieldValues extends FieldValues = FieldValues> = (props: {
	field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>;
	fieldState: ControllerFieldState;
	formState: UseFormStateReturn<TFieldValues>;
	readonly?: boolean;
}) => React.ReactNode;

export interface FormFieldProps<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
	/** Имя поля формы */
	name: TName;
	/** Заголовок поля (лейбл) */
	title: string;
	/** Описание поля */
	description?: string;
	/** Функция рендеринга контрола */
	control: FormFieldControlRenderer<TFieldValues>;
	/** Является ли поле обязательным */
	required?: boolean;
	/** Дополнительные классы */
	className?: string;
	/** Классы для лейбла */
	labelClassName?: string;
	/** Поле только для чтения */
	readonly?: boolean;
	/** Вариант расположения элементов поля */
	layout?: FieldLayout;
}

/**
 * Компонент FormField объединяет несколько компонентов формы в один блок
 * для упрощения создания консистентных форм.
 *
 * ### Варианты раскладки (layout):
 *
 * - **responsive** (по умолчанию): адаптивная раскладка с mobile-first подходом.
 *   На мобильных устройствах - вертикальный лейаут, на десктопе (от lg breakpoint) - горизонтальный.
 *
 * - **horizontal**: принудительно горизонтальная раскладка на всех экранах.
 *   Лейбл располагается слева от поля ввода.
 *
 * - **vertical**: принудительно вертикальная раскладка на всех экранах.
 *   Лейбл располагается над полем ввода.
 *
 * Компонент обеспечивает согласованное расположение элементов формы,
 * включая лейбл, поле ввода, подсказку и сообщение об ошибке.
 *
 * @example
 * <FormField
 *   name="username"
 *   title="Имя пользователя"
 *   description="Ваше публичное имя пользователя"
 *   required
 *   control={({ field }) => (
 *     <TextInput
 *       placeholder="Введите имя пользователя"
 *       startIcon={<Icon icon={User} />}
 *       {...field}
 *     />
 *   )}
 * />
 */

export function FormField<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
	name,
	title,
	description,
	control,
	required,
	className,
	labelClassName,
	readonly,
	layout = "responsive"
}: FormFieldProps<TFieldValues, TName>) {
	const form = useFormContext<TFieldValues>();
	const styles = formFieldStyles();

	return (
		<FormFieldControl
			control={form.control}
			name={name}
			render={({ field, fieldState, formState }) => {
				return (
					<FormItem>
						<Field
							title={title}
							description={description}
							required={required}
							error={fieldState.error?.message}
							labelClassName={styles.label({ className: labelClassName })}
							className={className}
							readonly={readonly}
							layout={layout}
							control={({ id, readonly }) => (
								<FormControl id={id}>{control({ field, fieldState, formState, readonly })}</FormControl>
							)}
						/>
					</FormItem>
				);
			}}
		/>
	);
}
