import { Meta, StoryObj } from "@storybook/react";
import { FileUploadDropArea } from "./FileUploadDropArea";

const meta = {
	component: FileUploadDropArea,
	parameters: {
		layout: "centered"
	},
	tags: ["autodocs"]
} satisfies Meta<typeof FileUploadDropArea>;

export default meta;
type Story = StoryObj<typeof FileUploadDropArea>;

export const Default: Story = {
	args: {
		title: "Upload files",
		description: "Drag & drop or click to browse",
		helpText: (
			<>
				<span>All files</span>
				<span className="font-thin">∙</span>
				<span>Max 10 files</span>
				<span className="font-thin">∙</span>
				<span>Up to Up to 100MB</span>
			</>
		)
	}
};
