import { Meta, StoryObj } from "@storybook/react";
import { FileUploadIcon } from "./FileUploadIcon";

const meta = {
	component: FileUploadIcon,
	parameters: {
		layout: "centered"
	},
	tags: ["autodocs"]
} satisfies Meta<typeof FileUploadIcon>;

export default meta;
type Story = StoryObj<typeof FileUploadIcon>;

export const Default: Story = {
	args: {
		file: {
			name: "document.pdf",
			size: 528737,
			type: "application/pdf",
			id: "document.pdf-1744638436563-8u5xuls"
		}
	}
};

export const Xlsx: Story = {
	args: {
		file: {
			name: "conclusion.xlsx",
			size: 352873,
			type: "application/xlsx",
			id: "conclusion.xlsx-1744638436563-8u5xuls"
		}
	}
};
