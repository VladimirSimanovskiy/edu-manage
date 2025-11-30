import { Meta, StoryObj } from "@storybook/react";
import { Tag } from "./Tag";
import { Circle } from "lucide-react";

const meta: Meta<typeof Tag> = {
	component: Tag,
	parameters: {
		layout: "centered",
		controls: {
			exclude: ["children", "className", "onClose", "onClick"]
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
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
	parameters: {
		controls: {
			exclude: ["children"]
		}
	},
	args: {
		children: "Tag"
	}
};

export const WithIcon: Story = {
	parameters: {
		controls: {
			exclude: ["children", "startIcon", "onClose", "onClick"]
		}
	},
	args: {
		children: "Tag",
		startIcon: Circle
	}
};

const tagStatuses = ["default", "info", "success", "warning", "error"] as const;
const tagSizes = ["lg", "md", "sm"] as const;
const tagFocuses = ["low", "high"] as const;

export const WithTruncation: Story = {
	parameters: {
		controls: {
			exclude: ["children"]
		}
	},
	args: {
		children: "Very long tag text that should be truncated with ellipsis",
		startIcon: Circle
	},
	render: (args) => {
		return (
			<div className="max-w-32">
				<Tag {...args} className="max-w-full">
					<span className="truncate">{args.children}</span>
				</Tag>
			</div>
		);
	}
};

export const Showcase: Story = {
	args: {
		startIcon: Circle,
		endIcon: undefined
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
				{tagFocuses.map((focus) => (
					<div key={focus} className="p-2">
						<h3 className="mb-3 text-lg font-bold">Focus: {focus}</h3>
						<div className="p-2">
							{tagStatuses.map((status) => (
								<div key={status} className="p-2">
									<h3 className="mb-3 text-lg font-bold">Status: {status}</h3>
									<div className="flex flex-wrap items-end gap-4 p-2">
										{tagSizes.map((size) => (
											<div key={`${status}-${size}-${focus}`} className="flex flex-col gap-2">
												<Tag
													status={status}
													size={size}
													focus={focus}
													startIcon={startIcon ? Circle : undefined}
													endIcon={endIcon ? Circle : undefined}
												>
													Simple Tag
												</Tag>

												<Tag
													status={status}
													size={size}
													focus={focus}
													onLabelClick={() => console.log("clicked")}
													startIcon={startIcon ? Circle : undefined}
													endIcon={endIcon ? Circle : undefined}
												>
													Clickable
												</Tag>

												<Tag
													status={status}
													size={size}
													focus={focus}
													onClose={() => console.log("closed")}
													startIcon={startIcon ? Circle : undefined}
													endIcon={endIcon ? Circle : undefined}
												>
													Closable
												</Tag>

												<Tag
													status={status}
													size={size}
													focus={focus}
													onLabelClick={() => console.log("clicked")}
													onClose={() => console.log("closed")}
													startIcon={startIcon ? Circle : undefined}
													endIcon={endIcon ? Circle : undefined}
												>
													Full Tag
												</Tag>
											</div>
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
