import type { Meta, StoryObj } from "@storybook/react";
import { ImageUploader } from "./ImageUploader";

const meta: Meta<typeof ImageUploader> = {
	component: ImageUploader,
	tags: ["autodocs"],
	parameters: {
		layout: "centered"
	},
	argTypes: {
		size: {
			control: "select",
			options: ["xs", "sm", "md", "lg", "xl"]
		}
	}
};

export default meta;
type Story = StoryObj<typeof ImageUploader>;

export const Default: Story = {
	args: {
		size: "sm",
		readonly: false,
		error: false,
		onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
			alert(`Добавлен файл - ${event.target.files?.[0].name}`)
	}
};
