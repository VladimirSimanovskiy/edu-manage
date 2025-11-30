import type { Meta, StoryObj } from "@storybook/react";
import AutogrowTextarea from "./AutogrowTextarea";
import { withFixedWidth } from "../../../lib/utils/storybook";

const meta: Meta<typeof AutogrowTextarea> = {
	component: AutogrowTextarea,
	tags: ["autodocs"],
	decorators: [withFixedWidth("360px")],
	parameters: {
		layout: "centered"
	}
};

export default meta;
type Story = StoryObj<typeof AutogrowTextarea>;

export const Default: Story = {
	args: {
		placeholder: "Start typing and watch the textarea grow..."
	}
};

export const Playground: Story = {
	argTypes: {
		error: {
			control: "text",
			description: "Текст сообщения об ошибке. При наличии делает поле невалидным"
		}
	},
	args: {
		placeholder: "Start typing and watch the textarea grow...",
		defaultValue:
			"This textarea will automatically grow as you type more content.\n\nTry adding more lines to see how it expands!",
		disabled: false,
		readOnly: false,
		error: "",
		maxLength: 500,
		minLength: 10
	}
};

export const WithMaxHeight: Story = {
	name: "С ограничением высоты через CSS",
	render: () => (
		<div className="space-y-4">
			<div>
				<h3 className="mb-2 text-sm font-medium">Через inline стили (100px)</h3>
				<AutogrowTextarea
					style={{ maxHeight: "100px" }}
					placeholder="Высота ограничена 100px через style"
					defaultValue="Попробуйте ввести много текста, чтобы увидеть как появляется прокрутка при достижении максимальной высоты."
				/>
			</div>

			<div>
				<h3 className="mb-2 text-sm font-medium">Через Tailwind классы (max-h-32 = 128px)</h3>
				<AutogrowTextarea
					className="max-h-32"
					placeholder="Высота ограничена через Tailwind класс"
					defaultValue="Этот textarea использует Tailwind класс max-h-32 для ограничения высоты."
				/>
			</div>

			<div>
				<h3 className="mb-2 text-sm font-medium">Через CSS переменные</h3>
				<AutogrowTextarea
					style={{ maxHeight: "var(--textarea-height, 150px)" }}
					placeholder="Высота через CSS переменную"
					defaultValue="Использует CSS переменную --textarea-height с fallback на 150px."
				/>
			</div>
		</div>
	)
};

export const WithParentMaxHeight: Story = {
	name: "Наследование max-height от родителя",
	render: () => (
		<div className="space-y-4">
			<div>
				<h3 className="mb-2 text-sm font-medium">Родитель с max-height, textarea с inherit</h3>
				<div style={{ maxHeight: "180px" }}>
					<AutogrowTextarea
						style={{ maxHeight: "inherit" }}
						placeholder="Наследует max-height от родителя"
						defaultValue="Этот textarea наследует максимальную высоту от родительского элемента через inherit. Родитель имеет max-height: 180px."
					/>
				</div>
			</div>

			<div>
				<h3 className="mb-2 text-sm font-medium">Контейнер с ограничением и overflow</h3>
				<div className="max-h-40 rounded border border-gray-200 p-2">
					<AutogrowTextarea
						className="border-0 p-0 focus:ring-0"
						style={{ maxHeight: "inherit" }}
						placeholder="В контейнере с max-height"
						defaultValue="Textarea находится в контейнере с ограниченной высотой. При превышении лимита появляется прокрутка."
					/>
				</div>
			</div>
		</div>
	)
};

export const WithRelativeUnits: Story = {
	name: "Относительные единицы измерения",
	render: () => (
		<div className="space-y-4">
			<div>
				<h3 className="mb-2 text-sm font-medium">Viewport height (30vh)</h3>
				<AutogrowTextarea
					style={{ maxHeight: "30vh" }}
					placeholder="Высота относительно viewport"
					defaultValue="Максимальная высота составляет 30% от высоты окна браузера."
				/>
			</div>

			<div>
				<h3 className="mb-2 text-sm font-medium">Em единицы (10em)</h3>
				<AutogrowTextarea
					style={{ maxHeight: "10em" }}
					placeholder="Высота в em единицах"
					defaultValue="Максимальная высота задана в em единицах, что зависит от размера шрифта."
				/>
			</div>
		</div>
	)
};
