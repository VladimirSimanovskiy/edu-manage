import { Meta, StoryObj } from "@storybook/react";
import { PageState } from "./PageState";
import { PageStateTitle } from "./components/PageStateTitle";
import { PageStateDescription } from "./components/PageStateDescription";
import { PageStateBoxSvg } from "./components/PageStateBoxSvg";
import { Plus, UploadCloud } from "lucide-react";
import { PageStateCancel } from "./components/PageStateCancel";
import { PageStateAction } from "./components/PageStateAction";
import { PageStateButtonGroup } from "./components/PageStateButtonGroup";
import { PageStateFolderSvg } from "./components/PageStateFolderSvg";
import { storyDecorator } from "@/lib/utils/storybook";

const meta: Meta<typeof PageState> = {
	component: PageState,
	parameters: {
		controls: { exclude: ["children"] },
		layout: "centered"
	},
	argTypes: {
		size: {
			control: { type: "select" },
			options: ["sm", "md", "lg"]
		}
	},
	decorators: [storyDecorator("max-w-[500px]")],
	args: {
		size: "md"
	},
	tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof PageState>;

export const Default: Story = {
	render: (args) => (
		<PageState {...args}>
			<PageStateBoxSvg icon={UploadCloud} />
			<PageStateTitle>Page State Title</PageStateTitle>
			<PageStateDescription>
				Add a brief, empathetic explanation that acknowledges the error while maintaining brand voice. Keep it
				light and helpful
			</PageStateDescription>
			<PageStateButtonGroup>
				<PageStateCancel>Secondary action</PageStateCancel>
				<PageStateAction>Primary action</PageStateAction>
			</PageStateButtonGroup>
		</PageState>
	)
};

export const WithoutFeatureIcon: Story = {
	render: (args) => (
		<PageState {...args}>
			<PageStateBoxSvg />
			<PageStateTitle>System State Title</PageStateTitle>
			<PageStateDescription>
				Add a brief, empathetic explanation that acknowledges the error while maintaining brand voice. Keep it
				light and helpful
			</PageStateDescription>
			<PageStateButtonGroup>
				<PageStateCancel>Secondary action</PageStateCancel>
				<PageStateAction>Primary action</PageStateAction>
			</PageStateButtonGroup>
		</PageState>
	)
};

export const FolderIllustration: Story = {
	render: (args) => (
		<PageState {...args}>
			<PageStateFolderSvg icon={Plus} />
			<PageStateTitle>Documents State</PageStateTitle>
			<PageStateDescription>
				Your documents are ready for review. You can organize, edit, or share them with your team.
			</PageStateDescription>
			<PageStateButtonGroup>
				<PageStateCancel>View later</PageStateCancel>
				<PageStateAction>Open documents</PageStateAction>
			</PageStateButtonGroup>
		</PageState>
	)
};
