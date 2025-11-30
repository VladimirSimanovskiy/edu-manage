import { Meta, StoryObj } from "@storybook/react";
import { Prose } from "./Prose";

const meta: Meta<typeof Prose> = {
	component: Prose,
	parameters: {
		layout: "padded",
		controls: {
			exclude: ["children"]
		}
	},
	tags: ["autodocs"],
	argTypes: {
		asChild: {
			control: "boolean",
			description: "Использовать Slot для рендеринга дочернего компонента"
		}
	}
};

export default meta;
type Story = StoryObj<typeof Prose>;

export const TypographyShowcase: Story = {
	args: {},
	render: () => (
		<Prose>
			<h1>Заголовок первого уровня</h1>

			<h2>Заголовок второго уровня</h2>

			<h3>Заголовок третьего уровня</h3>

			<h4>Заголовок четвертого уровня</h4>

			<h5>Заголовок пятого уровня</h5>

			<h6>Заголовок шестого уровня</h6>

			<p>
				Это обычный параграф с <strong>жирным текстом</strong> и <em>курсивным текстом</em>. Также можно
				использовать <code>встроенный код</code> и <mark>выделенный текст</mark>.
			</p>

			<p>
				Это параграф с <a href="#">ссылкой</a> и <abbr title="HyperText Markup Language">аббревиатурой</abbr>.
			</p>

			<blockquote>
				Это цитата. Цитаты используются для выделения важных высказываний или выдержек из текста.
				<footer>— Автор цитаты</footer>
			</blockquote>

			<hr />

			<h2>Списки</h2>

			<h3>Нумерованный список</h3>
			<ol>
				<li>Первый элемент списка</li>
				<li>Второй элемент списка</li>
				<li>
					Третий элемент списка с вложенным списком:
					<ul>
						<li>Вложенный элемент 1</li>
						<li>Вложенный элемент 2</li>
					</ul>
				</li>
				<li>Четвертый элемент списка</li>
			</ol>

			<h3>Маркированный список</h3>
			<ul>
				<li>Первый элемент списка</li>
				<li>Второй элемент списка</li>
				<li>
					Третий элемент списка с вложенным списком:
					<ol>
						<li>Вложенный элемент 1</li>
						<li>Вложенный элемент 2</li>
					</ol>
				</li>
				<li>Четвертый элемент списка</li>
			</ul>

			<h2>Код и таблицы</h2>

			<h3>Блок кода</h3>
			<pre>
				<code>{`function helloWorld() {
  console.log("Hello, World!");
  return "Привет, Мир!";
}`}</code>
			</pre>

			<h3>Таблица</h3>
			<table>
				<thead>
					<tr>
						<th>Заголовок 1</th>
						<th>Заголовок 2</th>
						<th>Заголовок 3</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Ячейка 1-1</td>
						<td>Ячейка 1-2</td>
						<td>Ячейка 1-3</td>
					</tr>
					<tr>
						<td>Ячейка 2-1</td>
						<td>Ячейка 2-2</td>
						<td>Ячейка 2-3</td>
					</tr>
				</tbody>
			</table>

			<h2>Дополнительные элементы</h2>

			<p>
				<kbd>Ctrl</kbd> + <kbd>C</kbd> - сочетание клавиш для копирования
			</p>

			<p>
				<del>Зачеркнутый текст</del> и <ins>подчеркнутый текст</ins>
			</p>

			<p>
				<sub>Нижний индекс</sub> и <sup>верхний индекс</sup>
			</p>

			<figure>
				<img
					src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIFBsYWNlaG9sZGVyPC90ZXh0Pgo8L3N2Zz4K"
					alt="Пример изображения"
				/>
				<figcaption>Подпись к изображению</figcaption>
			</figure>

			<hr />

			<p>
				<small>Мелкий текст для сносок или дополнительных замечаний</small>
			</p>

			<p>
				Это первый дополнительный параграф с текстом. Он демонстрирует возможности компонента Prose для
				форматирования обычного текста. Здесь можно размещать любую информацию, которая требует типографического
				оформления.
			</p>

			<p>
				Второй параграф содержит более подробную информацию. Компонент Prose автоматически применяет
				согласованные стили ко всем текстовым элементам, обеспечивая единообразное отображение контента
				независимо от источника.
			</p>

			<p>
				Третий параграф завершает демонстрацию возможностей. Благодаря использованию плагина
				@tailwindcss/typography, компонент обеспечивает профессиональное типографическое оформление для статей,
				документации и любого HTML-контента.
			</p>
		</Prose>
	)
};
