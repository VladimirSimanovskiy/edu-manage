import type { Meta, StoryObj } from "@storybook/react";
import { ImagePreview } from "./ImagePreview";
import { handleDownload } from "./utils";

const meta: Meta<typeof ImagePreview> = {
	component: ImagePreview,
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
type Story = StoryObj<typeof ImagePreview>;

export const Default: Story = {
	args: {
		size: "sm",
		readonly: false,
		error: false,
		url: "https://placehold.co/200x200/png",
		onClear: () => alert("Вызов метода очищения"),
		onRetry: () => alert("Повторная попытка загрузки"),
		onImageClick: () => alert("Вызов метода открытия изображения"),
		onDownload: (url) => handleDownload(url)
	}
};
