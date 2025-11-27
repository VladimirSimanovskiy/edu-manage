import type { Decorator, Meta, StoryObj } from "@storybook/react";
import { Overlay } from "./Overlay";

const meta: Meta<typeof Overlay> = {
	component: Overlay,
	parameters: {
		layout: "fullscreen"
	},
	tags: ["autodocs"],
	argTypes: {
		type: {
			control: "select",
			options: ["default", "gradient", "transparent"]
		}
	}
};

export default meta;
type Story = StoryObj<typeof Overlay>;

const WithOverlayContent: Decorator = (Story) => (
	<div className="relative h-screen w-full">
		<div className="absolute inset-0 grid grid-cols-4 gap-4 p-4">
			{Array.from({ length: 16 }).map((_, index) => (
				<div
					key={index}
					className="flex h-40 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600"
				>
					<p className="text-xl font-bold text-white">Content {index + 1}</p>
				</div>
			))}
		</div>
		<Story />
	</div>
);

export const Default: Story = {
	decorators: [WithOverlayContent],
	args: {
		type: "default",
		blur: false
	}
};
