import { Meta, StoryObj } from "@storybook/react";
import { FileUploadItemCompact } from "./FileUploadItemCompact";

const meta = {
	component: FileUploadItemCompact,
	parameters: {
		layout: "centered"
	},
	tags: ["autodocs"]
} satisfies Meta<typeof FileUploadItemCompact>;

export default meta;
type Story = StoryObj<typeof FileUploadItemCompact>;

export const Default: Story = {
	args: {
		file: {
			name: "document.pdf",
			size: 528737,
			type: "application/pdf",
			id: "document.pdf-1744638436563-8u5xuls"
		},
		onClear: () => console.log("clear"),
		className: "w-[400px]"
	}
};
