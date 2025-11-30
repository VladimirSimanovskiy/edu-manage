import type { Meta, StoryObj } from "@storybook/react";
import { Shortcut } from "./Shortcut";

const meta = {
	component: Shortcut,
	parameters: {
		layout: "centered"
	},
	argTypes: {
		variant: {
			control: "select",
			options: ["default", "ghost"]
		}
	},
	tags: ["autodocs"]
} satisfies Meta<typeof Shortcut>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "⌘"
	}
};

export const Showcase: Story = {
	render: () => (
		<div className="space-y-4">
			<div>
				<h3 className="mb-2 text-sm font-medium">macOS шорткаты</h3>
				<div className="flex flex-wrap gap-2">
					<Shortcut>⌘</Shortcut>
					<Shortcut>⌘K</Shortcut>
					<Shortcut>⌘⇧P</Shortcut>
					<Shortcut>⌥⌘I</Shortcut>
					<Shortcut>⌃⇧`</Shortcut>
				</div>
			</div>

			<div>
				<h3 className="mb-2 text-sm font-medium">Windows/Linux шорткаты</h3>
				<div className="flex flex-wrap gap-2">
					<Shortcut>Ctrl</Shortcut>
					<Shortcut>Ctrl K</Shortcut>
					<Shortcut>Ctrl Shift P</Shortcut>
					<Shortcut>Ctrl Alt I</Shortcut>
					<Shortcut>Alt Tab</Shortcut>
				</div>
			</div>

			<div>
				<h3 className="mb-2 text-sm font-medium">Общие клавиши</h3>
				<div className="flex flex-wrap gap-2">
					<Shortcut>↩</Shortcut>
					<Shortcut>⌫</Shortcut>
					<Shortcut>⇥</Shortcut>
					<Shortcut>Esc</Shortcut>
					<Shortcut>F5</Shortcut>
				</div>
			</div>

			<div>
				<h3 className="mb-2 text-sm font-medium">Текстовые метки</h3>
				<div className="flex flex-wrap gap-2">
					<Shortcut>Copy</Shortcut>
					<Shortcut>Paste</Shortcut>
					<Shortcut>Save</Shortcut>
					<Shortcut>Undo</Shortcut>
				</div>
			</div>
		</div>
	)
};
