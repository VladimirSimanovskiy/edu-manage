import { Meta, StoryObj } from "@storybook/react";
import { FileUploadDropAreaIcon } from "./FileUploadDropAreaIcon";
import { Upload } from "lucide-react";

const meta = {
	component: FileUploadDropAreaIcon,
	parameters: {
		layout: "centered"
	},
	tags: ["autodocs"]
} satisfies Meta<typeof FileUploadDropAreaIcon>;

export default meta;
type Story = StoryObj<typeof FileUploadDropAreaIcon>;

export const Default: Story = {
	args: {
		icon: Upload
	}
};
