import { Meta, StoryObj } from "@storybook/react";
import { Divider } from "./Divider";

const meta: Meta<typeof Divider> = {
	component: Divider,
	parameters: {
		layout: "centered"
	},
	argTypes: {
		status: {
			options: ["error", "default"],
			control: { type: "radio" }
		},
		orientation: {
			options: ["vertical", "horizontal"],
			control: { type: "radio" }
		}
	},
	decorators: [
		(Story) => (
			<div className="flex h-24 w-24 items-center justify-center">
				<Story />
			</div>
		)
	]
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const Base: Story = {
	args: {
		orientation: "horizontal"
	}
};

export const Example: Story = {
	render: () => (
		<div>
			<div className="space-y-1">
				<h4 className="text-sm font-medium leading-none">Header</h4>
				<p className="text-sm text-muted-foreground">Some description</p>
			</div>
			<Divider className="my-4" />
			<div className="flex h-5 items-center space-x-4 text-sm">
				<div>Blog</div>
				<Divider orientation="vertical" />
				<div>Docs</div>
				<Divider orientation="vertical" />
				<div>Source</div>
			</div>
		</div>
	)
};
