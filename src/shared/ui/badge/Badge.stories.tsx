import { Meta, StoryObj } from "@storybook/react";
import { Circle, Flower, Star, Heart, Settings } from "lucide-react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
	component: Badge,
	parameters: {
		layout: "centered",
		controls: {
			exclude: ["size", "children", "className"]
		}
	},
	tags: ["autodocs"],
	argTypes: {
		status: {
			options: ["default", "info", "success", "warning", "error"],
			control: { type: "radio" }
		},
		focus: {
			options: ["low", "high"],
			control: { type: "radio" }
		},
		size: {
			options: ["sm", "md", "lg"],
			control: { type: "radio" }
		}
	}
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
	parameters: {
		controls: {
			exclude: ["children"]
		}
	},
	args: {
		children: "Badge"
	}
};

export const WithIcon: Story = {
	parameters: {
		controls: {
			exclude: ["children"]
		}
	},
	argTypes: {
		startIcon: {
			options: ["Circle", "Flower", "Star", "Heart", "Settings"],
			control: { type: "select" },
			mapping: {
				Circle,
				Flower,
				Star,
				Heart,
				Settings
			}
		}
	},
	args: {
		children: "Badge",
		startIcon: Circle
	}
};

const badgeStatuses = ["default", "info", "success", "warning", "error"] as const;
const badgeSizes = ["lg", "md", "sm"] as const;
const badgeFocuses = ["low", "high"] as const;

export const Showcase: Story = {
	args: {
		startIcon: Circle,
		endIcon: Circle
	},
	argTypes: {
		startIcon: {
			control: "boolean"
		},
		endIcon: {
			control: "boolean"
		}
	},
	parameters: {
		layout: "centered",
		controls: {
			exclude: ["size", "status", "focus"]
		}
	},
	render: ({ startIcon, endIcon }) => {
		return (
			<div className="flex flex-col gap-4">
				{badgeFocuses.map((focus) => (
					<div key={focus} className="p-2">
						<h3 className="mb-3 text-lg font-bold">Focus: {focus}</h3>
						<div className="p-2">
							{badgeStatuses.map((status) => (
								<div key={status} className="p-2">
									<h3 className="mb-3 text-lg font-bold">Status: {status}</h3>
									<div className="flex items-end justify-end gap-4 p-2">
										{badgeSizes.map((size) => (
											<Badge
												key={`${status}-${size}`}
												status={status}
												size={size}
												focus={focus}
												startIcon={startIcon ? Circle : undefined}
												endIcon={endIcon ? Circle : undefined}
											>
												Badge
											</Badge>
										))}
									</div>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		);
	}
};
