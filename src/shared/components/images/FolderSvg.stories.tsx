import { StoryObj } from "@storybook/react";
import { FolderSvg } from "./FolderSvg";

const meta = {
	component: FolderSvg,
	parameters: {
		layout: "centered"
	}
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {}
};
