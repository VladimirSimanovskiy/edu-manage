import { Meta, StoryObj } from "@storybook/react";
import { ProgressBlockTemplate } from "./ProgressBlockTemplate";
import { storyDecorator } from "@/lib/utils/storybook";
import { HelpCircle } from "lucide-react";

const meta: Meta<typeof ProgressBlockTemplate> = {
	component: ProgressBlockTemplate,
	decorators: [storyDecorator("mx-auto max-w-[600px] w-full")],
	argTypes: {
		size: {
			control: {
				type: "radio"
			},
			options: ["sm", "md", "lg"]
		}
	}
};

export default meta;
type Story = StoryObj<typeof ProgressBlockTemplate>;

export const Default: Story = {
	args: {
		value: 50,
		size: "sm",
		icon: HelpCircle,
		title: "Loading...",
		description: "50%",
		onCancel: () => {
			alert("Cancel");
		},
		onRetry: () => {
			alert("Retry");
		}
	}
};

const sizes = ["sm", "md", "lg"] as const;

export const Example = () => {
	return (
		<div className="flex flex-col gap-4">
			{sizes.map((size) => (
				<ProgressBlockTemplate
					key={size}
					value={50}
					max={100}
					indeterminate={false}
					icon={HelpCircle}
					title="Loading..."
					description="50%"
					size={size}
					onCancel={() => {
						alert("Cancel");
					}}
					onRetry={() => {
						alert("Retry");
					}}
				/>
			))}
		</div>
	);
};
