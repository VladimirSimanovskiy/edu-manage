import type { Meta, StoryObj } from "@storybook/react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "./Collapsible";

const meta: Meta<typeof Collapsible> = {
	component: Collapsible,
	parameters: {
		layout: "fullscreen"
	},
	tags: ["autodocs"]
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
	render: () => (
		<Collapsible className="w-full p-4">
			<CollapsibleTrigger>Что такое компонент Collapsible?</CollapsibleTrigger>
			<CollapsibleContent>
				Это компонент для создания раскрывающихся секций контента. Пользователи могут нажать на триггер, чтобы
				показать или скрыть содержимое. Полезен для FAQ, меню навигации и других интерактивных элементов.
			</CollapsibleContent>
		</Collapsible>
	)
};
