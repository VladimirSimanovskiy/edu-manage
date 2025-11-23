import { Meta, StoryObj } from "@storybook/react";
import { FileUploadInlineDropArea } from "./FileUploadInlineDropArea";

const meta = {
	component: FileUploadInlineDropArea,
	parameters: {
		layout: "centered"
	},
	tags: ["autodocs"]
} satisfies Meta<typeof FileUploadInlineDropArea>;

export default meta;
type Story = StoryObj<typeof FileUploadInlineDropArea>;

export const Default: Story = {
	args: {
		title: "Upload files",
		description: (
			<>
				<span>∙</span>
				<span>Up to 100MB</span>
			</>
		)
	}
};
