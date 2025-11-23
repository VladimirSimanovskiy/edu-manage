import type { Meta, StoryObj } from "@storybook/react";
import { Circle } from "lucide-react";
import { IconButton } from "./IconButton";

const meta = {
	component: IconButton,
	parameters: {
		layout: "centered"
	},
	tags: ["autodocs"]
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
	args: {
		icon: Circle
	},
	argTypes: {
		variant: {
			options: ["primary", "secondary", "outline", "ghost", "link", "text"],
			control: { type: "radio" }
		},
		status: {
			options: ["default", "info", "success", "warning", "error"],
			control: { type: "radio" }
		},
		size: {
			options: ["xs", "sm", "md", "lg", "xl"],
			control: { type: "radio" }
		}
	}
};

const buttonVariants = ["primary", "secondary", "outline", "ghost", "link", "text"] as const;
const buttonStatuses = ["default", "info", "success", "warning", "error"] as const;
const buttonSizes = ["xl", "lg", "md", "sm", "xs"] as const;

export const Showcase: Story = {
	args: {
		icon: Circle
	},
	render: () => {
		return (
			<div className="">
				{buttonVariants.map((variant) => (
					<div key={variant} className="p-2">
						<h3 className="mb-3 text-lg font-bold">{variant}</h3>
						{buttonStatuses.map((status) => (
							<div key={status} className="p-2">
								<h4 className="text-md mb-2 font-semibold">{status}</h4>
								<div className="flex items-end justify-end gap-4 p-2">
									{buttonSizes.map((size) => (
										<IconButton
											key={`${variant}-${status}-${size}`}
											variant={variant}
											status={status}
											size={size}
											icon={Circle}
										/>
									))}
								</div>
							</div>
						))}
					</div>
				))}
			</div>
		);
	}
};
