import type { Meta, StoryObj } from "@storybook/react";
import { TagInput } from "./TagInput";
import { withFixedWidth } from "@/lib/utils/storybook";

const meta: Meta<typeof TagInput> = {
	component: TagInput,
	decorators: [withFixedWidth("360px", "m-auto")],
	tags: ["autodocs"],
	argTypes: {
		value: {
			control: false,
			description: "Текущие выбранные опции (controlled режим)"
		},
		defaultValue: {
			control: "object",
			description: "Опции по умолчанию (uncontrolled режим)"
		},
		onChange: {
			action: "changed",
			description: "Callback при изменении выбранных опций"
		},
		placeholder: {
			control: "text",
			description: "Placeholder для input"
		},
		readonly: {
			control: "boolean",
			description: "Только для чтения"
		},
		invalid: {
			control: "boolean",
			description: "Состояние ошибки"
		}
	}
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		defaultValue: ["React", "TypeScript"]
	}
};

export const Readonly: Story = {
	args: {
		defaultValue: ["React", "TypeScript", "Vue", "Angular", "Svelte"],
		readonly: true
	}
};

export const Invalid: Story = {
	args: {
		defaultValue: ["React", "TypeScript"],
		placeholder: "Добавить тег...",
		invalid: true
	}
};
