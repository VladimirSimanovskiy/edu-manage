import { Meta, StoryObj } from "@storybook/react";
import { FileUploadItem } from "./FileUploadItem";

const meta = {
	component: FileUploadItem,
	parameters: {
		layout: "centered"
	},
	tags: ["autodocs"]
} satisfies Meta<typeof FileUploadItem>;

export default meta;
type Story = StoryObj<typeof FileUploadItem>;

export const Default: Story = {
	args: {
		file: {
			name: "document.pdf",
			size: 528737,
			type: "application/pdf",
			id: "document.pdf-1744638436563-8u5xuls"
		},
		className: "w-[400px]",
		onClear: () => console.log("clear")
	}
};

export const Xlsx: Story = {
	args: {
		file: {
			name: "conclusion.xlsx",
			size: 352873,
			type: "application/xlsx",
			id: "conclusion.xlsx-1744638436563-8u5xuls"
		},
		className: "w-[400px]",
		onClear: () => console.log("clear")
	}
};
