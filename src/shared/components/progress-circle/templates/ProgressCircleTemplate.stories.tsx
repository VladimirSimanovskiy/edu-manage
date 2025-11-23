import { Meta, StoryObj } from "@storybook/react";
import { ProgressCircleTemplate } from "./ProgressCircleTemplate";

const meta: Meta<typeof ProgressCircleTemplate> = {
	component: ProgressCircleTemplate,
	parameters: {
		layout: "centered"
	},
	argTypes: {
		size: {
			control: {
				type: "radio"
			},
			options: ["xs", "sm", "md", "lg", "xl"]
		}
	}
};

export default meta;
type Story = StoryObj<typeof ProgressCircleTemplate>;

export const Default: Story = {
	args: {
		value: 50,
		size: "md",
		description: "Label",
		title: "50%"
	}
};

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

export const Example = () => {
	return (
		<div className="flex flex-col gap-4">
			{sizes.map((size) => (
				<ProgressCircleTemplate
					key={size}
					value={50}
					max={100}
					indeterminate={false}
					description="Label"
					title="50%"
					size={size}
				/>
			))}
		</div>
	);
};

export const WithRetry = () => {
	return (
		<div className="flex flex-col gap-4">
			{sizes.map((size) => (
				<ProgressCircleTemplate
					key={size}
					value={50}
					max={100}
					indeterminate={false}
					description="Label"
					onRetry={() => alert("Retry")}
					size={size}
				/>
			))}
		</div>
	);
};
