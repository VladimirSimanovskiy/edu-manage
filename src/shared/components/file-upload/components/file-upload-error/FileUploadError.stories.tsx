import { Meta, StoryObj } from "@storybook/react";
import { FileUploadError } from "./FileUploadError";

const meta = {
	component: FileUploadError,
	parameters: {
		layout: "centered"
	},
	tags: ["autodocs"]
} satisfies Meta<typeof FileUploadError>;

export default meta;
type Story = StoryObj<typeof FileUploadError>;

export const Default: Story = {
	args: {
		error: "File is too large"
	}
};
